import { Client, Collection, Events, GuildMember, Message, MessageFlags, codeBlock } from "discord.js";
import { ConfigType, CustomArgsType, EventBase, TextCommandBase, } from "../types/types";


export const Event: EventBase = {
    name: "MessageCreate",
    Event: Events.MessageCreate,
    once: false,


    execute: async (message: Message, CustomArgs: CustomArgsType) => {

        const client: Client = CustomArgs.client;
        const Textcommand:Collection<string,any> = CustomArgs.TextCommands;
        const config: ConfigType = CustomArgs.config;

        //TODO: Commands/Text/にテキストコマンドファイルを作成しコマンドファイル読み込み
        //TODO: Isolated-vmを使用したもの
        if (message.author.bot) return;

        console.log(message)
        //OCR channel
        const OCRchannelID:string = "1337288318550806549";
        if(message.channelId === OCRchannelID) {
            Textcommand.get("OCR").execute(client,message,CustomArgs);
        }

        // prefix command
        if (message.content.indexOf(config.prefix) !== 0) return;
        const args: string[] = message.content.slice(config.prefix.length).trim().split(/ +|\n/g);
        const commandName:string = args.shift()!;
        const command = Textcommand.get(commandName)
        //console.log("commandName: ",commandName);
        //console.log("command: ",command);

        if(command !== undefined && command.type === undefined){
            command.execute(client,message,CustomArgs,...args);
        }


    }
}
