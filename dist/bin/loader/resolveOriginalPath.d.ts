/**
 * In case any directory in the path contains symlinks, this function attempts to detect that resolves the original path.
 *
 * Example Input: /Users/alessio/Documents/GitHub/payload-3.0-alpha-demo/node_modules/tailwindcss/resolveConfig.js
 * The "tailwindcss" in this example is a symlinked directory.
 *
 * Example Output: /Users/alessio/Documents/GitHub/payload-3.0-alpha-demo/node_modules/.pnpm/tailwindcss@3.4.3/node_modules/tailwindcss/resolveConfig.js
 */
export declare function resolveOriginalPath(filePath: string): Promise<string>;
//# sourceMappingURL=resolveOriginalPath.d.ts.map