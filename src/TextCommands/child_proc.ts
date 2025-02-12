import { AttachmentBuilder, codeBlock, Message, Utils } from "discord.js";
import { CustomArgsType, TextCommandBase } from "../types/types";
import { exec, execFile } from "child_process";
import iconv from "iconv-lite";

export const TextCommand: TextCommandBase = {
    name: "exec",
    execute: async (client, message: Message, CustomArgs: CustomArgsType, args) => {
        if (message.author.id !== "869163863654953073" && message.author.id !== "869165795572338698") return;

        const execInputRegExp = message.content.match(/```[\s\S]*?```/g)![0];

        const execInput = execInputRegExp.replace(/```(bash)?\n?/g, "");

        let shell = "cmd.exe"
        switch(message.content.split(/ |\n/)[1]){
            case "cmd":
                shell = "cmd.exe";
                break;

            case "powershell":
                shell = "powershell.exe"
                break;

            default:
                shell = "cmd.exe";
                break;
        }


        exec(execInput, { encoding: 'buffer' ,'shell':shell}, async (err: any, stdout: Buffer, stderr: Buffer) => {
            if (err) {
                const EncodedError:string = iconv.decode(stderr as Buffer, "Shift_JIS")
                message.reply(`エラー:${codeBlock(EncodedError)}`)
                return;
            }

            const EncodedOut:string = iconv.decode(stdout as Buffer, "Shift_JIS");
            console.log("result: ",EncodedOut);
            if(EncodedOut.length <=2000){
                message.reply(`出力:${codeBlock(EncodedOut)}`);
            } else {
                const attachment = new AttachmentBuilder(stdout as Buffer,{name: "message.txt"});
                message.reply({content: "出力:(長すぎたためファイルになりました)",files: [attachment]});
            }
            
            //console.log(`stderr: ${iconv.decode(stderr as Buffer, "Shift_JIS")}`);
        });
    }
}