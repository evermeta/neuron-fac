/*******************************************************************************

*******************************************************************************/
import express from "express" ;

export type AppData = Record<string, unknown> ;

export type ExecuteOptions = Record<string, unknown> ;
export type StartOptions = Record<string, unknown> ;
export type UpdateOptions = Record<string, unknown> ;
export type ApplicationRoute = string ; 

/*******************************************************************************
 * The IApplication interface is the base interface for all applications.
 * It is used to define the common methods and properties for all applications.
 * *******************************************************************************/
export interface IApplication {
    readonly name: string ;
    readonly route: ApplicationRoute ;

    exectute?: (command: string, options: ExecuteOptions) => Promise<void> ;
    start?: (options: StartOptions) => Promise<void> ;
    update?: (options: UpdateOptions) => Promise<void> ;
    data: (route?: string) => Promise<AppData> ;
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
    path: string ;
    port: number ;
    expressApp: express.Express;
    appServerData(route: string): Promise<AppServerData> ; 
}

export type PageHandler = {
    expressRouter: express.Router ;
} ;