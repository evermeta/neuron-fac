import { IApplication } from "../types";
import {cpuUsage, cpuCount, freemem, totalmem, freememPercentage}  from 'os-utils'; 

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
                script: "alert('hello world')", 
                cpuCount: cpuCount(),
                freemem: freemem(),  
                currentMemoryUsage: freemem(),
                totalMemory: totalmem()
            }}) ;
            return Promise.resolve(payload);
        }
    }
})();