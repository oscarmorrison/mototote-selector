export function sanitizeFilename(filename) {
  return filename
    .replace(/[&]/g, 'and')           // Replace & with 'and'
    .replace(/[<>:"/\\|?*]/g, '')     // Remove other illegal characters
    .replace(/\s+/g, '-')             // Replace spaces with hyphens
    .replace(/--+/g, '-')             // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '');         // Remove leading/trailing hyphens
}
