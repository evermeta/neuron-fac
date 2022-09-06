/*******************************************************************************

*******************************************************************************/
import fs from "fs";
import express from "express";
import { NeuronFacApp, PageHandler } from "../src/server/types";

/******************************************************************************/

export const newIndexRouter = (
    route = "", 
    app: NeuronFacApp): PageHandler => {

    const expressRouter = express.Router( );
    const viewPath = route === "" ? "index" : route ;
    const httpRootPath = `/${route}` ;

    expressRouter.get(httpRootPath, (req, res) => {

        const listOfFiles = fs.readdirSync( app.path ) ; 
        res.render(viewPath, { title: listOfFiles }) ;

    });

    app.expressApp.use(expressRouter);

    return {
        expressRouter,
    };
};
