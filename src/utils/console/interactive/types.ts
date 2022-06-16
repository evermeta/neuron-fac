import * as readline from "readline";

export interface Console {
    promptUser: () => Promise<void>;
}

export class ConsoleInteractive implements Console {
    private prompt: string;
    private readline: readline.Interface;

    constructor(prompt = "> ") {
        this.prompt = prompt;
        this.readline = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        this.readline.on("close", function () {
            console.log("Exiting interactive");
        });
    }

    async process(cmd: string): Promise<void> {
        if (cmd === ":x" || cmd === "quit") return this.readline.close();
        console.log(`[Sorry, I don't understand '${cmd}']`);
        return this.promptUser();
    }

    promptUser(): Promise<void> {
        return new Promise((resolve) => {
            this.readline.question(this.prompt, (answer: string) => {
                return resolve(this.process(answer));
            });
        });
    }
}
