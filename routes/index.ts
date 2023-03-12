/*******************************************************************************
assumes theres is in an hbs page in ./views that has the same path
as the route
*******************************************************************************/
import fs from "fs";
import express, {Request, Response} from "express";
import { IApplication, PageHandler } from "../src/server/types";
import rateLimit from "express-rate-limit";
import { NeuronFacApp } from "../src/server/neuronFacApplication";

/******************************************************************************/

export const newIndexRouter = (
    route = "", 
    app: NeuronFacApp, 
    options: {
        subApp: IApplication | null, 
        renderView:boolean | null
        },
    ): PageHandler => {

    const expressRouter = express.Router( );
    const viewPath = route === "" ? "index" : route ;
    const httpRootPath = `/${route}` ;

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    })
    
    expressRouter.use(limiter); 

    expressRouter.get(httpRootPath, async (req: Request, res: Response) => {
        const appServerData = await app.appServerData(httpRootPath);
        if(options.renderView){
            res.render(viewPath, appServerData);
        }
    });

    app.expressApp.use(expressRouter);
    if(options.subApp) {
        app.addSubApps(httpRootPath, options.subApp);
    }

    return {
        expressRouter,
    };
};
