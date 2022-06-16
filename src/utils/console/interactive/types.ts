import { resolve } from "path";


export interface Console {
    promptUser:()=>Promise<void>; 
}

export class ConsoleInteractive implements Console {

    private prompt: string;  
    private readline: {
        question: (prompt: string, cb: Function) => Promise<void>;
        close: ()=>Promise<void>; 
        on: (eventName: string, cb:(()=>void)) => void; 
    };  

    constructor (prompt = '> ') {
        this.prompt = prompt; 
        this.readline = require('readline').createInterface({
            input: process.stdin, 
            output: process.stdout
        }); 

        this.readline.on('close', function(){
            console.log('Exiting interactive'); 
        }); 
    }

    process(cmd: string): Promise<void>{
        if(cmd === ":x" || cmd === "quit") return this.readline.close(); 
        console.log(`[Sorry, I don't understand '${cmd}']`); 
        return this.promptUser();
    }

    promptUser():Promise<void>{
        return new Promise( (resolve, reject) =>{
            this.readline.question(this.prompt, (answer: string)=>{
                return resolve(this.process(answer)); 
            });
        })
    }
}; 