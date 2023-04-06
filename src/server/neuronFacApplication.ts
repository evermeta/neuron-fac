import express from "express";
import path from "path";
import { ApplicationContainer } from "./class-application-container";
import { IApplication, INeuronFacApp } from "./types";

const setupStack = (expressApp: express.Express, applicationTopLevelPath: string) => {
    expressApp.use(express.json());
    expressApp.use(express.urlencoded({ extended: true }));
    expressApp.set("views", path.join(applicationTopLevelPath, "views"));
    expressApp.set("view engine", "hbs");
    expressApp.use(express.static(path.join(applicationTopLevelPath, "public")));
 };
      
export class NeuronFacApp extends ApplicationContainer implements INeuronFacApp{

    public expressApp: express.Express ;
    public path: string ;
    public port = 3000 ;

    private subApps: Record<string, IApplication> = {} ;

    private executableApps : Record<string, (command: string, options: Record<string, unknown>)=>Promise<void>> = {} ;
    private globalClientScript: (()=>Promise<string>) | null;

    constructor( 
        expressApp: express.Express, 
        applicationTopLevelPath: string,
        options:{
            port: number,
            globalClientScript?: ()=>Promise<string>,
        } ) {
             
           super("NeuronFac", ""); 
           this.path = applicationTopLevelPath ;
           this.expressApp = expressApp ; 
           setupStack(this.expressApp, this.path);
           this.globalClientScript = (options && options.globalClientScript) 
                    ? options.globalClientScript
                    : null ;
        }  

    public async start() {
        this.expressApp.listen(this.port, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${this.port}`);
        });
    }

    public addSubApps(route: string, subApp: IApplication) {
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
            const subAppServerData = await this.subApps[route].data();
            return {...globalServerData, ...subAppServerData};
        }
        return globalServerData;
    }
}
