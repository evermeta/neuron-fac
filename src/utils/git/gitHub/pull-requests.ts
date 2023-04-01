import { Octokit } from "octokit";
import { IGitRepo, IGitPullRequest } from "../types";

export const pullRequests = async (octokit: Octokit, repo: IGitRepo): Promise<IGitPullRequest[]> => {
    const answer = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
        owner: repo.owner,
        repo: repo.repo,
    });
    return answer.data;
};