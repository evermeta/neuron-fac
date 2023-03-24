import path from "path";
import express, { Express } from "express";
import dotenv from "dotenv";
import { newIndexRouter } from "../../routes/index";
import { appStatusSubApp } from "./subApplications/appStatus";
import { errorSubApp } from "./subApplications/appErrors";
import { appOutput} from "./subApplications/appOutput";
import { NeuronFacApp } from "./neuronFacApplication";
import { appTimerSubApp } from "./subApplications/appTimer";
import { mathRoutes } from "./math-routes";


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

( async ()=>{

    if(appOutput.execute){
        await appOutput.execute('out', {
            message: 'Starting NeuronFac application'
        });
    }

    ["", "gp", "github"].map(route => newIndexRouter(route, neuronFacApp, {
        subApp: null, 
        renderView: true
    }));

    newIndexRouter("clock", neuronFacApp, {
        subApp: appTimerSubApp,
        renderView: false 
    });

    //install the error sub application
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

    await mathRoutes(neuronFacApp);
    neuronFacApp.start();

})();
