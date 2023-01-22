import { IApplication } from "../types";

export const errorSubApp: IApplication = {
    name: "error",
    update: () => Promise.resolve(),
    appData: () => {
        const payload = {};
        Object.assign(payload, {error: {
            status: "ACTIVE",
            stack: "stack:trac:plac"
       }}) ;
       return Promise.resolve(payload); 
    }
};
