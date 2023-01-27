/*******************************************************************************

*******************************************************************************/
import express from "express" ;

export type AppData = Record<string, unknown>;

export type ExecuteOptions = Record<string, unknown>;
export type StartOptions = Record<string, unknown>;
export type UpdateOptions = {};
export type ApplicationRoute = string;

export interface IApplication {
    readonly name: string;
    readonly route: ApplicationRoute;

    execute?: (command: string, options: ExecuteOptions)=>Promise<void>;
    start?: (options: StartOptions)=>Promise<void>;
    update?:(options: UpdateOptions)=>Promise<void>;
    data(route?:string): Promise<AppData>;
}


export interface MultiAppUpdateOptions extends UpdateOptions {
    subApplications: 'all' | 'none' | ApplicationRoute[];
}


export interface IApplicationContainer extends IApplication{
    readonly subApplications: Record<string, IApplication>;
    addSubApplication: (subApp: IApplication) => void;
    update: (options: MultiAppUpdateOptions | UpdateOptions)=>Promise<void>;
}



export type AppServerData = AppData 

export interface INeuronFacApp {
    expressApp  : express.Express ;
    path        : string ;
    appServerData(route: string): Promise<AppServerData> ; 
}

export type PageHandler = {
    expressRouter: express.Router ;
} ;