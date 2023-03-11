import { Problem } from "../problems/types";

export interface IGitAuth {
    apiToken: string;
}

export interface IGitRepo {
    owner: string;
    repo: string;
}

export interface IGitPullRequest {
    id:number;
    number: number;
}
 
export interface IGitBranch{
    name: string;
    commit: {
        sha: string;
        url: string;
    };
    protected: boolean;
}

export interface IGitApi {
    newBranch: (repo: IGitRepo, branchName: string) => Promise<void | Problem>;
    branches: (repo: IGitRepo) => Promise<IGitBranch[]>;
    pullRequests: (repo: IGitRepo) => Promise<IGitPullRequest[]>;
    createRepo: (repo: IGitRepo) => Promise<void>;
}

