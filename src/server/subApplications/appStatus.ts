import { IApplication } from "../types";

export const appStatusSubApp: IApplication = (() => {
    let timeAlive = 0;
    const timer = setInterval(() => {
        timeAlive++;
    }, 1000);

    return {
        name: "status",
        update: () => Promise.resolve(),
        appData: () => {
            const payload = {};
            Object.assign(payload, {status: {
                timeAlive,
                script: "alert('hello world')"
            }}) ;
            return Promise.resolve(payload);
        }
    }
})();