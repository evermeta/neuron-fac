import { Application } from "../class-application";
import { IApplication, StartOptions } from "../types";


export const appTimerSubApp: IApplication = (()=>{

    const _start = async (options: StartOptions) => {
        console.log("appTimerSubApp start");
        return;
    };

    const _data = async () => {
        console.log("appTimerSubApp data");
        return {
            name: "clock",
            route: "clock"
        };
    };
    
    return {
        name: "clock",
        route: "clock",
        start: (options: StartOptions) => _start(options),
        data: () => _data() 
    }
})();