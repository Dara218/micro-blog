/**
 * Returns a temporary blob URL for previewing a File (e.g., in <img src>).
 * Returns an empty string if no file is provided.
 *
 * @param {File} file - The selected file to preview.
 *
 * @returns {string} Blob URL or empty string.
 */
export const useCreateObjectUrl = (file) => (file ? URL.createObjectURL(file) : '');