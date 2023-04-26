import { createContext } from "react";

export interface IFileSystem {
  [key: string]: string | IFileSystem;
}

const fileSystemContext = createContext<IFileSystem>({});

export default fileSystemContext;
