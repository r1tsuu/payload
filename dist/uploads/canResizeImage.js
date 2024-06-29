export function canResizeImage(mimeType) {
    return [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/tiff'
    ].indexOf(mimeType) > -1;
}

//# sourceMappingURL=canResizeImage.js.map