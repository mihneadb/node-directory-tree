declare function directoryTree(
    path: string,
    options?: {
        normalizePath?: boolean;
        exclude?: RegExp | RegExp[];
        attributes?: string[];
        extensions?: RegExp;
    },
    onEachFile?: (item: DirectoryTree.DirectoryTree, path: string, stats: DirectoryTree.Stats) => void,
    onEachDirectory?: (item: DirectoryTree.DirectoryTree, path: string, stats: DirectoryTree.Stats) => void,
): DirectoryTree.DirectoryTree;

export as namespace directoryTree

declare namespace DirectoryTree {
    export class DirectoryTree {
        path: string;
        name: string;
        size: number;
        type: "directory" | "file";
        children?: DirectoryTree[];
        extension?: string;
    }

    /*
     * Node.js fs.Stats from
     * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/fbe90f14d5f6b6d65c4aa78284f212c736078d19/types/node/index.d.ts#L3696
    */
    export class Stats {
        isFile(): boolean;
        isDirectory(): boolean;
        isBlockDevice(): boolean;
        isCharacterDevice(): boolean;
        isSymbolicLink(): boolean;
        isFIFO(): boolean;
        isSocket(): boolean;
        dev: number;
        ino: number;
        mode: number;
        nlink: number;
        uid: number;
        gid: number;
        rdev: number;
        size: number;
        blksize: number;
        blocks: number;
        atimeMs: number;
        mtimeMs: number;
        ctimeMs: number;
        birthtimeMs: number;
        atime: Date;
        mtime: Date;
        ctime: Date;
        birthtime: Date;
    }
}

export = DirectoryTree;
