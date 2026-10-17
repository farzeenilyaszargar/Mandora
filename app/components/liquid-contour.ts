export type LiquidCircle = { x: number; y: number; radius: number };
export type LiquidContour = { points: Float32Array; loops: number[][] };

// Compact metaball field plus marching squares. No SVG filters, blur readbacks,
// WebGL, or browser-specific rendering paths are needed.
export class LiquidContourBuilder {
  private field = new Float32Array(0);
  private points = new Float32Array(0);
  private first = new Int32Array(0);
  private second = new Int32Array(0);
  private seen = new Uint8Array(0);

  build(circles: LiquidCircle[], left: number, top: number, width: number, height: number): LiquidContour {
    const step = Math.max(6, Math.sqrt(width * height / 24000));
    const cols = Math.ceil(width / step) + 1;
    const rows = Math.ceil(height / step) + 1;
    const count = cols * rows;
    const horizontal = (cols - 1) * rows;
    const edges = horizontal + cols * (rows - 1);
    if (this.field.length < count) this.field = new Float32Array(count);
    if (this.first.length < edges) {
      this.points = new Float32Array(edges * 2);
      this.first = new Int32Array(edges);
      this.second = new Int32Array(edges);
      this.seen = new Uint8Array(edges);
    }
    const { field, points, first, second, seen } = this;
    field.fill(0, 0, count);
    first.fill(-1, 0, edges);
    second.fill(-1, 0, edges);
    seen.fill(0, 0, edges);
    const threshold = .24;
    for (const circle of circles) {
      const x = (circle.x - left) / step;
      const y = (circle.y - top) / step;
      const r = circle.radius * 1.4 / step;
      const r2 = r * r;
      if (r2 < .01) continue;
      for (let gy = Math.max(0, Math.floor(y - r)); gy <= Math.min(rows - 1, Math.ceil(y + r)); gy++) {
        const dy2 = (gy - y) ** 2;
        for (let gx = Math.max(0, Math.floor(x - r)); gx <= Math.min(cols - 1, Math.ceil(x + r)); gx++) {
          const distance = ((gx - x) ** 2 + dy2) / r2;
          if (distance < 1) field[gy * cols + gx] += (1 - distance) ** 2;
        }
      }
    }
    const active: number[] = [];
    function edge(x: number, y: number, vertical: boolean) {
      const id = vertical ? horizontal + y * cols + x : y * (cols - 1) + x;
      if (first[id] !== -1) return id;
      const a = field[y * cols + x];
      const b = field[(y + Number(vertical)) * cols + x + Number(!vertical)];
      const t = Math.abs(b - a) < 1e-8 ? .5 : (threshold - a) / (b - a);
      points[id * 2] = (x + (vertical ? 0 : t)) * step;
      points[id * 2 + 1] = (y + (vertical ? t : 0)) * step;
      return id;
    }
    function connect(a: number, b: number) {
      if (first[a] === -1) { first[a] = b; active.push(a); } else second[a] = b;
      if (first[b] === -1) { first[b] = a; active.push(b); } else second[b] = a;
    }
    for (let y = 0; y < rows - 1; y++) {
      for (let x = 0; x < cols - 1; x++) {
        const tl = field[y * cols + x];
        const tr = field[y * cols + x + 1];
        const br = field[(y + 1) * cols + x + 1];
        const bl = field[(y + 1) * cols + x];
        const state = Number(tl >= threshold) | (Number(tr >= threshold) << 1) | (Number(br >= threshold) << 2) | (Number(bl >= threshold) << 3);
        if (state === 0 || state === 15) continue;
        const crossings: number[] = [];
        if ((tl >= threshold) !== (tr >= threshold)) crossings.push(edge(x, y, false));
        if ((tr >= threshold) !== (br >= threshold)) crossings.push(edge(x + 1, y, true));
        if ((bl >= threshold) !== (br >= threshold)) crossings.push(edge(x, y + 1, false));
        if ((tl >= threshold) !== (bl >= threshold)) crossings.push(edge(x, y, true));
        if (crossings.length === 2) connect(crossings[0], crossings[1]);
        else if (crossings.length === 4) {
          const centerInside = (tl + tr + br + bl) / 4 >= threshold;
          if ((state === 5) === centerInside) {
            connect(crossings[0], crossings[1]); connect(crossings[2], crossings[3]);
          } else {
            connect(crossings[0], crossings[3]); connect(crossings[1], crossings[2]);
          }
        }
      }
    }
    const loops: number[][] = [];
    for (const start of active) {
      if (seen[start]) continue;
      const loop: number[] = [];
      let current = start;
      let previous = -1;
      while (current >= 0 && !seen[current]) {
        loop.push(current);
        seen[current] = 1;
        const next = first[current] === previous ? second[current] : first[current];
        previous = current;
        current = next;
      }
      if (current === start && loop.length > 2) loops.push(loop);
    }
    return { points, loops };
  }
}
