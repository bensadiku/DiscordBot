const Discord = require("discord.js");

module.exports.run = async (bot,message,args) =>{
    console.log("userinfo");
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("#00008B")
    .setDescription("User info")
    .addField("Full Username",`${message.author.username}#${message.author.discriminator}`)
    .addField("ID",message.author.id)
    .addField("Created At",message.author.createdAt);
    message.channel.send({embed:embed});

    return;
}

module.exports.help = {
    name: "userinfo",

}