import { transform } from '@swc-node/core';
import { SourcemapMap } from '@swc-node/sourcemap-support';
import { tsCompilerOptionsToSwcConfig } from './read-default-tsconfig.js';
const injectInlineSourceMap = ({ code, filename, map })=>{
    if (map) {
        SourcemapMap.set(filename, map);
        const base64Map = Buffer.from(map, 'utf8').toString('base64');
        const sourceMapContent = `//# sourceMappingURL=data:application/json;charset=utf-8;base64,${base64Map}`;
        return `${code}\n${sourceMapContent}`;
    }
    return code;
};
export async function compile(sourcecode, filename, options) {
    if (filename.endsWith('.d.ts')) {
        return '';
    }
    const swcRegisterConfig = tsCompilerOptionsToSwcConfig(options, filename);
    return transform(sourcecode, filename, swcRegisterConfig).then(({ code, map })=>{
        return injectInlineSourceMap({
            code,
            filename,
            map
        });
    });
}

//# sourceMappingURL=compile.js.map