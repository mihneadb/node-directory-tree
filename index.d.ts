import { Stats } from 'fs';

declare function directoryTree(
  path: string,
  options ? : directoryTree.DirectoryTreeOptions,
  onEachFile ? : directoryTree.DirectoryTreeCallback,
  onEachDirectory ? : directoryTree.DirectoryTreeCallback,
): directoryTree.DirectoryTree;

export as namespace directoryTree;

declare namespace directoryTree {
  export interface DirectoryTree {
    path: string;
    name: string;
    size: number;
    type: "directory" | "file";
    children ? : DirectoryTree[];
    extension?: string;
    isSymbolicLink?: boolean;
  }
  export interface DirectoryTreeOptions {
    normalizePath ? : boolean;
    exclude ? : RegExp | RegExp[];
    attributes ? : (keyof Stats | "type" | "extension")[];
    extensions ? : RegExp;
    followSymlink ? : boolean;
  }
  export type DirectoryTreeCallback = (item: DirectoryTree, path: string, stats: Stats) => void;
}

export = directoryTree;
