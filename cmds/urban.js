const Discord = require("discord.js");
const urban = require("urban");


module.exports.run = async (bot,message,args) =>{
    message.channel.startTyping();

    if(args.length <1) return message.channel.send("Please enter something .ud [text]")

    let str = args.join(" ");

    urban(str).first(json => {
       if(!json) return message.channel.send("Nothing found!");

        let embed = new Discord.RichEmbed()
 
        .setColor("#00008B")
        .addField(`Urban Dictionary: ${json.word} `,"_ _") 
        .addField("Definition",json.definition || "None") 
        .addField("Example",json.example) 
        .addField("_ _",`👍  ${json.thumbs_up}`,true) 
        .addField("_ _",`👎  ${json.thumbs_down}`,true) 
        .setFooter(`Written by ${json.author}`);
        message.channel.send({embed:embed});
    });
    message.channel.stopTyping();
    return;
}

module.exports.help = {
    name: "ud"
}