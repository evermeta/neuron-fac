/*******************************************************************************

*******************************************************************************/
import express from "express" ;

export interface NeuronFacApp {
    expressApp  : express.Express ;
    path        : string ;
}

export type PageHandler = {
    expressRouter: express.Router ;
} ;