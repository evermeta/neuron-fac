import { Octokit } from "octokit";
/******************************************************************************/

import { 
    IGitRepository, 
    IGitPullRequest } from "../gitHub-module-types";
/******************************************************************************/

export const pullRequests = async (
    octokit: Octokit, 
    repo: IGitRepository): Promise<IGitPullRequest[]> => {

    const answer = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
        owner: repo.owner,
        repo: repo.name,
    });
    return answer.data;

};