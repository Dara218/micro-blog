import { mediaUrl } from "@/services/common/http";

/**
 * Extension fallbacks used when a media item's MIME type is missing.
 * Prefer MIME detection; fall back to these regexes as a best-effort.
 */
const IMAGE_EXT = /\.(png|jpg|jpeg|gif)$/i;
const VIDEO_EXT = /\.(mp4|webm|mov)$/i;

/**
 * Splits a mixed media list into `images` and `videos` buckets.
 * Uses MIME when present, otherwise falls back to file extension checks.
 *
 * @param {Array<{ url?: string, mime?: string }>} [list=[]] - Mixed media from API.
 *
 * @returns {{ images: Array<object>, videos: Array<object> }} Partitioned media.
 */
export const usePartitionMedia = (list = []) => {
  const images = [];
  const videos = [];

  for (const m of list) {
    const mime = m?.mime || '';
    const url = m?.url || '';

    // Prefer MIME checks; fallback to extension patterns
    if (mime.startsWith('image/') || IMAGE_EXT.test(url)) images.push(m);

    else if (mime.startsWith('video/') || VIDEO_EXT.test(url)) videos.push(m);
  }

  return { images, videos };
};

/**
 * Converts media items to absolute URLs safe for `src` attributes.
 * Keeps absolute URLs as-is; prefixes relative paths with the storage base URL.
 *
 * @param {Array<{ url: string }>} arr - Media items to transform.
 * @returns {string[]} Array of absolute URLs.
 */
export const useConvertMediaToUrl = (arr = []) => arr.map(media => (
  /^https?:\/\//.test(media?.url)
    ? media.url
    : mediaUrl(media?.url || '')
));