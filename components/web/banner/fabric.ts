/**
 * Fabric banner engine — Phase 2F.
 *
 * A rewrite of the prototype in `BANDEROLAS DINÁMICAS/` (six identical copies
 * of one file), keeping what makes it distinctive and dropping what made it a
 * demo:
 *
 * KEPT
 *  - A Verlet cloth pinned along its top edge, like a banner on a rod, with
 *    structural, shear and bend constraints.
 *  - One composition — image, text, brand mark and a playing video — painted
 *    onto the cloth as a single surface, so every part folds together.
 *  - Grab the nearest point, drag it anywhere, let go and it swings back.
 *
 * CHANGED
 *  - The video is its own texture, sampled INSIDE the cloth's fragment shader
 *    through a UV window. It deforms with the fabric pixel for pixel, can never
 *    drift from it, and is uploaded only when the video has moved to a new
 *    frame (the prototype redrew the whole 2D canvas thirty times a second).
 *  - Typed arrays throughout; no per-frame allocation.
 *  - Real stretch: while held, the constraints soften so the fabric gives;
 *    on release they firm up again and a weak shape memory brings the banner
 *    back to flat, so it recovers with a settle rather than a snap.
 *  - The cloth is placed from the DOM: at rest it covers the static fallback
 *    composition exactly, so switching between them is seamless.
 *  - No global listeners, no `touch-action: none`, no endless loop: the host
 *    component owns input and decides when the engine runs (in view, tab
 *    visible, motion allowed).
 *  - WebGL 2 when present, WebGL 1 otherwise; context loss is reported so the
 *    host can fall back to the static composition.
 */

export interface FabricPlacement {
  /** Canvas size in CSS pixels. */
  readonly width: number;
  readonly height: number;
  /** The banner's rest rectangle inside the canvas, in CSS pixels. */
  readonly banner: {
    readonly x: number;
    readonly y: number;
    readonly w: number;
    readonly h: number;
  };
}

/** Video window inside the composition, in UV units (0–1, origin top left). */
export interface UvRect {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
}

type GL = WebGLRenderingContext | WebGL2RenderingContext;

const COLS = 20;
const ROWS = 25;
const ITERATIONS = 14;
const DAMPING = 0.975;
const GRAVITY = 0.0006;
const FOV = (32 * Math.PI) / 180;
/** Depth the held point is drawn toward — the fabric lifts off the wall. */
const GRAB_DEPTH = 0.32;
/** Constraint stiffness at rest and while held. */
const STIFF_REST = 0.92;
const STIFF_HELD = 0.5;
/**
 * Pull back toward the flat rest shape: almost none while held (the cloth
 * follows the hand as a whole), strongest just after release.
 */
const MEMORY_HELD = 0.0008;
const MEMORY_REST = 0.0035;
const MEMORY_RELEASE = 0.012;
/**
 * No particle may wander further than this from its rest point (world units;
 * the banner is 2 wide). Keeps the cloth inside the canvas margin.
 */
const MAX_OFFSET = 0.7;
/** Offsets of the three shadow passes, in multiples of the base offset. */
const SHADOW_SPREAD = [0.6, 1.1, 1.8] as const;

const VERTEX = `
attribute vec3 aPos;
attribute vec3 aNormal;
attribute vec2 aUv;
uniform mat4 uMvp;
// Shared with the fragment shader, whose default float precision is mediump:
// a uniform must be declared with the same precision in both stages.
uniform mediump float uShadow;
uniform vec2 uShadowOffset;
varying vec3 vNormal;
varying vec2 vUv;
void main() {
  vNormal = aNormal;
  vUv = aUv;
  vec3 p = aPos;
  if (uShadow > 0.5) {
    // The cloth's own silhouette on the wall behind it; the further a point
    // lifts toward the reader, the further its shadow falls.
    p.xy += uShadowOffset * (1.0 + max(aPos.z, 0.0) * 6.0);
    p.z = -0.03;
  }
  gl_Position = uMvp * vec4(p, 1.0);
}`;

const FRAGMENT = `
precision mediump float;
varying vec3 vNormal;
varying vec2 vUv;
uniform sampler2D uStatic;
uniform sampler2D uVideo;
uniform vec4 uVideoRect;
uniform float uHasVideo;
uniform vec3 uLight;
uniform float uShadow;
uniform vec4 uShadowColor;
void main() {
  if (uShadow > 0.5) {
    gl_FragColor = uShadowColor;
    return;
  }
  vec4 base = texture2D(uStatic, vUv);
  if (uHasVideo > 0.5) {
    vec2 q = (vUv - uVideoRect.xy) / uVideoRect.zw;
    if (q.x >= 0.0 && q.x <= 1.0 && q.y >= 0.0 && q.y <= 1.0) {
      base = texture2D(uVideo, q);
    }
  }
  vec3 n = normalize(vNormal);
  if (!gl_FrontFacing) n = -n;
  float diffuse = max(dot(n, uLight), 0.0);
  vec3 h = normalize(uLight + vec3(0.0, 0.0, 1.0));
  float sheen = pow(max(dot(n, h), 0.0), 28.0) * 0.07;
  // High ambient keeps the type legible in every fold; the diffuse term only
  // shapes the cloth, it never darkens a line of text into illegibility.
  float light = 0.74 + 0.30 * diffuse;
  gl_FragColor = vec4(base.rgb * light + sheen, 1.0);
}`;

function compile(gl: GL, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('shader');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? 'shader compile');
  }
  return shader;
}

function perspective(fov: number, aspect: number, near: number, far: number): Float32Array {
  const f = 1 / Math.tan(fov / 2);
  const nf = 1 / (near - far);
  return new Float32Array([
    f / aspect,
    0,
    0,
    0,
    0,
    f,
    0,
    0,
    0,
    0,
    (far + near) * nf,
    -1,
    0,
    0,
    2 * far * near * nf,
    0,
  ]);
}

/** perspective × translate(0, 0, -distance), column-major. */
function viewProjection(aspect: number, distance: number): Float32Array {
  const p = perspective(FOV, aspect, 0.1, 100);
  const m = new Float32Array(p);
  // Multiply by a translation along z: only the fourth column changes.
  for (let r = 0; r < 4; r += 1) {
    m[12 + r] = p[8 + r]! * -distance + p[12 + r]!;
  }
  return m;
}

export class Fabric {
  private readonly gl: GL;
  private readonly canvas: HTMLCanvasElement;
  private readonly program: WebGLProgram;
  private readonly loc: {
    pos: number;
    normal: number;
    uv: number;
    mvp: WebGLUniformLocation | null;
    staticTex: WebGLUniformLocation | null;
    videoTex: WebGLUniformLocation | null;
    videoRect: WebGLUniformLocation | null;
    hasVideo: WebGLUniformLocation | null;
    light: WebGLUniformLocation | null;
    shadow: WebGLUniformLocation | null;
    shadowOffset: WebGLUniformLocation | null;
    shadowColor: WebGLUniformLocation | null;
  };
  private readonly buffers: {
    pos: WebGLBuffer;
    normal: WebGLBuffer;
    uv: WebGLBuffer;
    index: WebGLBuffer;
  };
  private readonly staticTexture: WebGLTexture;
  private readonly videoTexture: WebGLTexture;

  // Particle state: current, previous and rest positions (x, y, z).
  private readonly pos = new Float32Array(COLS * ROWS * 3);
  private readonly prev = new Float32Array(COLS * ROWS * 3);
  private readonly rest = new Float32Array(COLS * ROWS * 3);
  private readonly normals = new Float32Array(COLS * ROWS * 3);
  private readonly pinned = new Uint8Array(COLS * ROWS);
  private readonly cA: Uint16Array;
  private readonly cB: Uint16Array;
  private readonly cRest: Float32Array;
  private readonly cWeight: Float32Array;
  private readonly indexCount: number;

  private mvp: Float32Array = new Float32Array(16);
  private distance = 5;
  private aspect = 1;
  private worldPerPx = 0.01;
  private cssWidth = 1;
  private cssHeight = 1;

  private grabbed = -1;
  private target = new Float32Array(3);
  private stiffness = STIFF_REST;
  private memory = MEMORY_REST;
  private time = 0;
  private idle = true;

  /** Premultiplied shadow colour; set from the site's navy token by the host. */
  private shadowColor: [number, number, number, number] = [0, 0, 0, 0];

  private video: HTMLVideoElement | null = null;
  private videoRect: UvRect = { x: 0, y: 0, w: 0, h: 0 };
  private videoReady = false;
  private lastVideoTime = -1;

  private raf = 0;
  private lastTick = 0;
  private accumulator = 0;
  private running = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const options: WebGLContextAttributes = {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      powerPreference: 'low-power',
    };
    const gl = (canvas.getContext('webgl2', options) ??
      canvas.getContext('webgl', options)) as GL | null;
    if (!gl) throw new Error('webgl unavailable');
    this.gl = gl;

    const program = gl.createProgram();
    if (!program) throw new Error('program');
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('link');
    this.program = program;
    this.loc = {
      pos: gl.getAttribLocation(program, 'aPos'),
      normal: gl.getAttribLocation(program, 'aNormal'),
      uv: gl.getAttribLocation(program, 'aUv'),
      mvp: gl.getUniformLocation(program, 'uMvp'),
      staticTex: gl.getUniformLocation(program, 'uStatic'),
      videoTex: gl.getUniformLocation(program, 'uVideo'),
      videoRect: gl.getUniformLocation(program, 'uVideoRect'),
      hasVideo: gl.getUniformLocation(program, 'uHasVideo'),
      light: gl.getUniformLocation(program, 'uLight'),
      shadow: gl.getUniformLocation(program, 'uShadow'),
      shadowOffset: gl.getUniformLocation(program, 'uShadowOffset'),
      shadowColor: gl.getUniformLocation(program, 'uShadowColor'),
    };

    const buffer = () => {
      const b = gl.createBuffer();
      if (!b) throw new Error('buffer');
      return b;
    };
    this.buffers = { pos: buffer(), normal: buffer(), uv: buffer(), index: buffer() };
    this.staticTexture = this.makeTexture();
    this.videoTexture = this.makeTexture();

    // Constraints: structural (1 apart), shear (diagonals), bend (2 apart).
    const a: number[] = [];
    const b: number[] = [];
    const w: number[] = [];
    const idx = (c: number, r: number) => r * COLS + c;
    const link = (i: number, j: number, weight: number) => {
      a.push(i);
      b.push(j);
      w.push(weight);
    };
    for (let r = 0; r < ROWS; r += 1) {
      for (let c = 0; c < COLS; c += 1) {
        const i = idx(c, r);
        if (c < COLS - 1) link(i, idx(c + 1, r), 1);
        if (r < ROWS - 1) link(i, idx(c, r + 1), 1);
        if (c < COLS - 1 && r < ROWS - 1) {
          link(i, idx(c + 1, r + 1), 0.8);
          link(idx(c + 1, r), idx(c, r + 1), 0.8);
        }
        if (c < COLS - 2) link(i, idx(c + 2, r), 0.35);
        if (r < ROWS - 2) link(i, idx(c, r + 2), 0.35);
      }
    }
    this.cA = new Uint16Array(a);
    this.cB = new Uint16Array(b);
    this.cWeight = new Float32Array(w);
    this.cRest = new Float32Array(a.length);

    // Static geometry: UVs and triangle indices.
    const uv = new Float32Array(COLS * ROWS * 2);
    for (let r = 0; r < ROWS; r += 1) {
      for (let c = 0; c < COLS; c += 1) {
        uv[(r * COLS + c) * 2] = c / (COLS - 1);
        uv[(r * COLS + c) * 2 + 1] = r / (ROWS - 1);
      }
    }
    for (let c = 0; c < COLS; c += 1) this.pinned[c] = 1;
    const indices: number[] = [];
    for (let r = 0; r < ROWS - 1; r += 1) {
      for (let c = 0; c < COLS - 1; c += 1) {
        const i = idx(c, r);
        indices.push(i, i + COLS, i + 1, i + 1, i + COLS, i + COLS + 1);
      }
    }
    this.indexCount = indices.length;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.uv);
    gl.bufferData(gl.ARRAY_BUFFER, uv, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.index);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  }

  private makeTexture(): WebGLTexture {
    const gl = this.gl;
    const texture = gl.createTexture();
    if (!texture) throw new Error('texture');
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    // One transparent pixel until real content arrives.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));
    return texture;
  }

  /**
   * Size the drawing buffer and lay the cloth over the banner's rest rectangle.
   * Resets the cloth to flat — called on mount and on resize.
   */
  place(placement: FabricPlacement): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.cssWidth = placement.width;
    this.cssHeight = placement.height;
    this.canvas.width = Math.max(1, Math.round(placement.width * dpr));
    this.canvas.height = Math.max(1, Math.round(placement.height * dpr));
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    // World units: the banner is 2 wide. The camera distance makes the z = 0
    // plane map one-to-one onto the canvas, so rest == the DOM rectangle.
    const { banner } = placement;
    this.worldPerPx = 2 / banner.w;
    this.aspect = placement.width / placement.height;
    const halfHeight = (placement.height / 2) * this.worldPerPx;
    this.distance = halfHeight / Math.tan(FOV / 2);
    this.mvp = viewProjection(this.aspect, this.distance);

    const left = (banner.x - placement.width / 2) * this.worldPerPx;
    const top = -(banner.y - placement.height / 2) * this.worldPerPx;
    const w = banner.w * this.worldPerPx;
    const h = banner.h * this.worldPerPx;
    for (let r = 0; r < ROWS; r += 1) {
      for (let c = 0; c < COLS; c += 1) {
        const i = (r * COLS + c) * 3;
        const x = left + (c / (COLS - 1)) * w;
        const y = top - (r / (ROWS - 1)) * h;
        this.rest[i] = this.pos[i] = this.prev[i] = x;
        this.rest[i + 1] = this.pos[i + 1] = this.prev[i + 1] = y;
        this.rest[i + 2] = this.pos[i + 2] = this.prev[i + 2] = 0;
      }
    }
    for (let k = 0; k < this.cA.length; k += 1) {
      const i = this.cA[k]! * 3;
      const j = this.cB[k]! * 3;
      this.cRest[k] = Math.hypot(
        this.rest[i]! - this.rest[j]!,
        this.rest[i + 1]! - this.rest[j + 1]!,
      );
    }
    this.grabbed = -1;
    this.draw();
  }

  /** Shadow tint as 0–255 RGB (from a design token) and its opacity. */
  setShadow(rgb: readonly [number, number, number], alpha: number): void {
    this.shadowColor = [
      (rgb[0] / 255) * alpha,
      (rgb[1] / 255) * alpha,
      (rgb[2] / 255) * alpha,
      alpha,
    ];
  }

  setStatic(source: HTMLCanvasElement): void {
    const gl = this.gl;
    gl.bindTexture(gl.TEXTURE_2D, this.staticTexture);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    this.draw();
  }

  /**
   * The video to sample inside `rect`. Its frames are uploaded from the tick,
   * only when its time has moved: `requestVideoFrameCallback` is not used
   * because browsers may not fire it for a video that is not composited, and
   * this one sits in the transparent fallback layer.
   */
  setVideo(video: HTMLVideoElement | null, rect: UvRect): void {
    this.video = video;
    this.videoRect = rect;
    this.videoReady = false;
    this.lastVideoTime = -1;
    this.uploadVideo();
  }

  private uploadVideo(): void {
    const video = this.video;
    if (!video || video.readyState < 2 || !video.videoWidth) return;
    const gl = this.gl;
    gl.bindTexture(gl.TEXTURE_2D, this.videoTexture);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
    this.videoReady = true;
    this.lastVideoTime = video.currentTime;
    if (!this.running) this.draw();
  }

  /** CSS pixel → nearest free particle under the pointer, or -1. */
  private pick(px: number, py: number): number {
    const radius = (this.cssWidth / COLS) * 1.6;
    let best = -1;
    let bestDistance = radius * radius;
    const m = this.mvp;
    for (let p = COLS; p < COLS * ROWS; p += 1) {
      const i = p * 3;
      const x = this.pos[i]!;
      const y = this.pos[i + 1]!;
      const z = this.pos[i + 2]!;
      const w = x * m[3]! + y * m[7]! + z * m[11]! + m[15]!;
      const sx = ((x * m[0]! + y * m[4]! + z * m[8]! + m[12]!) / w + 1) * 0.5 * this.cssWidth;
      const sy = (1 - (x * m[1]! + y * m[5]! + z * m[9]! + m[13]!) / w) * 0.5 * this.cssHeight;
      const d = (sx - px) ** 2 + (sy - py) ** 2;
      if (d < bestDistance) {
        bestDistance = d;
        best = p;
      }
    }
    return best;
  }

  /** Pointer (CSS px) → point on the plane z = GRAB_DEPTH. */
  private unproject(px: number, py: number): void {
    const nx = (px / this.cssWidth) * 2 - 1;
    const ny = 1 - (py / this.cssHeight) * 2;
    const t = Math.tan(FOV / 2) * (this.distance - GRAB_DEPTH);
    this.target[0] = nx * t * this.aspect;
    this.target[1] = ny * t;
    this.target[2] = GRAB_DEPTH;
  }

  grab(px: number, py: number): boolean {
    const p = this.pick(px, py);
    if (p < 0) return false;
    this.grabbed = p;
    this.unproject(px, py);
    this.stiffness = STIFF_HELD;
    this.memory = MEMORY_HELD;
    this.idle = false;
    return true;
  }

  drag(px: number, py: number): void {
    if (this.grabbed < 0) return;
    this.unproject(px, py);
  }

  release(): void {
    if (this.grabbed < 0) return;
    this.grabbed = -1;
    this.memory = MEMORY_RELEASE;
  }

  get holding(): boolean {
    return this.grabbed >= 0;
  }

  /** Keyboard and slot-change impulses, applied to the lower half of the banner. */
  nudge(dx: number, dy: number, dz: number): void {
    for (let r = Math.floor(ROWS / 2); r < ROWS; r += 1) {
      const weight = (r / (ROWS - 1)) ** 2;
      for (let c = 0; c < COLS; c += 1) {
        const i = (r * COLS + c) * 3;
        this.prev[i] = this.prev[i]! - dx * weight;
        this.prev[i + 1] = this.prev[i + 1]! - dy * weight;
        this.prev[i + 2] = this.prev[i + 2]! - dz * weight * (0.6 + 0.4 * Math.sin(c * 0.9));
      }
    }
    this.memory = MEMORY_RELEASE;
    this.idle = false;
  }

  /** Let the banner settle flat, as if smoothed by hand. */
  settle(): void {
    this.release();
    this.memory = MEMORY_RELEASE * 3;
  }

  private step(): void {
    const { pos, prev, rest, pinned } = this;
    this.time += 1 / 60;
    // Ease the constraints back to firm and the memory back to its rest pull.
    if (this.grabbed < 0) {
      this.stiffness += (STIFF_REST - this.stiffness) * 0.06;
      this.memory += (MEMORY_REST - this.memory) * 0.02;
    }
    const breathe = this.idle ? 0.00035 : 0.00012;
    for (let p = 0; p < COLS * ROWS; p += 1) {
      if (pinned[p]) continue;
      const i = p * 3;
      const vx = (pos[i]! - prev[i]!) * DAMPING;
      const vy = (pos[i + 1]! - prev[i + 1]!) * DAMPING;
      const vz = (pos[i + 2]! - prev[i + 2]!) * DAMPING;
      prev[i] = pos[i]!;
      prev[i + 1] = pos[i + 1]!;
      prev[i + 2] = pos[i + 2]!;
      const row = Math.floor(p / COLS) / (ROWS - 1);
      // A slow air current, strongest at the free edge. Never a flutter.
      const air = Math.sin(this.time * 1.3 + pos[i]! * 1.7 + row * 2.4) * breathe * row;
      pos[i] = pos[i]! + vx + (rest[i]! - pos[i]!) * this.memory;
      pos[i + 1] = pos[i + 1]! + vy - GRAVITY * row + (rest[i + 1]! - pos[i + 1]!) * this.memory;
      pos[i + 2] = pos[i + 2]! + vz + air + (rest[i + 2]! - pos[i + 2]!) * this.memory;
      // The wall: the banner hangs against it and can never pass behind it.
      if (pos[i + 2]! < 0) {
        pos[i + 2] = 0;
        prev[i + 2] = 0;
      }
    }

    const held = this.grabbed;
    if (held >= 0) {
      const i = held * 3;
      pos[i] = pos[i]! + (this.target[0]! - pos[i]!) * 0.35;
      pos[i + 1] = pos[i + 1]! + (this.target[1]! - pos[i + 1]!) * 0.35;
      pos[i + 2] = pos[i + 2]! + (this.target[2]! - pos[i + 2]!) * 0.35;
    }

    const { cA, cB, cRest, cWeight } = this;
    for (let it = 0; it < ITERATIONS; it += 1) {
      for (let k = 0; k < cA.length; k += 1) {
        const a = cA[k]!;
        const b = cB[k]!;
        const i = a * 3;
        const j = b * 3;
        const dx = pos[j]! - pos[i]!;
        const dy = pos[j + 1]! - pos[i + 1]!;
        const dz = pos[j + 2]! - pos[i + 2]!;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < 1e-6) continue;
        const f = ((d - cRest[k]!) / d) * 0.5 * this.stiffness * cWeight[k]!;
        const freeA = !pinned[a] && a !== held;
        const freeB = !pinned[b] && b !== held;
        if (freeA && freeB) {
          pos[i] = pos[i]! + dx * f;
          pos[i + 1] = pos[i + 1]! + dy * f;
          pos[i + 2] = pos[i + 2]! + dz * f;
          pos[j] = pos[j]! - dx * f;
          pos[j + 1] = pos[j + 1]! - dy * f;
          pos[j + 2] = pos[j + 2]! - dz * f;
        } else if (freeA) {
          pos[i] = pos[i]! + dx * f * 2;
          pos[i + 1] = pos[i + 1]! + dy * f * 2;
          pos[i + 2] = pos[i + 2]! + dz * f * 2;
        } else if (freeB) {
          pos[j] = pos[j]! - dx * f * 2;
          pos[j + 1] = pos[j + 1]! - dy * f * 2;
          pos[j + 2] = pos[j + 2]! - dz * f * 2;
        }
      }
    }

    // Keep every point within reach of its rest position.
    let energy = 0;
    for (let p = COLS; p < COLS * ROWS; p += 1) {
      const i = p * 3;
      const ox = pos[i]! - rest[i]!;
      const oy = pos[i + 1]! - rest[i + 1]!;
      const oz = pos[i + 2]! - rest[i + 2]!;
      const o = Math.sqrt(ox * ox + oy * oy + oz * oz);
      if (o > MAX_OFFSET) {
        const s = MAX_OFFSET / o;
        pos[i] = rest[i]! + ox * s;
        pos[i + 1] = rest[i + 1]! + oy * s;
        pos[i + 2] = rest[i + 2]! + oz * s;
      }
      energy += o;
    }
    // Back to the resting breath once the banner has settled.
    if (this.grabbed < 0 && energy / (COLS * ROWS) < 0.004) this.idle = true;
  }

  private computeNormals(): void {
    const { pos, normals } = this;
    for (let r = 0; r < ROWS; r += 1) {
      for (let c = 0; c < COLS; c += 1) {
        const l = (r * COLS + Math.max(c - 1, 0)) * 3;
        const rr = (r * COLS + Math.min(c + 1, COLS - 1)) * 3;
        const u = (Math.max(r - 1, 0) * COLS + c) * 3;
        const d = (Math.min(r + 1, ROWS - 1) * COLS + c) * 3;
        const ax = pos[rr]! - pos[l]!;
        const ay = pos[rr + 1]! - pos[l + 1]!;
        const az = pos[rr + 2]! - pos[l + 2]!;
        const bx = pos[u]! - pos[d]!;
        const by = pos[u + 1]! - pos[d + 1]!;
        const bz = pos[u + 2]! - pos[d + 2]!;
        let nx = ay * bz - az * by;
        let ny = az * bx - ax * bz;
        let nz = ax * by - ay * bx;
        const n = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        nx /= n;
        ny /= n;
        nz /= n;
        const i = (r * COLS + c) * 3;
        normals[i] = nx;
        normals[i + 1] = ny;
        normals[i + 2] = nz;
      }
    }
  }

  draw(): void {
    const gl = this.gl;
    this.computeNormals();
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.useProgram(this.program);
    gl.uniformMatrix4fv(this.loc.mvp, false, this.mvp);
    const lx = -0.35;
    const ly = 0.55;
    const lz = 1;
    const ll = Math.hypot(lx, ly, lz);
    gl.uniform3f(this.loc.light, lx / ll, ly / ll, lz / ll);

    const attribute = (
      buffer: WebGLBuffer,
      location: number,
      size: number,
      data?: Float32Array,
    ) => {
      if (location < 0) return;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      if (data) gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
    };
    attribute(this.buffers.pos, this.loc.pos, 3, this.pos);
    attribute(this.buffers.normal, this.loc.normal, 3, this.normals);
    attribute(this.buffers.uv, this.loc.uv, 2);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.staticTexture);
    gl.uniform1i(this.loc.staticTex, 0);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.videoTexture);
    gl.uniform1i(this.loc.videoTex, 1);
    const rect = this.videoRect;
    gl.uniform4f(this.loc.videoRect, rect.x, rect.y, rect.w, rect.h);
    gl.uniform1f(this.loc.hasVideo, this.videoReady ? 1 : 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.index);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    // The shadow first, on the wall: three faint, widening passes read as one
    // soft shadow. They never write depth, so the cloth always covers them.
    gl.depthMask(false);
    gl.uniform1f(this.loc.shadow, 1);
    gl.uniform4f(this.loc.shadowColor, ...this.shadowColor);
    for (const spread of SHADOW_SPREAD) {
      gl.uniform2f(this.loc.shadowOffset, 0.018 * spread, -0.03 * spread);
      gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);
    }
    gl.depthMask(true);
    gl.uniform1f(this.loc.shadow, 0);
    gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);
  }

  private tick = (now: number) => {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this.tick);
    const elapsed = Math.min(now - (this.lastTick || now), 100);
    this.lastTick = now;
    this.accumulator += elapsed;
    // Fixed 60 Hz steps: identical feel at 60, 90 or 120 Hz displays.
    let steps = 0;
    while (this.accumulator >= 1000 / 60 && steps < 4) {
      this.step();
      this.accumulator -= 1000 / 60;
      steps += 1;
    }
    // A new video frame since the last upload? Upload it; otherwise reuse.
    const video = this.video;
    if (video && video.currentTime !== this.lastVideoTime) this.uploadVideo();
    this.draw();
  };

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTick = 0;
    this.accumulator = 0;
    this.raf = requestAnimationFrame(this.tick);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  get isRunning(): boolean {
    return this.running;
  }

  destroy(): void {
    this.stop();
    const gl = this.gl;
    gl.deleteTexture(this.staticTexture);
    gl.deleteTexture(this.videoTexture);
    Object.values(this.buffers).forEach((b) => gl.deleteBuffer(b));
    gl.deleteProgram(this.program);
  }
}
