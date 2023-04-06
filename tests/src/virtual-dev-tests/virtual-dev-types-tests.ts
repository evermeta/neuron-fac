/*****************************************************************************
 * 
 * 
 * **************************************************************************/

import * as dotenv from "dotenv";
/*****************************************************************************/

import { expect } from "chai";
/*****************************************************************************/

import { GitHubManager, IGitAuth, IGitRepository } from "../../../src/utils/git/gitHub-module-types";
import { gitHubApi } from "../../../src/utils/git/gitHub/gitHub-api";
import { VirtualDev } from "../../../src/virtual-dev/virtual-dev-types";
import { Problem } from "../../../src/utils/problems/types";
/*****************************************************************************/

dotenv.config();
/*****************************************************************************/

let gitHubManager: GitHubManager;
let testRepo: IGitRepository | Problem;

const gitHubAuth: IGitAuth = {
    apiToken: process.env.GITHUB_TOKEN as string
};

before(async () => {
    const gitApi = await gitHubApi(gitHubAuth);
    gitHubManager = new GitHubManager(gitApi);
});

describe("The VirtualDev class", async () => {

    it("can be instantianted", async () => {
        const virtualDev = new VirtualDev("FranckEinstein90", gitHubManager); 
        await virtualDev.init();
        expect(virtualDev.name).to.equal("FranckEinstein90");
    });

    it("Can create a new repository if it doesn't exist in its list", async () => {
        const virtualDev = new VirtualDev("FranckEinstein90", gitHubManager); 
        await virtualDev.init();
        
        testRepo = await virtualDev.createNewRepository("new-repo-test");
        expect(testRepo instanceof Problem).to.be.false;
        expect((testRepo as IGitRepository).name).to.equal("new-repo-test");
    });


});