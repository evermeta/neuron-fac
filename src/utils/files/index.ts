/******************************************************************************/
import { readCSVFromFile } from "./csv";
import { readJSONObjectFromFile, writeJSONObjectFromFile } from "./JSON";

/******************************************************************************/
export const readCSV    = readCSVFromFile;
export const readJSON   = readJSONObjectFromFile; 
export const writeJSON  = writeJSONObjectFromFile; 