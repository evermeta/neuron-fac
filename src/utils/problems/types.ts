



export class Problem {
    constructor(issue:unknown) {
        console.log(issue);
        if(issue instanceof Error) {
            console.log(issue.message);
        }

    }
}