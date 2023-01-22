import path from "path";
import express, { Express } from "express";
import dotenv from "dotenv";
import { newIndexRouter } from "../../routes/index";
import { IApplication, NeuronFacApp } from "./types";
import { appStatusSubApp } from "./subApplications/appStatus";
import { errorSubApp } from "./subApplications/appErrors";


dotenv.config();
const port = process.env.PORT || 3000;
const expressApp: Express = express();
const rootDirPath = path.join(__dirname, "../../../");

const neuronFacApp = new NeuronFacApp(
    expressApp, 
    rootDirPath
    );

["", "gp"].map(route => newIndexRouter(route, neuronFacApp, null));
newIndexRouter("error", neuronFacApp, errorSubApp);
newIndexRouter("status", neuronFacApp, appStatusSubApp);

expressApp.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
