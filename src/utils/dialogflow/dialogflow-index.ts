
interface IText {
    text: string[];
}

interface IResponseMessage {
    text: IText;
}

interface IFulfillementResponse {
    messages: IResponseMessage[];
}

export interface ISessionInfo {
    parameters: Record<string,  string | number>;
}

export const addSessionVariable = (
    sessionInfo: ISessionInfo, 
    key: string, 
    value: string | number) => {
        sessionInfo.parameters[key] = value;
};

export interface IDialogflow_webhook_answer {
    fulfillmentResponse?: IFulfillementResponse;
    sessionInfo?: ISessionInfo;
};

export const strWebhookAnswer = (outputParameters: Record<string, string | number>): string => {
    return JSON.stringify({
       sessionInfo: {
            parameters: outputParameters
        }
    });
};