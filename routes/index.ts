/*******************************************************************************

*******************************************************************************/
import fs from "fs";
import express, {Request, Response} from "express";
import { NeuronFacApp, PageHandler } from "../src/server/types";
import rateLimit from "express-rate-limit";

/******************************************************************************/

export const newIndexRouter = (
    route = "", 
    app: NeuronFacApp): PageHandler => {

    const expressRouter = express.Router( );
    const viewPath = route === "" ? "index" : route ;
    const httpRootPath = `/${route}` ;

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    })
    expressRouter.use(limiter); 
    expressRouter.get(httpRootPath, (req: Request, res: Response) => {

        const listOfFiles = fs.readdirSync( app.path ) ; 
        res.render(viewPath, { title: listOfFiles }) ;

    });

    app.expressApp.use(expressRouter);

    return {
        expressRouter,
    };
};
