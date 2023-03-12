/*******************************************************************************
 * Application used to provide information about the server
 * status.
 * 
 * https://gist.github.com/franckEinstein90/f9cefcb833a36d8d367b75ed66a99a82
 ******************************************************************************/
import { IApplication } from "../types";
import {cpuUsage, cpuCount, freemem, totalmem, freememPercentage}  from 'os-utils'; 


export const appStatusSubApp: IApplication = (() => {
    let timeAlive = 0;
    const timer = setInterval(() => {
        timeAlive++;
    }, 1000);

    return {
        route: "status",
        name: "status",
        update: () => Promise.resolve(),
        data: () => {
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