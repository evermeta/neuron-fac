import path from "path";
import express, { Express } from "express";
import dotenv from "dotenv";
import { newIndexRouter } from "../../routes/index";
import { NeuronFacApp } from "./types";
import { rateLimit } from "express-rate-limit";


dotenv.config();
const port = process.env.PORT;
const expressApp: Express = express();
const rootDirPath = path.join(__dirname, "../../../");
console.log(rootDirPath);


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
})
expressApp.use(limiter);
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));



expressApp.set("views", path.join(rootDirPath, "views"));
expressApp.set("view engine", "hbs");
expressApp.use(express.static(path.join(rootDirPath, "public")));

const neuronFacApp: NeuronFacApp = {
    expressApp,
    path: rootDirPath,
}; // end neuronFacApp

["", "gp"].map(route => newIndexRouter(route, neuronFacApp));

expressApp.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
