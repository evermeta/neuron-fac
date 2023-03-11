import { Octokit } from "octokit";
import { Problem } from "../../problems/types";
import { IGitRepo, IGitBranch } from "../types";


export const branches = async (octokit: Octokit, repo: IGitRepo): Promise<IGitBranch[]> => {
    const answer = await octokit.request("GET /repos/{owner}/{repo}/branches", {
        owner: repo.owner,
        repo: repo.repo,
    });
    return answer.data;
};

export const newBranch = (
    octokit: Octokit, repo: IGitRepo, branchName: string): Promise<void | Problem> => {
    return octokit.rest.pulls.create({
        owner: repo.owner,
        repo: repo.repo,
        head: branchName,
        base: "master",
        title: `PR for ${branchName}`,
    })
    .then(answer => {
        console.log(answer);
        return
    }) 
    .catch(error => {
        return new Problem(error);
    });
};