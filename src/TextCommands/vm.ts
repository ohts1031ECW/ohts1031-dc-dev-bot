import { codeBlock, Message } from "discord.js";
import { TextCommandBase } from "../types/types";
import ivm from "isolated-vm";

export const TextCommand:TextCommandBase = {
    name: "vm",
    execute: async(client,message:Message,args)=>{
        const isolatedvm = new ivm.Isolate({memoryLimit: 256});
        const context = isolatedvm.createContextSync();
        const jail = context.global;

        

        const codeInputRegExp = message.content.match(/(?<=^|\n)\s*(`{3}\s*(js|ts)\s*[\s\S]*?`{3}\s*)/g)![0];
        const code = codeInputRegExp.replace(/```(js|ts)?\n?/g, "");
        //console.log("code: ",code);

        let arrayout:string[] = [];
        jail.setSync('log', function(...args:string[]):void {
            arrayout.push(...args);
        });

        
        const runscript = isolatedvm.compileScriptSync(code);
        runscript.run(context).then(result=>{

            let fulloutput = ""
            for(const out of arrayout){
                fulloutput+= `${out}\n`
            }

            //console.log(fulloutput)
            message.reply(
                `出力:`+
                codeBlock(fulloutput)
            )
        }).catch(error=>{
            message.reply(
                "エラー出力:"+
                codeBlock(error)
            )
        })
    }
}