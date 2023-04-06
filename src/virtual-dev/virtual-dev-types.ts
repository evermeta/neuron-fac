import { isArray } from "lodash";
import { GitHubManager, IGitRepositories, IGitRepository } from "../utils/git/gitHub-module-types";
import { Ok, Problem } from "../utils/problems/types";
/*****************************************************************************/

const checkForReadmeFileAndCreateIfAbsent = 
    async (githubManager: GitHubManager, repo: IGitRepository):
    Promise< Ok | Problem > => {
       
    //check if it has a README.md file
    const repoFileListing = await githubManager.gitApi.listFiles(repo);
    if (repoFileListing instanceof Problem) {
        return repoFileListing;
    }
    const readmeFile = repoFileListing.find(f => f.name === "README.md");
    if (!readmeFile) {
        return new Problem("No README.md file found");
    }
    return new Ok("README.md file found");
}

export type NewBranchOptions = {
    repo? : IGitRepository,
    branchName: string
}

export class VirtualDev {
    public name: string;
    private gitHubManager: GitHubManager;
    private repositories: IGitRepositories = [];
    private currentActiveRepository: IGitRepository | undefined;

    constructor(
        name = "VirtualDev", 
        gitHubManager: GitHubManager) {
        this.gitHubManager = gitHubManager;
        this.name = name;
   }

    public async init() {
        const repositories = await this.gitHubManager.gitApi.listRepositories();
        if (isArray(repositories)) {
            this.repositories = repositories;
        }
    }

    public async createNewRepository( 
        repoName: string, 
        options: { description?: string } = {} ) : Promise<IGitRepository | Problem> {

        // check if repo exists
        const existingRepo = this.repositories.find(r => r.name === repoName);
        if (existingRepo) {
            const existing = await checkForReadmeFileAndCreateIfAbsent(this.gitHubManager, existingRepo);
            if (existing instanceof Problem) {
                return existing as Problem;
            }
            this.currentActiveRepository = existingRepo;
        } 
     

        const newRepo = await this.gitHubManager.gitApi.createRepository({
            name: repoName,
            owner: this.name,
            description: options.description? options.description: "" 
        });
        if (newRepo instanceof Problem) {
            return newRepo;
        }
        this.repositories.push(newRepo);
        this.currentActiveRepository = newRepo;
        return newRepo;
    }

    public async createNewBranch(options: NewBranchOptions) {
        if(options.repo) {
            this.currentActiveRepository = options.repo;
        }
        if(!this.currentActiveRepository) {
            return new Problem({
                message: "No active repository",
                code: 400
            });
        }
        const newBranch = await this.gitHubManager.gitApi.newBranch(this.currentActiveRepository, options.branchName);
        return newBranch;
    }
}