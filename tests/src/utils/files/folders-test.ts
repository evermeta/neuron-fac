/******************************************************************************/

import { expect } from 'chai';
import os from 'os';
import fs from 'fs';
import path from 'path';
/******************************************************************************/

import { newFolder } from '../../../../src/utils/files/folders';
/******************************************************************************/

const tempDir = os.tmpdir();
/******************************************************************************/

describe('The newFolder function', async () => {
    it('Creates a new folder at the specified path', async () => {
        const folderPath = path.join(tempDir, 'test-folder');
        const folder = await newFolder(folderPath);
        expect(fs.existsSync(folder.path)).to.be.true;
    });
});