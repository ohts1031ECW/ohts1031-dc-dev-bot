import { Client, codeBlock, Message } from "discord.js";
import { CustomArgsType, TextCommandBase } from "../types/types";

export const TextCommand:TextCommandBase = {
    name: "twdata",
    execute: async(client:Client,message:Message,CustomArgs:CustomArgsType,args)=>{
        const URL:string = message.content.split(" ")[1];
        message.reply(codeBlock(URL.toString()))
    }
}