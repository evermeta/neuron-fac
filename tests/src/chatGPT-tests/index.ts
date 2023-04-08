
/******************************************************************************/
import { expect } from "chai";
/******************************************************************************/
import { Configuration, CreateCompletionRequestPrompt, OpenAIApi } from "openai";
import * as dotenv from 'dotenv' 
import { joinStrings } from "../../../src/utils/strings/utils";
import { thisPage } from "../../../src/utils/process/types";
import { makePrompt, getGPTProgram } from "../../../src/generative-AI/generating-chatGPT-programs";
import { VirtualDev } from "../../../src/virtual-dev/virtual-dev-types";
/*******************************************************************************/
dotenv.config();
/*******************************************************************************/

const resultAsArray = (x: string) => x.split('\n');

const promptFibonnaci = joinStrings("the fibonacci sequence up to that number.")
const promptPrime = joinStrings("returns true if a is prime, false otherwise.")

let openAiAPI: OpenAIApi;
const pageName = thisPage();


before(async () => {
    const configurationValues = {
        organization: process.env.OPENAI_ORG_ID, 
        apiKey: process.env.OPENAI_API_KEY,
    };
    const configuration = new Configuration(configurationValues);
    openAiAPI = new OpenAIApi(configuration);
    const response = await openAiAPI.listEngines();
    console.log(response);
    /*try {
        const completion = await openAiAPI.createCompletion({
          model: "text-davinci-003",
          prompt: makePrompt(promptPrime),
          temperature: 0,
          max_tokens: 100,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        console.log(`${completion.data.choices[0].text}`);
      } catch (error: any) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      }*/
});   

describe("The VirtualDev class", async () => {
    it("Can be instantiated", async () => {
        const va = new VirtualDev();
        expect(va).to.be.an.instanceOf(VirtualDev);
    });
});

describe (`${pageName} tests - The makePrompt function`, async () => { 
    
  let primeNumberJSCode: string[];
 /* it("Request a program from an OpenAI engine", async () => {
    const prompt: string = makePrompt(
        openAiAPI,
        "fibonacci",
        ["a, an integer greater than 0"],
        promptFibonnaci);
    const resultArray = await getGPTProgram(openAiAPI, prompt);
    console.log(resultArray);
    expect(1).to.equal(1);
  });*/

  it("Can build a prompt that can be sent to chatGPT to request a program", async () => {  
    const prompt: CreateCompletionRequestPrompt = makePrompt(
        openAiAPI, 
        "primeNumber", 
        ["a, an integer greater than 0"], 
        promptPrime);

      try {
          const completion = await openAiAPI.createCompletion({
            model: "text-davinci-003",
            prompt, temperature: 0,
            max_tokens: 1000, top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        const result = completion.data.choices[0].text;
        if(typeof result === 'string') {
          primeNumberJSCode = resultAsArray(result);
          expect(1).to.equal(1);
    } else {
      expect(1).to.equal(0);
    }
      } catch (error: any) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }
          expect(1).to.equal(0);
      }
  });

  /*
  it("That program can be executed", async () => {
    const inputs: ProgramArguments = {a: {type: "Number", index: 0}};
    const program = new Program('javascript', inputs, "Boolean", primeNumberJSCode);
    const execProcess: ExecProcess = jsCompiler(program);
    expect(1).to.equal(1);
  });*/
});


describe( `The getGPTProgram function`, async () => {
    it("Can get a program from OpenAI", async () => {
        const prompt: string = makePrompt(
            openAiAPI,
            "fibonacci",
            ["a, an integer greater than 0"],
            promptFibonnaci);
        const resultArray = await getGPTProgram(openAiAPI, prompt);
        expect(1).to.equal(1);
    });
});
