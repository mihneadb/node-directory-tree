declare const directoryTree: (
  path: string,
  options?: {
    normalizePath?: boolean;
    exclude?: RegExp | RegExp[];
    attributes?: string[];
    extensions?: RegExp;
  },
  onEachFile?: (item: DirectoryTree, path: string, stats: Stats) => void,
  onEachDirectory?: (item: DirectoryTree, path: string, stats: Stats) => void,
) => DirectoryTree;

export declare class DirectoryTree {
  path: string;
  name: string;
  size: number;
  type: "directory" | "file";
  children?: DirectoryTree[];
  extension?: string;
}

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

export default directoryTree;
