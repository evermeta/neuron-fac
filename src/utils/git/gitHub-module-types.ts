import { Problem } from "../problems/types";

export interface IGitAuth {
    apiToken: string;
}
export type IGitLink = {
        self: string;
        git: string;
        html: string;
};

export interface IGitFile {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string;
    type: string;
    _links: IGitLink[];
}

export interface IGitRepository{
    id?: number;
    owner: string;
    name: string;
    description: string | null;
    url?: string;
}

export type IGitRepositories = IGitRepository[];

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

    newBranch: (repo: IGitRepository, branchName: string) => Promise<void | Problem>;
    branches: (repo: IGitRepository) => Promise<IGitBranch[]>;
    pullRequests: (repo: IGitRepository) => Promise<IGitPullRequest[]>;

    /**********************************************************************/
    createRepository: (repo: IGitRepository) => Promise<IGitRepository | Problem>;
    deleteRepository: (repo: IGitRepository) => Promise<void>;
    listRepositories: () => Promise<IGitRepositories | Problem>;

    /**********************************************************************/
    listFiles: (repo: IGitRepository) => Promise<IGitFile[] | Problem>;

}

export class GitHubManager {
    public gitApi: IGitApi;

    constructor(gitApi: IGitApi) {
        this.gitApi = gitApi;
    }
}