

export class Ok {
    
        public data: unknown;
    
        constructor(data: unknown) {
            this.data = data;
        }
}

export class Problem {

    public message = "";

    constructor(issue:Record<string, unknown> | string ) {
        if(typeof issue === "string") {
            this.message = issue;
            return;
        }
        if(issue instanceof Error) {
            console.log(issue.message);
            this.message = issue.message;
            return;
        }
        const issueObj = issue as Record<string, unknown>;
        if("name" in issueObj && issueObj.name === "HttpError") {
            this.constructFromHttpError(issueObj);
        }
   }

    private constructFromHttpError(error: Record<string, unknown>): void{
        if("message" in error && typeof error.message === "string") {
            this.message = error.message;
            console.log(error.message);
        }
        console.log(error);
    }
}