/******************************************************************************/

import { expect } from "chai";
import path from "path";
import os from 'os';
import fs from 'fs';
/******************************************************************************/

import { deepFileList } from "../../../../src/utils/files/file-lists";
import { newFolder } from "../../../../src/utils/files/folders";
import { Folder, IFile } from "../../../../src/utils/files/types";
/******************************************************************************/

const tempDir = os.tmpdir();
/******************************************************************************/

describe('The deepFileList function used within a local file system', async () => {
    const folderPath = path.join(tempDir, 'test-deepFileList-folder');

    const fileInterface: IFile<string> = {
        listing: async (path: string) => fs.readdirSync(path),
        isDirectory: (f: string) => fs.statSync(f).isDirectory(),
        absolutePath: (base: string, f: string) => path.join(base, f)
    };
   
    const toPath = (f: Folder) => f.path;
    const localFileDirectoryListing = async (folder: Folder) => deepFileList(fileInterface, folder, toPath);

    it('Returns an empty array if the  folder is empty', async () => {
        const folder = await newFolder(folderPath);
        const files = await localFileDirectoryListing(folder); 
        expect(files).to.deep.equal([]);
    });

    it('Returns an array with the file name if the folder contains a single file', async () => {
        const folder = await newFolder(folderPath);
        await folder.write('file1.txt', 'content');
        const files = await localFileDirectoryListing(folder);
        expect(files).to.deep.equal(['file1.txt']);
    });
    
    it('Returns an array with the file names if the folder contains multiple files in subfolers', async () => {
        const folder = await newFolder(folderPath);
        await folder.write('file1.txt', 'content');
        const subFolder = await newFolder(path.join(folder.path, 'subfolder'));
        await subFolder.write('file2.txt', 'content');
        await subFolder.write('file3.txt', 'content');
        const files = await localFileDirectoryListing(folder);
        expect(files.length).to.deep.equal(3);
    });
});