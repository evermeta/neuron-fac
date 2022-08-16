const functionDefintions = [
    { name: "square", body: "(num: number): number => num * num" },
    { name: "cube", body: "(num: number): number => num * num * num" },
    {
        name: "areaOfCircle",
        body: "(radius: number): number => Math.PI * radius * radius",
    },
    { name: "areaOfSquare", body: "(side: number): number => side * side" },
];

export type JSProgramAsJson = {
    var: string;
    funcBody: string;
    returnType: string;
};
