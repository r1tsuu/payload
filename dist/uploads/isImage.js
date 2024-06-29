export function isImage(mimeType) {
    return [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/svg+xml',
        'image/webp',
        'image/avif'
    ].indexOf(mimeType) > -1;
}

//# sourceMappingURL=isImage.js.map