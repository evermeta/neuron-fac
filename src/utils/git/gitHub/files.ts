import { Octokit } from "octokit";
import { IGitRepository } from "../gitHub-module-types";
import { Problem } from "../../problems/types";


export const listFiles = async (
    octokit: Octokit,
    repo: IGitRepository): Promise<void | Problem> => {
        try {
            const content = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                owner: repo.owner,
                repo: repo.name,
                path: "",
                })
               
            console.log(content.data);
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            return new Problem(error);
        }
};

export  const addFileToEmptyRepository = async (
    octokit: Octokit, 
    repo: IGitRepository): Promise<void | Problem> => {

    try {
        const content = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: repo.owner,
            repo: repo.name,
            path: "README.md",
            })
           
        console.log(content.data);
        return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return new Problem(error);
    }

    
};