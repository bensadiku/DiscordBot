const Discord = require("discord.js");

module.exports.run = async (bot,message,args) =>{
    let embed = new Discord.RichEmbed()
    .setAuthor("Bot commands")
    .setColor("#00008B")
    .addField(".help","for the prefix based commands") 
    .addField(".commands","for the text based commands") 
    message.channel.send({embed:embed});

    return;
}

module.exports.help = {
    name: "bot"
}