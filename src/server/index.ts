import path from "path";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { newIndexRouter } from "../../routes/index";
/*import createError from 'http-errors'; 
import cookieParser from 'cookie-parser'; 

/*var logger = require("morgan");

/*

// view engine setup

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());*/

export interface NeuronFacApp {
    expressApp: express.Express;
    path: string;
}

dotenv.config();
const port = process.env.PORT;
const expressApp: Express = express();
const rootDirPath = path.join(__dirname, "../../../");
console.log(rootDirPath);
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));
expressApp.set("views", path.join(rootDirPath, "views"));
expressApp.set("view engine", "hbs");
expressApp.use(express.static(path.join(rootDirPath, "public")));

const neuronFacApp: NeuronFacApp = {
    expressApp,
    path: rootDirPath,
}; // end neuronFacApp

const indexHandler = newIndexRouter(neuronFacApp);
expressApp.use(indexHandler.expressRouter);
expressApp.get("/blood", (req: Request, res: Response) => {
    res.send("Express peScript Server");
});

expressApp.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
