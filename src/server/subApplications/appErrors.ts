import { IApplication } from "../types";

export const errorSubApp: IApplication = {
    name: "error",
    route: "error",
    update: () => Promise.resolve(),
    data: () => {
        const payload = {};
        Object.assign(payload, {error: {
            status: "ACTIVE",
            stack: "stack:trac:plac"
       }}) ;
       return Promise.resolve(payload); 
    }
};
