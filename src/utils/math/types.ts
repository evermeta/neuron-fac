export class Probability {

    public value: number; 

    constructor(value: number){
        if(value > 1 || value < 0) throw "bad value for probability"
        this.value = value; 
    }

} 

export class Percentage{

    public value: number; 

    constructor(value: number){
        if(value > 100 || value < 0) throw "bad value for percentage"
        this.value = value; 
    }
}