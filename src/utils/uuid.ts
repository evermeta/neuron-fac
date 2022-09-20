import { v4 as uuidv4 } from "uuid";

export const getUUID = (): string => uuidv4();

export class ObjectWithUUID {
    public readonly ID: string;
    constructor() {
        this.ID = getUUID();
    }
}
