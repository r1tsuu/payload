/* eslint-disable @typescript-eslint/unbound-method */ import { getTsconfig } from 'get-tsconfig';
import ts from 'typescript';
import { fileURLToPath, pathToFileURL } from 'url';
import { CLIENT_EXTENSIONS } from './clientExtensions.js';
import { compile } from './compile.js';
import { specifiersToIgnore } from './ignores.js';
import { resolveOriginalPath } from './resolveOriginalPath.js';
const locatedConfig = getTsconfig();
const tsconfig = locatedConfig.config.compilerOptions;
// Ensure baseUrl is set in order to support paths
if (!tsconfig.baseUrl) {
    tsconfig.baseUrl = '.';
}
// Don't resolve d.ts files, because we aren't type-checking
tsconfig.noDtsResolution = true;
tsconfig.module = ts.ModuleKind.ESNext;
tsconfig.moduleResolution = ts.ModuleResolutionKind.NodeNext;
const moduleResolutionCache = ts.createModuleResolutionCache(ts.sys.getCurrentDirectory(), (x)=>x, tsconfig);
const host = {
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile
};
const TS_EXTENSIONS = [
    ts.Extension.Ts,
    ts.Extension.Tsx,
    ts.Extension.Dts,
    ts.Extension.Mts
];
export const resolve = async (specifier, context, nextResolve)=>{
    const isTS = TS_EXTENSIONS.some((ext)=>specifier.endsWith(ext));
    const isClient = CLIENT_EXTENSIONS.some((ext)=>specifier.endsWith(ext));
    const shouldIgnore = specifiersToIgnore.includes(specifier);
    // If it's a client file, or a file to be ignored is resolved,
    // we'll set `format: 'ignore'`
    // and short circuit, so the load step
    // will return source code of empty object
    if (isClient || shouldIgnore) {
        return {
            format: 'ignore',
            shortCircuit: true,
            // No need to resolve the URL using nextResolve. We ignore client files anyway.
            // Additionally, nextResolve throws an error if the URL is a TS path, so we'd have to use TypeScript's resolveModuleName to resolve the URL, which is unnecessary
            url: 'file:///'
        };
    }
    // entrypoint
    if (!context.parentURL) {
        return {
            format: isTS ? 'ts' : undefined,
            shortCircuit: true,
            url: specifier
        };
    }
    // Try and resolve normally
    // This could fail, so we need to swallow that error
    // and keep going
    let nextResult;
    if (!isTS) {
        try {
            nextResult = await nextResolve(specifier, context, nextResolve);
        } catch (_) {
        // swallow error
        }
    }
    if (nextResult) {
        const nextResultIsTS = TS_EXTENSIONS.some((ext)=>nextResult.url.endsWith(ext));
        return {
            ...nextResult,
            format: nextResultIsTS ? 'ts' : nextResult.format,
            shortCircuit: true
        };
    }
    const { resolvedModule } = ts.resolveModuleName(specifier, fileURLToPath(context.parentURL), tsconfig, host, moduleResolutionCache);
    if (resolvedModule) {
        const resolvedIsTS = TS_EXTENSIONS.includes(resolvedModule.extension);
        const resolvedPath = await resolveOriginalPath(resolvedModule.resolvedFileName);
        return {
            format: resolvedIsTS ? 'ts' : undefined,
            shortCircuit: true,
            url: pathToFileURL(resolvedPath ?? resolvedModule.resolvedFileName).href
        };
    }
    // import from local project to either:
    // - something TS couldn't resolve
    // - local project non-TS file
    return nextResolve(specifier, context, nextResolve);
};
const swcOptions = {
    ...tsconfig,
    baseUrl: undefined,
    paths: undefined
};
export const load = async (url, context, nextLoad)=>{
    if (context.format === 'ignore') {
        const rawSource = 'export default {}';
        return {
            format: 'module',
            shortCircuit: true,
            source: rawSource
        };
    }
    if (context.format === 'ts') {
        const { source } = await nextLoad(url, context);
        const code = typeof source === 'string' ? source : Buffer.from(source).toString();
        const compiled = await compile(code, fileURLToPath(url), swcOptions);
        return {
            format: 'module',
            shortCircuit: true,
            source: compiled
        };
    } else {
        return nextLoad(url, context);
    }
};

//# sourceMappingURL=index.js.map