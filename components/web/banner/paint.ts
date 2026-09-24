/**
 * Paints the banner's static composition onto a canvas, FROM THE DOM.
 *
 * The fallback composition is ordinary HTML laid out by the site's own CSS
 * (tokens, fonts, responsive rules). This module reads that layout — every
 * image, box, line of type and the video window, element by element and word
 * by word — and repaints it at texture resolution. There is one layout, not
 * two: the fabric at rest is the fallback, pixel for pixel, and a change to
 * the composition's CSS reaches both.
 *
 * Elements opt in with `data-paint`:
 *   - `box`    background colour, border and radius;
 *   - `image`  an <img>, drawn with its object-fit: cover and object-position;
 *   - `text`   every text node inside, drawn at the position the browser
 *              gave each word, in the computed font, colour and case;
 *   - `video`  the video window: its first frame or poster is painted as a
 *              placeholder, and its rectangle is returned in UV units so the
 *              engine can sample the live video there.
 */

import type { UvRect } from './fabric';

export interface PaintResult {
  readonly canvas: HTMLCanvasElement;
  readonly videoRect: UvRect | null;
}

/** Texture scale over CSS pixels, capped so the long side stays ≤ 2048. */
function textureScale(width: number, height: number): number {
  return Math.min(2.5, 2048 / Math.max(width, height));
}

function radiusOf(style: CSSStyleDeclaration): number {
  return parseFloat(style.borderTopLeftRadius) || 0;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  if (r > 0 && 'roundRect' in ctx) ctx.roundRect(x, y, w, h, r);
  else ctx.rect(x, y, w, h);
}

function paintBox(
  ctx: CanvasRenderingContext2D,
  el: HTMLElement,
  x: number,
  y: number,
  w: number,
  h: number,
  s: number,
) {
  const style = getComputedStyle(el);
  const r = radiusOf(style) * s;
  const bg = style.backgroundColor;
  if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
    ctx.fillStyle = bg;
    roundRect(ctx, x, y, w, h, r);
    ctx.fill();
  }
  const bw = parseFloat(style.borderTopWidth) || 0;
  if (bw > 0 && style.borderTopStyle !== 'none') {
    ctx.strokeStyle = style.borderTopColor;
    ctx.lineWidth = bw * s;
    roundRect(
      ctx,
      x + (bw * s) / 2,
      y + (bw * s) / 2,
      w - bw * s,
      h - bw * s,
      Math.max(0, r - (bw * s) / 2),
    );
    ctx.stroke();
  }
}

/** object-fit: cover with object-position, like the browser. */
function paintCover(
  ctx: CanvasRenderingContext2D,
  source: CanvasImageSource,
  sw: number,
  sh: number,
  x: number,
  y: number,
  w: number,
  h: number,
  position: string,
) {
  if (!sw || !sh) return;
  const scale = Math.max(w / sw, h / sh);
  const dw = sw * scale;
  const dh = sh * scale;
  const [px = '50%', py = '50%'] = position.split(' ');
  const fx = px.endsWith('%') ? parseFloat(px) / 100 : 0.5;
  const fy = py.endsWith('%') ? parseFloat(py) / 100 : 0.5;
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.drawImage(source, x + (w - dw) * fx, y + (h - dh) * fy, dw, dh);
  ctx.restore();
}

function transform(text: string, mode: string): string {
  if (mode === 'uppercase') return text.toUpperCase();
  if (mode === 'lowercase') return text.toLowerCase();
  return text;
}

function paintText(ctx: CanvasRenderingContext2D, root: DOMRect, el: HTMLElement, s: number) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const parent = node.parentElement;
    if (!parent) continue;
    const style = getComputedStyle(parent);
    if (style.visibility === 'hidden' || style.display === 'none') continue;
    const size = parseFloat(style.fontSize) * s;
    ctx.font = `${style.fontStyle} ${style.fontWeight} ${size}px ${style.fontFamily}`;
    ctx.fillStyle = style.color;
    ctx.textBaseline = 'alphabetic';
    const spacing = parseFloat(style.letterSpacing);
    if ('letterSpacing' in ctx) {
      (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = Number.isFinite(
        spacing,
      )
        ? `${spacing * s}px`
        : '0px';
    }
    const text = node.textContent ?? '';
    // Word by word, at the position the browser laid each one out.
    for (const match of text.matchAll(/\S+/g)) {
      range.setStart(node, match.index ?? 0);
      range.setEnd(node, (match.index ?? 0) + match[0].length);
      const rect = range.getBoundingClientRect();
      if (!rect.width) continue;
      const word = transform(match[0], style.textTransform);
      const metrics = ctx.measureText(word);
      const ascent = metrics.fontBoundingBoxAscent ?? size * 0.8;
      const descent = metrics.fontBoundingBoxDescent ?? size * 0.2;
      // Centre the font box in the word's box, then sit on the baseline.
      const boxHeight = rect.height * s;
      const top = (rect.top - root.top) * s + (boxHeight - (ascent + descent)) / 2;
      ctx.fillText(word, (rect.left - root.left) * s, top + ascent);
    }
  }
  range.detach();
}

/**
 * Paints `root` (the fallback composition) and returns the canvas plus the
 * video window in UV units. Call after fonts and images have loaded.
 */
export function paintComposition(root: HTMLElement): PaintResult {
  const box = root.getBoundingClientRect();
  const s = textureScale(box.width, box.height);
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(box.width * s));
  canvas.height = Math.max(1, Math.round(box.height * s));
  const ctx = canvas.getContext('2d');
  if (!ctx) return { canvas, videoRect: null };

  // The composition's own surface first.
  paintBox(ctx, root, 0, 0, canvas.width, canvas.height, s);

  let videoRect: UvRect | null = null;
  root.querySelectorAll<HTMLElement>('[data-paint]').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const x = (r.left - box.left) * s;
    const y = (r.top - box.top) * s;
    const w = r.width * s;
    const h = r.height * s;
    switch (el.dataset.paint) {
      case 'box':
        paintBox(ctx, el, x, y, w, h, s);
        break;
      case 'image':
        if (el instanceof HTMLImageElement && el.complete && el.naturalWidth) {
          paintCover(
            ctx,
            el,
            el.naturalWidth,
            el.naturalHeight,
            x,
            y,
            w,
            h,
            getComputedStyle(el).objectPosition,
          );
        }
        break;
      case 'text':
        paintText(ctx, box, el, s);
        break;
      case 'video': {
        // The window's own surface shows until the first frame is decoded.
        paintBox(ctx, el, x, y, w, h, s);
        const video = el.querySelector('video');
        if (!video) break;
        // The live video fills the <video> box only, inside the window's border.
        const v = video.getBoundingClientRect();
        if (video.readyState >= 2) {
          paintCover(
            ctx,
            video,
            video.videoWidth,
            video.videoHeight,
            (v.left - box.left) * s,
            (v.top - box.top) * s,
            v.width * s,
            v.height * s,
            '50% 50%',
          );
        }
        videoRect = {
          x: (v.left - box.left) / box.width,
          y: (v.top - box.top) / box.height,
          w: v.width / box.width,
          h: v.height / box.height,
        };
        break;
      }
      default:
        break;
    }
  });

  return { canvas, videoRect };
}
