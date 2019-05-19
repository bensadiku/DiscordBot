const Discord = require("discord.js");
const urban = require("urban");


module.exports.run = async (bot,message,args) =>{
    console.log("random urban dictionary");

    urban.random().first(json => {
        let embed = new Discord.RichEmbed()
 
        .setColor("#00008B")
        .addField(`Random Urban Dictionary: ${json.word} `,"_ _") 
        .addField("Definition",json.definition || "None") 
        .addField("Example",json.example) 
        .addField("_ _",`👍  ${json.thumbs_up}`,true) 
        .addField("_ _",`👎  ${json.thumbs_down}`,true) 
        .setFooter(`Written by ${json.author}`);
        message.channel.send({embed:embed});
    });

    return;
}

module.exports.help = {
    name: "rud"
}