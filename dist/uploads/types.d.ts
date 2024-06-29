import type { ResizeOptions, Sharp } from 'sharp';
import type { TypeWithID } from '../collections/config/types.js';
import type { PayloadRequestWithData } from '../types/index.js';
export type FileSize = {
    filename: null | string;
    filesize: null | number;
    height: null | number;
    mimeType: null | string;
    width: null | number;
};
export type FileSizes = {
    [size: string]: FileSize;
};
export type FileData = {
    filename: string;
    filesize: number;
    focalX?: number;
    focalY?: number;
    height: number;
    mimeType: string;
    sizes: FileSizes;
    tempFilePath?: string;
    url?: string;
    width: number;
};
export type ProbedImageSize = {
    height: number;
    width: number;
};
/**
 * Params sent to the sharp `toFormat()` function
 * @link https://sharp.pixelplumbing.com/api-output#toformat
 */
export type ImageUploadFormatOptions = {
    format: Parameters<Sharp['toFormat']>[0];
    options?: Parameters<Sharp['toFormat']>[1];
};
/**
 * Params sent to the sharp trim() function
 * @link https://sharp.pixelplumbing.com/api-resize#trim
 */
export type ImageUploadTrimOptions = Parameters<Sharp['trim']>[0];
export type ImageSize = Omit<ResizeOptions, 'withoutEnlargement'> & {
    /**
     * @deprecated prefer position
     */
    crop?: string;
    formatOptions?: ImageUploadFormatOptions;
    name: string;
    trimOptions?: ImageUploadTrimOptions;
    /**
     * When an uploaded image is smaller than the defined image size, we have 3 options:
     *
     * `undefined | false | true`
     *
     * 1. `undefined` [default]: uploading images with smaller width AND height than the image size will return null
     * 2. `false`: always enlarge images to the image size
     * 3. `true`: if the image is smaller than the image size, return the original image
     */
    withoutEnlargement?: ResizeOptions['withoutEnlargement'];
};
export type GetAdminThumbnail = (args: {
    doc: Record<string, unknown>;
}) => false | null | string;
export type UploadConfig = {
    /**
     * The adapter name to use for uploads. Used for storage adapter telemetry.
     * @default undefined
     */
    adapter?: string;
    /**
     * Represents an admin thumbnail, which can be either a React component or a string.
     * - If a string, it should be one of the image size names.
     * - A function that generates a fully qualified URL for the thumbnail, receives the doc as the only argument.
     **/
    adminThumbnail?: GetAdminThumbnail | string;
    /**
     * Enables cropping of images.
     * @default true
     */
    crop?: boolean;
    /**
     * Disable the ability to save files to disk.
     * @default false
     */
    disableLocalStorage?: boolean;
    /**
     * Ability to filter/modify Request Headers when fetching a file.
     *
     * Useful for adding custom headers to fetch from external providers.
     * @default undefined
     */
    externalFileHeaderFilter?: (headers: Record<string, string>) => Record<string, string>;
    /**
     * Require files to be uploaded when creating a document.
     * @default true
     */
    filesRequiredOnCreate?: boolean;
    /**
     * Enables focal point positioning for image manipulation.
     * @default false
     */
    focalPoint?: boolean;
    /**
     * Format options for the uploaded file. Formatting image sizes needs to be done within each formatOptions individually.
     */
    formatOptions?: ImageUploadFormatOptions;
    /**
     * Custom handlers to run when a file is fetched.
     *
     * - If a handler returns a Response, the response will be sent to the client and no further handlers will be run.
     * - If a handler returns null, the next handler will be run.
     * - If no handlers return a response the file will be returned by default.
     *
     * @default undefined
     */
    handlers?: ((req: PayloadRequestWithData, args: {
        doc: TypeWithID;
        params: {
            collection: string;
            filename: string;
        };
    }) => Promise<Response> | Promise<void> | Response | void)[];
    imageSizes?: ImageSize[];
    /**
     * Restrict mimeTypes in the file picker. Array of valid mime types or mimetype wildcards
     * @example ['image/*', 'application/pdf']
     * @default undefined
     */
    mimeTypes?: string[];
    /**
     * Ability to modify the response headers fetching a file.
     * @default undefined
     */
    modifyResponseHeaders?: ({ headers }: {
        headers: Headers;
    }) => Headers;
    /**
     * Sharp resize options for the original image.
     * @link https://sharp.pixelplumbing.com/api-resize#resize
     * @default undefined
     */
    resizeOptions?: ResizeOptions;
    /**
     * The directory to serve static files from. Defaults to collection slug.
     * @default undefined
     */
    staticDir?: string;
    trimOptions?: ImageUploadTrimOptions;
};
export type SanitizedUploadConfig = UploadConfig & {
    staticDir: UploadConfig['staticDir'];
};
export type File = {
    /**
     * The buffer of the file.
     */
    data: Buffer;
    /**
     * The mimetype of the file.
     */
    mimetype: string;
    /**
     * The name of the file.
     */
    name: string;
    /**
     * The size of the file in bytes.
     */
    size: number;
};
export type FileToSave = {
    /**
     * The buffer of the file.
     */
    buffer: Buffer;
    /**
     * The path to save the file.
     */
    path: string;
};
export type UploadEdits = {
    crop?: {
        height?: number;
        width?: number;
        x?: number;
        y?: number;
    };
    focalPoint?: {
        x?: number;
        y?: number;
    };
};
//# sourceMappingURL=types.d.ts.map