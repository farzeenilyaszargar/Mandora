const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

function compile(name, dependencies = {}, globals = {}) {
  const filename = path.join(__dirname, '..', 'app', 'components', name);
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const module = { exports: {} };
  new Function('require', 'module', 'exports', ...Object.keys(globals), code)(
    (id) => dependencies[id], module, module.exports, ...Object.values(globals),
  );
  return module.exports;
}
const { LiquidContourBuilder } = compile('liquid-contour.ts');
function inside({ points, loops }, x, y) {
  let filled = false;
  for (const loop of loops) for (let i = 0, j = loop.length - 1; i < loop.length; j = i++) {
    const ax = points[loop[i] * 2], ay = points[loop[i] * 2 + 1];
    const bx = points[loop[j] * 2], by = points[loop[j] * 2 + 1];
    if ((ay > y) !== (by > y) && x < (bx - ax) * (y - ay) / (by - ay) + ax) filled = !filled;
  }
  return filled;
}
test('drops merge into a closed shape without filling holes', () => {
  const builder = new LiquidContourBuilder();
  const separate = builder.build([{ x: 120, y: 200, radius: 45 }, { x: 420, y: 200, radius: 45 }], 0, 0, 600, 400);
  assert.equal(separate.loops.length, 2);
  const merged = builder.build([{ x: 180, y: 200, radius: 70 }, { x: 260, y: 200, radius: 70 }], 0, 0, 600, 400);
  assert.equal(merged.loops.length, 1);
  assert.ok(inside(merged, 220, 200));
  const ring = Array.from({ length: 16 }, (_, i) => ({ x: 300 + 120 * Math.cos(i * Math.PI / 8), y: 250 + 120 * Math.sin(i * Math.PI / 8), radius: 35 }));
  const result = builder.build(ring, 0, 0, 600, 500);
  assert.equal(result.loops.length, 2);
  assert.equal(inside(result, 300, 250), false);
  assert.equal(inside(result, 420, 250), true);
  assert.deepEqual(builder.build([], 0, 0, 600, 400).loops, []);
});
function target(extra = {}) {
  const events = new Map();
  return { ...extra, events, addEventListener: (name, fn) => events.set(name, fn), removeEventListener: (name) => events.delete(name) };
}
function mount({ fine = true, reduced = false, product = true } = {}) {
  let now = 100, next = 0, cleanup, reads = 0, strokes = 0, curves = 0;
  const frames = new Map();
  const context = () => ({ clearRect() {}, beginPath() {}, rect() {}, clip() {}, save() {}, restore() {}, fill() {}, stroke() { strokes++; } });
  const canvases = Array.from({ length: 2 }, () => ({ width: 0, height: 0, style: {}, getContext: context }));
  const refs = canvases.map((current) => ({ current }));
  const motion = target({ matches: reduced }), pointer = target({ matches: fine });
  const window = target({ innerWidth: 1440, innerHeight: 900, matchMedia: (query) => query.includes('reduced') ? motion : pointer });
  const document = target({ hidden: false, documentElement: target(), querySelector: () => product ? { getBoundingClientRect() { reads++; return { top: 400, bottom: 900, left: 50, right: 1390, width: 1340, height: 500 }; } } : null });
  class Path { moveTo() {} quadraticCurveTo() { curves++; } closePath() {} }
  const Component = compile('liquid-field.tsx', {
    react: { useRef: () => refs.shift(), useEffect: (fn) => { cleanup = fn(); } },
    'react/jsx-runtime': { jsx: () => null, jsxs: () => null },
    './liquid-contour': { LiquidContourBuilder },
  }, { window, document, performance: { now: () => now }, Path2D: Path,
    requestAnimationFrame: (fn) => { frames.set(++next, fn); return next; }, cancelAnimationFrame: (id) => frames.delete(id),
  }).default;
  Component();
  return {
    canvases, frames, window, document, motion, pointer,
    get reads() { return reads; }, get strokes() { return strokes; }, get curves() { return curves; },
    emit(name, value) { window.events.get(name)?.(value); },
    tick(ms = 17) { now += ms; const pending = [...frames.values()]; frames.clear(); pending.forEach((fn) => fn(now)); },
    cleanup() { cleanup(); },
  };
}
test('rendering stays local, clips the image outline, caches layout, and stops when idle', () => {
  const app = mount();
  app.emit('scroll', {});
  assert.equal(app.frames.size, 0);
  app.emit('pointermove', { clientX: 400, clientY: 500, pointerType: 'mouse' });
  app.tick();
  assert.ok(app.canvases[0].width < 800 && app.canvases[0].height < 800, 'small trail must not allocate full-screen surfaces');
  assert.ok(app.strokes > 0, 'image gets the outline');
  const reads = app.reads;
  for (let i = 0; i < 5; i++) app.tick();
  assert.equal(app.reads, reads, 'no repeated layout reads');
  app.emit('scroll', {}); app.tick(); assert.equal(app.reads, reads + 1);
  for (let i = 0; i < 150; i++) app.tick();
  assert.equal(app.frames.size, 0);
  assert.equal(app.canvases[0].width, 1, 'idle backing stores are released');
  app.cleanup(); assert.equal(app.window.events.size, 0); assert.equal(app.document.events.size, 0);
});
test('touch, reduced motion, and hidden tabs do not animate', () => {
  for (const options of [{ fine: false }, { reduced: true }]) {
    const app = mount(options);
    app.emit('pointermove', { clientX: 100, clientY: 100, pointerType: 'mouse' });
    assert.equal(app.frames.size, 0); app.cleanup();
  }
  const app = mount({ product: false });
  app.emit('pointermove', { clientX: 100, clientY: 100, pointerType: 'touch' }); assert.equal(app.frames.size, 0);
  app.emit('pointermove', { clientX: 100, clientY: 100, pointerType: 'mouse' }); app.tick();
  assert.equal(app.canvases[1].width, 1, 'blogs do not allocate image outlines');
  app.document.hidden = true; app.document.events.get('visibilitychange')();
  assert.equal(app.frames.size, 0); assert.equal(app.canvases[0].width, 1);
  app.cleanup();
});

test('liquid contours stay closed at viewport corners', () => {
  const app = mount();
  app.emit('pointermove', { clientX: 0, clientY: 0, pointerType: 'mouse' });
  app.tick();
  assert.ok(app.curves > 0, 'an edge-crossing drop must still form a visible closed path');
  assert.ok(parseFloat(app.canvases[0].style.left) < 0);
  app.cleanup();
});
