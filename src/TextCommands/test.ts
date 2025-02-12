import { CustomArgsType, TextCommandBase } from "../types/types";

export const TextCommand:TextCommandBase = {
    name: "test",
    execute: async(client,message,CustomArgs:CustomArgsType,args)=>{
        message.reply("test");
        console.log(CustomArgs.TextCommands)
    }
}