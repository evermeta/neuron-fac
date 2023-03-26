import { CreateCompletionRequestPrompt, CreateCompletionResponse, OpenAIApi } from "openai";
import { ProgramArguments } from "../gp/types";
import { joinStrings } from "../utils/strings/utils";

const resultAsArray = (x: string) => x.split('\n');


const codeInstructionOne = `1. Provide the code for the complete file surrounded by tags in this format: 
<Code filePath="...">[code goes here]</Code>`;

const codeInstructionTwo = `2. Write a description of the changes you made, and of the code 
you wrote and surround the description by the tags: 
<WorkDescription filePath="...">[work description goes here]</WorkDescription>`;

const codeInstructionTree = `3. For every code file you write or modify, create a corresponding 
file in the test server code using typescript, mocha, and chai, that provides test 
coverage for the code you wrote`;

const codeInstructionFour = `4. If you include any external libraries, include the npm install 
commands that must be renamed in your work description. For example, if you include 
the library "supertest" in a file, include the line: "usage: npm i supertest" in your work description`;

const postInstructions = `
${[codeInstructionOne, codeInstructionTwo, codeInstructionTree, codeInstructionFour].join("\n")}`;

export const makePrompt = (
    openAiAPI: OpenAIApi,
    functionName: string, 
    argumentDescriptions: string[] | ProgramArguments, 
    returnDescription : string, 
    language = "js"): string => {

    const platformDescription = `nodeJS and express, using typeScript. For testing, it
    uses mocha and chai`;
    const promptDescriptions = (Array.isArray(argumentDescriptions)) 
        ? (argumentDescriptions as string[]).join(", ")
        : "" ;

    const prompt = joinStrings(
        `Please write code that meets the following requirements. The platform for the project is: 
        ${platformDescription}. The project is structured in the following way:

        ----------------------- 
        ./src
        ./src/math/utils/
        ./src/server
        ./test/server
        ./test/math
        ----------------------- 

        Write the code for ./src/math/utils.ts the ${language} function: '${functionName}' that takes `,
        promptDescriptions, " and ", returnDescription,`. The function should be placed in a new file 
        called with the same name as the function your write. 
        Indicate the name and path of the file that should contain your code. Your response should meet the
        following requirements:\n`, postInstructions
        
        );
    return prompt
};

export const getGPTProgram = async (
    openAiAPI: OpenAIApi, 
    prompt: string): Promise<string[]> => {
    let resultArray: string[] = [];

    try {
        const completion = await openAiAPI.createCompletion({
            model: "text-davinci-003",
            prompt, temperature: 0,
            max_tokens: 1000, top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        const result = completion.data.choices[0].text;
        return typeof result === 'string'
            ? resultAsArray(result)
            : [];
    } catch (error: any) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        return []
    }
}

