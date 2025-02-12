import { Events, GuildMember} from "discord.js";
import { ConfigType, CustomArgsType, EventBase } from "../types/types";

export const Event:EventBase = {
    name: "memberadd",
    Event: Events.GuildMemberAdd,
    once:false,
    execute: async(member:GuildMember,CustomArgs:CustomArgsType)=>{
        

        console.log("Member Added")

        const config:ConfigType = CustomArgs.config
        //configのguildidにあるidなら
        if(member.guild.id === config.serverStatus.GuildID){

            const Members:any = await member.guild.members.fetch();

            let BotCount:number = 0;
            let All:number = 0;
            for(const Member of Members){
                All++;
                if(Member[1].user.bot){
                    BotCount++;
                }
            }


            //総数カウントチャンネル名称変更
            const All_count_channel = member.guild.channels.cache.get(config.serverStatus.All);
            All_count_channel?.setName(`AllCount: ${All}`);

            //BOT数カウントチャンネル名称変更
            const BOT_count_channel = member.guild.channels.cache.get(config.serverStatus.BOT);
            BOT_count_channel?.setName(`BOTCount: ${BotCount}`);

            //人数カウントチャンネル名称変更
            const User_count_channel = member.guild.channels.cache.get(config.serverStatus.User);
            User_count_channel?.setName(`Usercount: ${All-BotCount}`);
        }
    }
}