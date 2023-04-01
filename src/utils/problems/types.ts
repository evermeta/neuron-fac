



export class Problem {
    constructor(issue:Record<string, unknown>) {
        if("name" in issue && issue.name === "HttpError") {
            this.constructFromHttpError(issue);
        }
        if(issue instanceof Error) {
            console.log(issue.message);
        }
    }

    private constructFromHttpError(error: Record<string, unknown>): void{
        if("message" in error) console.log(error.message);
        console.log(error);
    }
}