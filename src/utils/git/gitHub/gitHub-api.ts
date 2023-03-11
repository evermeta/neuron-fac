/******************************************************************************/

import { Octokit } from "octokit";
import { Problem } from "../../problems/types";
import { IGitApi, IGitAuth, IGitBranch, IGitPullRequest, IGitRepo } from "../types";
import { branches, newBranch } from "./branches";
import { pullRequests } from "./pull-requests";
/******************************************************************************/

export const gitHubApi = async (gitHubAuth: IGitAuth): Promise<IGitApi> => {
   
    const octokit = new Octokit({
        auth: gitHubAuth.apiToken,
    });

    return {
        pullRequests: (repo: IGitRepo): Promise<IGitPullRequest[]> => pullRequests(octokit, repo),
        /**********************************************************************/
        newBranch: (repo: IGitRepo, branchName: string): Promise<void | Problem> => newBranch(octokit, repo, branchName),
        branches: (repo: IGitRepo): Promise<IGitBranch[]> => branches(octokit, repo),
        /**********************************************************************/
        createRepo: async (repo: IGitRepo) => {
            await octokit.rest.repos.createForAuthenticatedUser({
                name: repo.repo,
            });
        },
   }
};

