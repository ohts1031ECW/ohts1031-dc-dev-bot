import { Attachment, Client, codeBlock, Message } from "discord.js";
import { CustomArgsType, TextCommandBase } from "../types/types";
import tesseract, { RecognizeResult, Worker } from "tesseract.js"

export const TextCommand: TextCommandBase = {
    type: "attachments",
    name: "OCR",
    execute: async (client: Client, message: Message, CustomArgs: CustomArgsType, args) => {

        const FileURL: string[] = []
        message.attachments.forEach((attachment: Attachment) => {
            FileURL.push(attachment.url)
        });
        if(FileURL.length === 0) return;
        //jpn eng
        const worker:Worker = await tesseract.createWorker("eng");
        const data:RecognizeResult = await worker.recognize(FileURL[0]);
        const text:string = data.data.text;
        //console.log(text);
        message.reply(codeBlock(text));
        await worker.terminate();
    }
}