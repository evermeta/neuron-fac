export type Action = void;
export type JSProgramAsJsonOutputType = boolean | number | string;

export type ProgramInputElementType = boolean | number | string | Action;
export type ProgramInputType = ProgramInputElementType[];
export const supportedInputTypes = {
    boolean: (x: unknown) => x instanceof Boolean,
    number: (x: unknown) => x instanceof Number,
    string: (x: unknown) => x instanceof String,
};

export type JSProgramType = (x: unknown) => JSProgramAsJsonOutputType;


export type JSProgramAsJson = {
    var: string;
    funcBody: string;
    returnType: string;
};
