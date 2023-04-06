import { Octokit } from "octokit";
import { Problem } from "../../problems/types";
import { IGitBranch, IGitRepository } from "../gitHub-module-types";


export const branches = async (
    octokit: Octokit, 
    repo: IGitRepository): Promise<IGitBranch[]> => {

    const answer = await octokit.request("GET /repos/{owner}/{repo}/branches", {
        owner: repo.owner,
        repo: repo.name,
    });
    return answer.data;

};

export const newBranch = (
    octokit: Octokit, 
    repo: IGitRepository, 
    branchName: string): Promise<void | Problem> => {

    return octokit.rest.pulls.create({
        owner: repo.owner,
        repo: repo.name,
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