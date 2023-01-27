/*******************************************************************************
 * This subapplication handles output
 ******************************************************************************/
 import winston from "winston";
 import { ExecuteOptions, IApplication } from "../types";
 /******************************************************************************/
 const newLogger = ()=>{
    return winston.createLogger({
        level       : 'info', 
        format      : winston.format.simple(), 
        transports  : [
            new winston.transports.Console()
        ]
    }); 
}

export const appOutput: IApplication = (() => {
    const logger  = newLogger();

    return {
         route: "output",
         name: "output",
         update: () => Promise.resolve(),
         execute: (command: string, options: ExecuteOptions)=>{
            {
                if(command === "out"){
                    if(!options.message) {
                        return Promise.reject("No message");
                    }
                    else {
                        logger.info(options.message);
                    }
                }
                return Promise.resolve();
            }
         },
         data: () => {
             const payload = {};
             Object.assign(payload, {output: {
                out: (message: string) => logger.info(message),
            }}) ;
            return Promise.resolve(payload);
         }
     }
 })();