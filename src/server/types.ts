/*******************************************************************************

*******************************************************************************/
import express from "express" ;
import path from "path";

export type AppData = Promise<Record<string, unknown>> ;
export interface IApplication {
    name: string;
    appData(): AppData;
}

export type AppServerData = AppData 
export interface INeuronFacApp {
    expressApp  : express.Express ;
    path        : string ;
    appServerData(route: string): AppServerData ; 
}

export class NeuronFacApp implements INeuronFacApp {
    public expressApp   : express.Express ;
    public path         : string ;
    private subApps     : Record<string, IApplication> = {} ;

    constructor( expressApp: express.Express, applicationTopLevelPath: string ) {
        this.path = applicationTopLevelPath ;
        this.expressApp = expressApp ; 
        this.expressApp.use(express.json());
        this.expressApp.use(express.urlencoded({ extended: true }));
        this.expressApp.set("views", path.join(this.path, "views"));
        this.expressApp.set("view engine", "hbs");
        this.expressApp.use(express.static(path.join(this.path, "public")));
    }  

    public addSubApp(route: string, subApp: IApplication) {
        this.subApps[route] = subApp;
    }

    public async appServerData(route: string) {
        const globalServerData = {
            commonScript: `const a = 1;`,
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

export type PageHandler = {
    expressRouter: express.Router ;
} ;