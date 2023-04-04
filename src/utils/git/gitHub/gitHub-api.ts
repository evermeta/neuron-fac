/******************************************************************************/

import { Octokit } from "octokit";
import {paginateRest} from "@octokit/plugin-paginate-rest";
/******************************************************************************/

import { IGitApi, IGitAuth, IGitBranch, IGitFile, IGitPullRequest, IGitRepositories, IGitRepository} from "../gitHub-module-types";
import { branches, newBranch } from "./branches";
import { pullRequests } from "./pull-requests";
import { Problem } from "../../problems/types";


const _listFiles = async (octokit: Octokit, repo: IGitRepository): Promise<IGitFile[] | Problem> => {
    try {
        const content = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: repo.owner,
            repo: repo.name,
            path: "",
            })
        return content.data as unknown[] as IGitFile[];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
            return new Problem(error);
    }
};

const _listRepositories = async (octokit: Octokit): Promise<IGitRepositories | Problem>  => {
    try{
        const repositories = [];
        for await (const response of octokit.paginate.iterator(octokit.rest.repos.listForAuthenticatedUser, 
            {per_page: 100 })) {
                repositories.push(...response.data);
        }
        //const repos = await octokit.rest.repos.listForAuthenticatedUser();
        return repositories.map(repo => {
            return {
                id: repo.id,
                name: repo.name,
                owner: repo.owner.login,
                description: repo.description ,
                url: repo.html_url
            }
        });
    } 
    catch(error){ return new Problem( error as Record<string, unknown>) }
};


export const gitHubApi = async (gitHubAuth: IGitAuth): Promise<IGitApi> => {
   
    const octokit = new Octokit({
        auth: gitHubAuth.apiToken,
        plugins: [paginateRest]
    });

    const _deleteRepository = async (repo: IGitRepository) => {
        try{
            await octokit.rest.repos.delete({
                owner: repo.owner,
                repo: repo.name,
            });
        }
        catch(error){
            throw new Problem( error as Record<string, unknown>);
        }
    }
    
    return {
        pullRequests: (repo: IGitRepository): Promise<IGitPullRequest[]> => pullRequests(octokit, repo),
        /**********************************************************************/
        newBranch: (repo: IGitRepository, branchName: string): Promise<void | Problem> => newBranch(octokit, repo, branchName),
        branches: (repo: IGitRepository): Promise<IGitBranch[]> => branches(octokit, repo),
        /**********************************************************************/
        createRepository: async (repo: IGitRepository): Promise<IGitRepository | Problem> => {
            try{
                const newRepo = await octokit.rest.repos.createForAuthenticatedUser({ 
                    name: repo.name
                });
                return {
                    id: newRepo.data.id,
                    name: newRepo.data.name,
                    owner: newRepo.data.owner.login,
                    description: newRepo.data.description ,
                    url: newRepo.data.html_url
                }
            }catch(error){
                const problem = new Problem( error as Record<string, unknown>);
                return problem;
            }
        },
        listRepositories: () => _listRepositories(octokit), 
        deleteRepository: _deleteRepository,

        /**********************************************************************/
        listFiles: (repo: IGitRepository): Promise<IGitFile[] | Problem> => _listFiles(octokit, repo),



   }
};
