/******************************************************************************/

/******************************************************************************/
export type JSONObject = Record<string, unknown>;
export type Folder = {
    path: string;
    write: (fileName: string, content: JSONObject | string) => Promise<void>;
};

export interface IFile<F> {
    listing: (path: string) => Promise<F[]>;
    isDirectory: (f: F) => boolean;
    absolutePath: (base: string, f: F) => string;
}
