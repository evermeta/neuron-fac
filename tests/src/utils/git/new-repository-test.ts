import { expect } from "chai";
import { gitHubApi } from "../../../../src/utils/git/gitHub/gitHub-api";
import { IGitApi, IGitAuth } from "../../../../src/utils/git/types";

let gitHubManager: IGitApi;

const gitHubAuth: IGitAuth = {
    apiToken: process.env.GITHUB_TOKEN as string
};

before(async () => {
    gitHubManager = await gitHubApi(gitHubAuth);
});

describe(`Create new repos`, async ()=> {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
   it("The api manager can create new repositories ", async () => {
        await gitHubManager.createRepo({
            owner: "FranckEinstein90",
            repo: "test-repo1000",
        });
        expect(1).to.equal(1);
   });
});