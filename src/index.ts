import { Client, Collection, GatewayIntentBits, IntentsBitField, Message, Partials, StartThreadOptions } from "discord.js";
import fs from "node:fs"
import { ConfigType, CustomArgsType, EventBase, TextCommandBase } from "./types/types";
import path from "path";
import dotenv from "dotenv";

dotenv.config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions
    ],


    partials: [
        Partials.User,
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
        Partials.GuildMember,
        Partials.ThreadMember
    ]
});

//config load
const ConfigFile: ConfigType = JSON.parse(fs.readFileSync(`${process.cwd()}/config.json`, "utf-8"));//read file and parse json


//カスタム変数
const CustomArgs: CustomArgsType = {
    config: ConfigFile,
    client: client,
    interactions: {
        SlashCommands: new Collection()
    },
    TextCommands: new Collection()
}



//Commands.interaction.set(module.name,module.execute(Commands,client))
//console.log(__dirname)

console.log("TextCommands Loading")
//テキストコマンドファイル読み込み
const TextCommandFolder: string = path.join(__dirname, "TextCommands");
const TextCommandFiles: string[] = fs.readdirSync(TextCommandFolder).filter(file => file.endsWith("js") || file.endsWith("ts"));

//collection初期化
//CustomArgs.TextCommands.clear()
//ファイルごと
for (const file of TextCommandFiles) {

    //ファイル読み込み
    import(`${TextCommandFolder}/${file}`).then((rawmodule) => {
        const TextCommand: TextCommandBase = rawmodule.TextCommand;
        console.log(`${TextCommand.name} was loaded`)
        CustomArgs.TextCommands.set(TextCommand.name, TextCommand)
    })
}


console.log("Event Loading")
//Events フォルダ内ファイル読み込み
const EventFileFolder: string = path.join(__dirname, "Events");
const EventFiles: string[] = fs.readdirSync(EventFileFolder).filter(file => file.endsWith("js") || file.endsWith("ts"));
//ファイルごとの処理
for (const File of EventFiles) {
    const FilePath: string = `${EventFileFolder}/${File}`
    //ファイル読み込み
    import(FilePath).then((rawmodule) => {
        const EventModule: EventBase = rawmodule.Event;
        console.log(`${EventModule.name} was loaded`);

        if (EventModule.once) {
            //once event 
            client.once(EventModule.Event, (...args) => EventModule.execute(...args, CustomArgs));
        } else {
            //console.log("on event")
            client.on(EventModule.Event, (...args) => EventModule.execute(...args, CustomArgs));
        }
    })
}

console.log("devmode: ", process.argv[2] === "dev")
const token = process.argv[2] === "dev" ? process.env.devtoken : process.env.token;
client.login(token)