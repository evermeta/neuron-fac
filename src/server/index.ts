import path from "path";
import express, { Express } from "express";
import dotenv from "dotenv";
import { newIndexRouter } from "../../routes/index";
import { NeuronFacApp } from "./types";


dotenv.config();

const neuronFacApp: NeuronFacApp = {
    name: "NeuronFac",
    expressApp: express(),
    path: path.join(__dirname, "../../../")
}; // end neuronFacApp

const port = process.env.PORT;


neuronFacApp.expressApp.use(express.json());
neuronFacApp.expressApp.use(express.urlencoded({ extended: true }));
neuronFacApp.expressApp.set("views", path.join(neuronFacApp.path, "views"));
neuronFacApp.expressApp.set("view engine", "hbs");
neuronFacApp.expressApp.use(express.static(
    path.join(neuronFacApp.path, "public")));


["", "gp"].map(route => newIndexRouter(route, neuronFacApp));

neuronFacApp.expressApp.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
