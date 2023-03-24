
/******************************************************************************/
import { expect } from "chai";
/******************************************************************************/
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv' 

/*const configuration = new Configuration({
    organization: "YOUR_ORG_ID",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();
*/

dotenv.config();
/*******************************************************************************/

before(async () => {
    const configurationValues = {
        organization: process.env.OPENAI_ORG_ID, 
        apiKey: process.env.OPENAI_API_KEY,
    };
    const configuration = new Configuration(configurationValues);
    const openai = new OpenAIApi(configuration);
    const response = await openai.listEngines();
    try {
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: "write a javascript function that takes an integer greater than 0 and returns the fibonacci sequence up to that number. Return only the javascript function, and not other code or text.",
          temperature: 0,
          max_tokens: 100,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        const resultFunction = completion.data.choices[0].text?.split('\n');
        console.log(`${completion.data.choices[0].text}`);
      } catch (error: any) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      }
   
});   

  // your asynchronous code here
describe (`TestFunction type`, () => { 
    it("is a function that takes a Program and returns a Percentage", () => {
       expect(1).to.equal(1);
    });
});
