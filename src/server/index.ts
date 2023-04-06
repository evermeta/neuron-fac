import path from "path";
import express, { Express } from "express";
import dotenv from "dotenv";
import { newIndexRouter } from "../../routes/index";
import { errorSubApp } from "./subApplications/appErrors";
import { NeuronFacApp } from "./neuronFacApplication";



dotenv.config();
const expressApp: Express = express();
const rootDirPath = path.join(__dirname, "../../../");

// The NeuronFac application container
const neuronFacApp = new NeuronFacApp(
    expressApp, 
    rootDirPath, 
    {
        port : +(process.env.PORT as string) || 3000,
        globalClientScript : async ()=>{
            return 'a+=1';
        }
    }
);


newIndexRouter("error", neuronFacApp, {
    subApp: errorSubApp,
    renderView: true 
});

(async ()=>{
    await neuronFacApp.start();
})();
