import path from "path";
import express from "express";
import dotenv from "dotenv";
import { newIndexRouter } from "../../routes/index";
import { errorSubApp } from "./subApplications/appErrors";
import { NeuronFacApp } from "./neuronFacApplication";


dotenv.config();

const neuronFacApp: NeuronFacApp = {
    name: "NeuronFac",
    expressApp: express(),
    path: path.join(__dirname, "../../../")
}; // end neuronFacApp

const port = process.env.PORT;

newIndexRouter("error", neuronFacApp, {
    subApp: errorSubApp,
    renderView: true 
});

neuronFacApp.expressApp.use(express.json());
neuronFacApp.expressApp.use(express.urlencoded({ extended: true }));
neuronFacApp.expressApp.set("views", path.join(neuronFacApp.path, "views"));
neuronFacApp.expressApp.set("view engine", "hbs");
neuronFacApp.expressApp.use(express.static(
    path.join(neuronFacApp.path, "public")));


neuronFacApp.start(port);

neuronFacApp.expressApp.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
