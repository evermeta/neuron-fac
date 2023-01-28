/******************************************************************************/

import { expect } from "chai";
import { addSessionVariable, IDialogflow_webhook_answer, ISessionInfo, strWebhookAnswer } from "../../../../src/utils/dialogflow/dialogflow-index";
/******************************************************************************/
describe("The ISessionInfo interface", () => {
    it("helper function: addSessionVariable allows adding a session variable to an answer", () => {
        const sessionInfo: ISessionInfo = { parameters: {} };
        addSessionVariable(sessionInfo, "testKey", "testValue");
        const testAnswer = JSON.stringify({ sessionInfo });
        const expectedAnswer = "{\"sessionInfo\":{\"parameters\":{\"testKey\":\"testValue\"}}}";
        expect(JSON.stringify(testAnswer)).to.eq(expectedAnswer);
    });

    it("helper function: strWebhookAnswer", () => {
        const testAnswer = strWebhookAnswer({
            userId: "X$fdsa9",
            userName: "franck",
        }) ;
        const expectedAnswer = "{\"userId\":\"X$fdsa9\",\"userName\":\"franck\"}"; 
        expect(JSON.stringify(testAnswer)).to.eq(expectedAnswer);
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
