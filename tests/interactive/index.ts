import { Command } from "../../src/utils/commands/types";
import { ConsoleInteractive } from "../../src/utils/console/interactive/types";
import {
    readJSON,
    writeJSON
} from "../../src/utils/files/index";

const commands: Command[] = [
    {
        name: "write",
        action: () => writeJSON("./ls.json", { ar: 3 }),
    },
    {
        name: "read",
        action: async () => {
            const payload = await readJSON("./ls.json");
            console.log(payload);
            return payload;
        },
    },
];

const interactiveConsole = new ConsoleInteractive("> ", commands);
interactiveConsole.promptUser().then(() => "Interactive Over");
