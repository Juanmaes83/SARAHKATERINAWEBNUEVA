/**
 * Media library contract shared by the Studio and the public renderer.
 *
 * The ORIGINAL is stored untouched (`originals/…`). Variants are WebP
 * derivatives generated once from that original at fixed widths, so a page
 * never recompresses a derivative. Focus point (0–1) drives `object-position`
 * when an image is cropped by its frame.
 */

export const VARIANT_WIDTHS = [480, 960, 1600] as const;

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'] as const;
export type AcceptedImageType = (typeof ACCEPTED_IMAGE_TYPES)[number];

/** 15 MB: the storage bucket enforces the same ceiling. */
export const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;

export interface MediaVariant {
  readonly width: number;
  readonly height: number;
  readonly path: string;
  readonly bytes: number;
}

export interface MediaRecord {
  readonly id: string;
  readonly bucket: 'media' | 'evidence';
  readonly original_path: string;
  readonly variants: MediaVariant[] | null;
  readonly width: number | null;
  readonly height: number | null;
  readonly alt: string;
  readonly caption: string | null;
  readonly credit: string | null;
  readonly focus_x: number;
  readonly focus_y: number;
}

export interface ResolvedMedia {
  readonly id: string;
  readonly src: string;
  readonly srcSet: string;
  readonly width: number | null;
  readonly height: number | null;
  readonly alt: string;
  readonly caption: string | null;
  readonly credit: string | null;
  readonly objectPosition: string;
  /** Largest variant, used for Open Graph. */
  readonly ogSrc: string;
}

export function publicObjectUrl(supabaseUrl: string, path: string): string {
  const encoded = path
    .split('/')
    .map((part) => encodeURIComponent(part))
    .join('/');
  return `${supabaseUrl.replace(/\/$/, '')}/storage/v1/object/public/media/${encoded}`;
}

export function mediaUrls(supabaseUrl: string, row: MediaRecord): ResolvedMedia {
  const variants = [...(row.variants ?? [])].sort((a, b) => a.width - b.width);
  const original = publicObjectUrl(supabaseUrl, row.original_path);
  const largest = variants.at(-1);
  const middle = variants.find((variant) => variant.width >= 960) ?? largest;
  return {
    id: row.id,
    src: middle ? publicObjectUrl(supabaseUrl, middle.path) : original,
    srcSet: variants.map((variant) => `${publicObjectUrl(supabaseUrl, variant.path)} ${variant.width}w`).join(', '),
    width: row.width,
    height: row.height,
    alt: row.alt,
    caption: row.caption,
    credit: row.credit,
    objectPosition: `${Math.round(row.focus_x * 100)}% ${Math.round(row.focus_y * 100)}%`,
    ogSrc: largest ? publicObjectUrl(supabaseUrl, largest.path) : original,
  };
}

/**
 * Detects the real image type from the file's first bytes. The browser's
 * declared type and the file extension are never trusted.
 */
export function sniffImageType(bytes: Uint8Array): AcceptedImageType | null {
  const b = bytes;
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'image/jpeg';
  if (
    b.length >= 8 &&
    b[0] === 0x89 &&
    b[1] === 0x50 &&
    b[2] === 0x4e &&
    b[3] === 0x47 &&
    b[4] === 0x0d &&
    b[5] === 0x0a &&
    b[6] === 0x1a &&
    b[7] === 0x0a
  )
    return 'image/png';
  const ascii = (from: number, to: number) => String.fromCharCode(...b.slice(from, to));
  if (b.length >= 12 && ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP') return 'image/webp';
  if (b.length >= 12 && ascii(4, 8) === 'ftyp' && /^(avif|avis)$/.test(ascii(8, 12))) return 'image/avif';
  return null;
}

/** Safe storage name: random id + sniffed extension; the uploaded file name is never used as a path. */
export function storageNameFor(type: AcceptedImageType, id: string): string {
  const ext = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif' }[type];
  return `originals/${id}.${ext}`;
}
