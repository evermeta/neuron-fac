import fs from "fs";
import express from "express";
import { NeuronFacApp } from "../src/server";

export type pageHandler = {
    expressRouter: express.Router;
};

export const newIndexRouter = (app: NeuronFacApp): pageHandler => {
    const expressRouter = express.Router();
    expressRouter.get("/", function (req, res) {
        const listOfFiles = fs.readdirSync(app.path);
        res.render("index", { title: listOfFiles });
    });

    return {
        expressRouter,
    };
};
