declare const directoryTree: (
  path: string,
  options?: {
    normalizePath?: boolean;
    exclude?: RegExp | RegExp[];
    extensions?: RegExp;
  },
  onEachFile?: (item: DirectoryTree, path: string) => void
) => DirectoryTree;

export declare class DirectoryTree {
  path: string;
  name: string;
  size: number;
  type: "directory" | "file";
  children?: DirectoryTree[];
  extension?: string;
}

export default directoryTree;
