import { Stats } from "fs";

declare function directoryTree<
  TCustomFile extends Record<string, any> = Record<string, any>,
  TCustomDir extends Record<string, any> = Record<string, any>,
  TCustomResult extends Record<string, any> = TCustomFile & TCustomDir
>(
  path: string,
  options?: directoryTree.DirectoryTreeOptions,
  onEachFile?: directoryTree.DirectoryTreeCallback<TCustomFile>,
  onEachDirectory?: directoryTree.DirectoryTreeCallback<TCustomDir>
): directoryTree.DirectoryTree<TCustomResult>;

export as namespace directoryTree;

declare namespace directoryTree {
  export interface DirectoryTree<C extends Record<string, any> = Record<string, any>> {
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

  export type DirectoryTreeCallback<TCustom extends Record<string, any> = Record<string, any>> = (
    item: DirectoryTree<TCustom>,
    path: string,
    stats: Stats
  ) => void;
}

export = directoryTree;
