import * as readline from "readline";
import { Console } from "../types";
import { Command, Payload } from "../../commands/types";

export class ConsoleInteractive implements Console {
    private prompt: string;
    private readline: readline.Interface;
    private commands: Command[];

    constructor(prompt = "> ", commands: Command[] = []) {
        this.prompt = prompt;
        this.commands = commands;
        this.readline = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        this.readline.on("close", function () {
            console.log("Exiting interactive");
        });
    }

    async executeCommand(command: Command): Promise<Payload> {
        const payload = await command.action();
        return payload;
    }

    async process(cmd: string): Promise<void> {
        const cmdObject = this.commands.find((command) => command.name === cmd);
        if (cmdObject !== undefined) {
            await this.executeCommand(cmdObject);
        } else if (cmd === ":x" || cmd === "quit") {
            return this.readline.close();
        } else {
            console.log(`[Sorry, I don't understand '${cmd}']`);
        }
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
