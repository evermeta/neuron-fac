export type ProgramArguments = Record<string, { index: number; type: string }>;


export const renumberArgs = (args: ProgramArguments) => {

    const sortedArgsList = Object.entries(args).sort((a, b) => a[1].index - b[1].index);
    const newArgs: ProgramArguments = {};
    sortedArgsList.forEach((arg, index) => {
        newArgs[arg[0]] = { index, type: arg[1].type };
    });
    return newArgs;  
}
