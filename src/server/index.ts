import path from "path";
import express, { Express } from "express";
import dotenv from "dotenv";
import { newIndexRouter } from "../../routes/index";
import { appStatusSubApp } from "./subApplications/appStatus";
import { errorSubApp } from "./subApplications/appErrors";
import { NeuronFacApp } from "./neuronFacApplication";


dotenv.config();
const port = +(process.env.PORT as string) || 3000;
const expressApp: Express = express();
const rootDirPath = path.join(__dirname, "../../../");

const neuronFacApp = new NeuronFacApp(
    expressApp, 
    rootDirPath, 
    {
        globalClientScript : async ()=>{
            return 'a+=1';
        }
    }
    );

["", "gp"].map(route => newIndexRouter(route, neuronFacApp, {
    subApp: null, 
    renderView: true
}));

newIndexRouter("error", neuronFacApp, {
    subApp: errorSubApp,
    renderView: true 
});

newIndexRouter("status", neuronFacApp, {
    subApp: appStatusSubApp, 
    renderView: true
});

newIndexRouter("chromeless", neuronFacApp, {
    subApp: null,
    renderView: false
});

neuronFacApp.start(port);
