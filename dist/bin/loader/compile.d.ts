import type * as ts from 'typescript';
export declare function compile(sourcecode: string, filename: string, options: ts.CompilerOptions & {
    fallbackToTs?: (filename: string) => boolean;
}): Promise<string>;
//# sourceMappingURL=compile.d.ts.map