import { IApplication, ApplicationRoute, UpdateOptions, AppData } from "./types";

/******************************************************************************
 * An Application is a collection of Neurons that can be used to create a
 * web application.
 ******************************************************************************/

export class Application implements IApplication {
    
    public readonly name: string; 
    public readonly route: ApplicationRoute; 

    constructor(name: string, route: ApplicationRoute){
        this.name = name; 
        this.route = route; 
    }

    public async update(options: UpdateOptions = {}): Promise<void> {
        return;
    } 

    public async data(): Promise<AppData> {
        return {
            name: this.name, 
            route: this.route
        };
    }
}