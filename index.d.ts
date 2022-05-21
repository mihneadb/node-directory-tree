import { Stats } from "fs";

interface IObj {
  [key: string]: any;
}

declare function directoryTree<
  TCustomFile extends IObj = IObj,
  TCustomDir extends IObj = IObj,
  TCustomResult = TCustomFile & TCustomDir
>(
  path: string,
  options?: directoryTree.DirectoryTreeOptions,
  onEachFile?: directoryTree.DirectoryTreeCallback<TCustomFile>,
  onEachDirectory?: directoryTree.DirectoryTreeCallback<TCustomDir>
): directoryTree.DirectoryTree<TCustomResult>;

export as namespace directoryTree;

declare namespace directoryTree {
  export interface DirectoryTree<C extends IObj = IObj> {
    path: string;
    name: string;
    size: number;
    type: "directory" | "file";
    children?: DirectoryTree<C>[];
    extension?: string;
    isSymbolicLink?: boolean;
    custom: C;
  }

  export interface DirectoryTreeOptions {
    normalizePath?: boolean;
    exclude?: RegExp | RegExp[];
    attributes?: (keyof Stats | "type" | "extension")[];
    extensions?: RegExp;
    followSymlinks?: boolean;
    depth?: number;
  }

  export type DirectoryTreeCallback<TCustom extends IObj = IObj> = (
    item: DirectoryTree<TCustom>,
    path: string,
    stats: Stats
  ) => void;
}

export = directoryTree;
