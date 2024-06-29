import fs from 'fs/promises';
import path from 'path';
/**
 * In case any directory in the path contains symlinks, this function attempts to detect that resolves the original path.
 *
 * Example Input: /Users/alessio/Documents/GitHub/payload-3.0-alpha-demo/node_modules/tailwindcss/resolveConfig.js
 * The "tailwindcss" in this example is a symlinked directory.
 *
 * Example Output: /Users/alessio/Documents/GitHub/payload-3.0-alpha-demo/node_modules/.pnpm/tailwindcss@3.4.3/node_modules/tailwindcss/resolveConfig.js
 */ export async function resolveOriginalPath(filePath) {
    try {
        // Normalize and split the path
        const parts = path.resolve(filePath).split(path.sep);
        let currentPath = parts[0] || '/';
        // skip the first slash
        for (const part of parts.slice(1)){
            currentPath = path.join(currentPath, part);
            // Check if the current path component is a symlink
            const stats = await fs.lstat(currentPath);
            if (stats.isSymbolicLink()) {
                // Resolve the symlink
                const resolvedLink = await fs.readlink(currentPath);
                if (!path.isAbsolute(resolvedLink)) {
                    currentPath = path.join(path.dirname(currentPath), resolvedLink);
                } else {
                    currentPath = resolvedLink;
                }
            }
        }
        return currentPath;
    } catch (error) {
        console.error('Error resolving path:', error);
    }
}

//# sourceMappingURL=resolveOriginalPath.js.map