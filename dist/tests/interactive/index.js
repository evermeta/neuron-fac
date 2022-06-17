"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../src/utils/console/interactive/types");
const interactiveConsole = new types_1.ConsoleInteractive();
const p = interactiveConsole.promptUser().then((_) => "Interactive Test Is Over");
