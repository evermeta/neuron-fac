import express from "express";
import path from "path";
import { INeuronFacApp, IApplication } from "./types";

const setupStack = (expressApp: express.Express, applicationTopLevelPath: string) => {
    expressApp.use(express.json());
    expressApp.use(express.urlencoded({ extended: true }));
    expressApp.set("views", path.join(applicationTopLevelPath, "views"));
    expressApp.set("view engine", "hbs");
    expressApp.use(express.static(path.join(applicationTopLevelPath, "public")));
 };
      
export class NeuronFacApp implements INeuronFacApp {
    public expressApp   : express.Express ;
    public path         : string ;
    private subApps     : Record<string, IApplication> = {} ;
    private globalClientScript: (()=>Promise<string>) | null;

    constructor( 
        expressApp: express.Express, 
        applicationTopLevelPath: string,
        options:{
            globalClientScript?: ()=>Promise<string>,
        } ) {
                this.path = applicationTopLevelPath ;
                this.expressApp = expressApp ; 
                setupStack(this.expressApp, this.path);
                this.globalClientScript = (options && options.globalClientScript) 
                    ? options.globalClientScript
                    : null ;
        }  

    public addSubApp(route: string, subApp: IApplication) {
        this.subApps[route] = subApp;
    }

    public async appServerData(route: string) {
        let commonScript = "";
        if(this.globalClientScript) {
            commonScript = await this.globalClientScript();
        }

        const globalServerData = {
            commonScript,
            title: "NeuronFac",
            route,
            message: "Welcome to NeuronFac"
        };
        if(this.subApps[route]) {
            const subAppServerData = await this.subApps[route].appData();
            return {...globalServerData, ...subAppServerData};
        }
        return globalServerData;
    };
}
