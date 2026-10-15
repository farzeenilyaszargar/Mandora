"use client";

import { useEffect, useRef } from "react";

const vertex = `attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`;

const fragment = `precision highp float;
uniform vec2 resolution;
uniform float time;
uniform vec3 trails[10];
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1.,0.)), f.x), mix(hash(i+vec2(0.,1.)), hash(i+vec2(1.,1.)), f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.; float a = .5;
  mat2 m = mat2(.80,-.60,.60,.80);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = m*p*2.03+3.7; a *= .5; }
  return v;
}
void main() {
  vec2 uv = gl_FragCoord.xy/resolution;
  float aspect = resolution.x/resolution.y;
  vec2 p = (uv-.5)*vec2(aspect,1.0)*2.0;
  for(int i=0;i<10;i++) {
    vec2 delta = (uv-trails[i].xy)*vec2(aspect,1.0);
    float influence = exp(-dot(delta,delta)*9.0)*trails[i].z;
    p += vec2(-delta.y,delta.x)*influence*1.3;
    p += normalize(delta+vec2(.001)) * influence * .13;
  }
  float t = time*.055;
  vec2 q = vec2(fbm(p+vec2(t,-t)),fbm(p+vec2(4.1,2.3)-t*.7));
  vec2 r = vec2(fbm(p+3.4*q+vec2(1.7,9.2)+t*.35),fbm(p+3.8*q+vec2(8.3,2.8)-t*.3));
  float ink = fbm(p+3.3*r);
  float boundary = .49 + .065*sin(uv.x*5.0+uv.y*3.0);
  float mask = smoothstep(boundary-.012,boundary+.012,ink);
  vec3 paper = vec3(.914,.910,.878);
  vec3 black = vec3(.025,.026,.024);
  vec3 color = mix(paper,black,mask);
  float grain = (hash(gl_FragCoord.xy)-.5)*.022;
  gl_FragColor = vec4(color+grain,1.);
}`;

export default function LiquidField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" });
    if (!gl) return;
    const shaders: WebGLShader[] = [];
    function compile(type: number, source: string) {
      const shader = gl!.createShader(type)!;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      shaders.push(shader);
      return shader;
    }
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      shaders.forEach((shader) => gl.deleteShader(shader));
      gl.deleteProgram(program);
      return;
    }
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
    const size = gl.getUniformLocation(program,"resolution");
    const clock = gl.getUniformLocation(program,"time");
    const trailUniform = gl.getUniformLocation(program,"trails[0]");
    const trail = Array.from({length:10}, () => ({x:.5,y:.5,strength:0}));
    const values = new Float32Array(30);
    const pointer = {x:.5,y:.5,strength:0};
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let disposed = false;
    let previous = 0;
    const start = performance.now();
    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas!.width = Math.round(canvas!.clientWidth*ratio);
      canvas!.height = Math.round(canvas!.clientHeight*ratio);
      gl!.viewport(0,0,canvas!.width,canvas!.height);
      gl!.uniform2f(size,canvas!.width,canvas!.height);
    }
    function move(event: PointerEvent) {
      pointer.x = event.clientX/window.innerWidth;
      pointer.y = 1-event.clientY/window.innerHeight;
      pointer.strength = 1;
    }
    function leave() { pointer.strength = 0; }
    function render(now: number) {
      if (disposed) return;
      frame = requestAnimationFrame(render);
      if (document.hidden || now-previous < 1000/40) return;
      previous = now;
      trail.forEach((point,i) => {
        const target = i === 0 ? pointer : trail[i-1];
        point.x += (target.x-point.x)*.17;
        point.y += (target.y-point.y)*.17;
        point.strength += (target.strength-point.strength)*.09;
        values.set([point.x,point.y,point.strength*(1-i/11)],i*3);
      });
      pointer.strength *= .982;
      gl!.uniform3fv(trailUniform,values);
      gl!.uniform1f(clock,reduced.matches ? 0 : (now-start)/1000);
      gl!.drawArrays(gl!.TRIANGLES,0,6);
      if(reduced.matches) cancelAnimationFrame(frame);
    }
    resize();
    frame = requestAnimationFrame(render);
    window.addEventListener("resize",resize);
    window.addEventListener("pointermove",move,{passive:true});
    document.documentElement.addEventListener("pointerleave",leave);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize",resize);
      window.removeEventListener("pointermove",move);
      document.documentElement.removeEventListener("pointerleave",leave);
      gl.deleteBuffer(buffer);
      shaders.forEach((shader) => gl.deleteShader(shader));
      gl.deleteProgram(program);
    };
  }, []);
  return <canvas className="liquid-field" ref={ref} aria-hidden="true" />;
}
