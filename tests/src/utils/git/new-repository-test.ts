import { expect } from "chai";
import { gitHubApi } from "../../../../src/utils/git/gitHub/gitHub-api";
import { IGitApi, IGitAuth, IGitRepository } from "../../../../src/utils/git/gitHub-module-types";
import { Problem } from "../../../../src/utils/problems/types";

const testRepoName = "test-repo1000";
const testRepo: IGitRepository = {
    owner: "FranckEinstein90",
    name: "test-repo1000",
    description: "test repo"
};

let gitHubManager: IGitApi;

const gitHubAuth: IGitAuth = {
    apiToken: process.env.GITHUB_TOKEN as string
};

before(async () => {
    gitHubManager = await gitHubApi(gitHubAuth);
});


describe("List repositories", async ()=> {
    // eslint-disable-next-line @typescript-eslint/no-empty-function

    it("The api manager can list the repositories to which it has access", async () => {
        const repos = await gitHubManager.listRepositories();
        expect(repos).to.be.an("array");
    });

    it("Can delete repositories", async () => {
        const repos = await gitHubManager.listRepositories();
        if(repos instanceof Problem) {
            throw new Error(repos.message);
        }
        const repo = repos.find(r => r.name === testRepoName);
        if (repo) {
            await gitHubManager.deleteRepository(repo);
        }
        expect(1).to.equal(1);
    });

});

describe(`Create new repos`, async ()=> {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
   it("The api manager can create new repositories ", async () => {
        const newRepo = await gitHubManager.createRepository({
            owner: "FranckEinstein90",
            name: "test-repo1000",
            description: "test repo",
        });
        if(newRepo instanceof Problem) {
            expect(1).to.equal(2);
        }
        expect((newRepo as IGitRepository).name).to.equal(testRepoName);
   });
});

after(async () => {
    await gitHubManager.deleteRepository(testRepo);
});

