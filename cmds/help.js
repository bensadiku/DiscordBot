const Discord = require("discord.js");

module.exports.run = async (bot,message,args) =>{
    console.log("help");
    message.channel.send(`= .help = {} optional, [] obligatory
• .ud             :: urban dictionary
• .rud            :: random ud
• .cat            :: fetch cat pics
• .dog            :: fetch dog pics
• .ping           :: ping the bot
• .dice           :: roll the dice
• .icon           :: fetch server icon
• .stats          :: fetch stats
• .catfact        :: fetch cat facts
• .wave {@u}      :: wave someone
• .img [text]     :: image search
• .gif [text]     :: search gifs
• .unmute [@u]    :: unmute user
• .avatar {@u}    :: fetch avatar
• .mute [@u]{t}   :: mute user
• .userinfo {@u}  :: fetch user info

• .commands       :: to display commands
• .bot            :: to display commands
        `,
         { code: "asciidoc" });

    return;
}

module.exports.help = {
    name: "help",

}