import { Command } from "../../src/utils/commands/types";
import { ConsoleInteractive } from "../../src/utils/console/interactive/types";
import {
    readJSONObjectFromFile,
    writeJSONObjectFromFile,
} from "../../src/utils/files/types";

const commands: Command[] = [
    {
        name: "write",
        action: () => writeJSONObjectFromFile("./ls.json", { ar: 3 }),
    },
    {
        name: "read",
        action: async () => {
            const payload = await readJSONObjectFromFile("./ls.json");
            console.log(payload);
            return payload;
        },
    },
];

const interactiveConsole = new ConsoleInteractive("> ", commands);
interactiveConsole.promptUser().then(() => "Interactive Over");
