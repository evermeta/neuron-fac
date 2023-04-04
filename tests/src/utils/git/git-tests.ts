/*****************************************************************************
 * 
 * 
 * **************************************************************************/

import * as dotenv from "dotenv";
/*****************************************************************************/

import { expect } from "chai";
/*****************************************************************************/

import { IGitAuth, IGitApi } from "../../../../src/utils/git/gitHub-module-types";
import { gitHubApi } from "../../../../src/utils/git/gitHub/gitHub-api";
import { thisPage } from "../../../../src/utils/process/types";
/*****************************************************************************/
dotenv.config();
/*****************************************************************************/

const testRepo = {
    owner: "FranckEinstein90",
    repo: "tendust",
};
const testSuite = async (gitHubToken: string) => {
    const gitHubAuth: IGitAuth = {
        apiToken: gitHubToken,
    };

    const gitHubManager: IGitApi = await gitHubApi(gitHubAuth);

    describe(`${thisPage()}::Objects that implement the IGitApi interface`, async ()=> {
        it("can retrieve the pull requests for a given repo", async () => {
            const prs = await gitHubManager.pullRequests({
                owner: "microsoft",
                name: "TypeScript",
                description: "test repo",
            });
            expect(Array.isArray(prs)).to.be.true;
            expect(prs.every((pr) => typeof pr.id === "number")).to.be.true;
            expect(prs.every((pr) => typeof pr.number === "number")).to.be.true;
        });

        it("can list all the branches for a given repo", async () => {
            const brs = await gitHubManager.branches({
                owner: testRepo.owner, 
                name: testRepo.repo, 
                description: "test repo",
            });
            expect(Array.isArray(brs)).to.be.true;
        });
        it("can create a new branche in a given repo", async () => {
            await gitHubManager.newBranch({
                owner: testRepo.owner, 
                name: testRepo.repo, 
                description: "test repo",
            }, 'test-branch');
            expect(1).to.equal(3);
        });
    });
}

if(process.env.GITHUB_TOKEN) {
    console.log(`GITHUB_TOKEN is set at ${thisPage()}`);
    testSuite(process.env.GITHUB_TOKEN);
} else {
    console.log([
        `This test suite in ${thisPage()} can't run because GITHUB_TOKEN is not set` ,
        "Please set GITHUB_TOKEN in your .env file"].join(''));
}