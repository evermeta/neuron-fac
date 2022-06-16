import { ConsoleInteractive } from "../../src/utils/console/interactive/types";

const interactiveConsole = new ConsoleInteractive();
const p = interactiveConsole.promptUser().then((_) => "Interactive Test Is Over");
