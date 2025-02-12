import { TextCommandBase } from "../types/types";

export const TextCommand:TextCommandBase = {
    name: "ping",
    execute: async(client,message,args)=>{
        message.reply(
            `WebSocket Ping: ${client.ws.ping}` +
            `\nEndPoint ping: ${message.createdTimestamp - Date.now()}`
        )
    }
}