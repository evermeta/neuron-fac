/*******************************************************************************

*******************************************************************************/
import express from "express" ;
import path from "path";

export type AppData = Record<string, unknown>;

export interface IApplication {
    name: string;
    update(): Promise<void>;
    appData(): Promise<AppData>;
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