/******************************************************************************/

import { expect } from "chai";
import { addSessionVariable, getRequestParameter, IDialogflow_webhook_answer, ISessionInfo, ParametersObjectType, strWebhookAnswer, subWebhook } from "../../../../src/utils/dialogflow/dialogflow-index";
/******************************************************************************/
describe("The ISessionInfo interface", () => {
    it("helper function: addSessionVariable allows adding a session variable to an answer", () => {
        const sessionInfo: ISessionInfo = { parameters: {} };
        addSessionVariable(sessionInfo, "testKey", "testValue");
        const testAnswer = JSON.stringify({ sessionInfo });
        const expectedAnswer = "{\"sessionInfo\":{\"parameters\":{\"testKey\":\"testValue\"}}}";
        expect(testAnswer).to.eq(expectedAnswer);
    });

    it("helper function: strWebhookAnswer", () => {
        it("Returns a string", ()=>{
            const testAnswer = strWebhookAnswer({
            userId: "X$fdsa9",
            userName: "franck",
            }) ;
            expect(testAnswer).to.be.a.string;
        });
        it('The string it returns is a valid sessionInfo object in json', ()=>{
            const testAnswer = strWebhookAnswer({
                userId: "X$fdsa9",
                userName: "franck",
            }) ;
            const expectedAnswer = "{\"sessionInfo\":{\"parameters\":{\"userId\":\"X$fdsa9\",\"userName\":\"franck\"}}}";
            expect(testAnswer).to.eq(expectedAnswer);
            expect(JSON.parse(testAnswer)).to.eq(JSON.parse(expectedAnswer));
        })
    });
});
/******************************************************************************/
describe("IDialoflow_webhook_answer interface", () => {
    it("produces a valid dialogflow answer", () => {
        const message = { text: ['test message'] };
        const responseMessage = { text: message };
        const fulfillementResponse = { messages: [responseMessage] };
        const dialoflow_webhook_answer: IDialogflow_webhook_answer = { fulfillmentResponse: fulfillementResponse, };
        
        const testAnswer = JSON.stringify(dialoflow_webhook_answer); 
        const expectedAnswer = "{\"fulfillmentResponse\":{\"messages\":[{\"text\":{\"text\":[\"test message\"]}}]}}";
        expect(testAnswer).to.eq(expectedAnswer);
    });
});

describe("getRequestParameter function", ()=> {  
    const sessionInfo: ISessionInfo = { parameters: {} };
    addSessionVariable(sessionInfo, "testKey", "testValue");
    it("returns an object", () => {
        const result = getRequestParameter(sessionInfo, "testKey");
        expect(result).to.be.an("object");
    });
});

describe("The subwebHook function", async ()=> {  

    it("returns an object", async () => {
        const appTest = async (inputs: ParametersObjectType): Promise<ParametersObjectType> => {
            const a: number = inputs['a'] as number;
            return { a: a + 1 } 
        }
        const hookOutput = await subWebhook({ a: 1 }, appTest);
        expect(hookOutput).to.be.an("object");
    });

});
