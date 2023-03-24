import { newIndexRouter } from "../../../routes";
import { NeuronFacApp } from "../neuronFacApplication";
import { IApplication } from "../types";

export const appMathSubApp: IApplication = (() => {
    let timeAlive = 0;
    const timer = setInterval(() => {
        timeAlive++;
    }, 1000);

    return {
        route: "math",
        name: "math",
        update: () => Promise.resolve(),
        data: () => {
            const payload = {};
            Object.assign(payload, {
                test: "test",
            }) ;
            return Promise.resolve(payload);
        }
    }
})();

export const mathRoutes = (neuronFacApp: NeuronFacApp) => {  
    return newIndexRouter("math", neuronFacApp, {
        subApp: appMathSubApp,
        renderView: true 
    });
};