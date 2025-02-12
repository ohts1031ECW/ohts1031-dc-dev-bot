import { Client, ClientVoiceManager, CollectedInteraction, Collection, Events } from "discord.js"
import { ConfigType } from "./modules/GetConfig"

interface EventBase {
    name: string,
    Event: string,
    once: boolean,
    execute: (...args) => void
}

interface TextCommandBase {
    type?: "attachments",
    name: string,
    execute: (...args) => void
}

interface ConfigType {
    "serverStatus": {
        "GuildID": string,
        "BOT": string,
        "User": string,
        "All": string
    },
    "prefix": string
}

interface CustomArgsType {
    config: ConfigType
    client: Client,
    interactions: {
        SlashCommands: Collection<string, any>
    },
    TextCommands: Collection<string, any>
}



export {
    CustomArgsType,
    ConfigType,
    EventBase,
    TextCommandBase
}