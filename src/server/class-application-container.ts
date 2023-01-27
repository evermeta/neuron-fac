/******************************************************************************
 * Application Container
 * The Application Container class is a special type of Application that contains
 * other Applications. 
 * ****************************************************************************/

import { Application } from "./class-application";
import { AppData, ApplicationRoute, ExecuteOptions, IApplication, IApplicationContainer, MultiAppUpdateOptions, UpdateOptions } from "./types";
/******************************************************************************/

export class ApplicationContainer extends Application implements IApplicationContainer {

    public readonly subApplications: Record<string, IApplication>;
    public execute?: (command: string, options: ExecuteOptions)=>Promise<void>;

    constructor(name: string, route: ApplicationRoute) {
        super(name, route);
        this.subApplications = {};
    }

    public async update(updateOptions: MultiAppUpdateOptions | UpdateOptions = {
        subApplications: 'all'
    }): Promise<void> {
        await super.update(updateOptions);
        if('subApplications' in updateOptions){
            if(updateOptions.subApplications === 'all') {
                for(const subApp of Object.values(this.subApplications)) {
                    if(subApp.update) await subApp.update({});
                }
            } 
        }
    }  

    public addSubApplication(subApp: IApplication) {
        this.subApplications[subApp.name] = subApp;
    }

    public async data(route:string=""): Promise<AppData> {
        const appData: AppData = await super.data();
        if(this.subApplications[route]) {
            const subAppServerData = await this.subApplications[route].data();
            return {
                ...appData, 
                ...subAppServerData
            }
        }
        return appData;
    }
}