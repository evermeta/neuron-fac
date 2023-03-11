/*******************************************************************************

*******************************************************************************/
import express from "express" ;


export interface ExpressApp {
    expressApp  : express.Express;
    name        : string ;
}

export interface NeuronFacApp extends ExpressApp{
    path        : string ;
}

export type PageHandler = {
    expressRouter: express.Router ;
} ;