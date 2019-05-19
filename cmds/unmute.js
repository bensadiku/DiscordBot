const fs  = require("fs");

module.exports.run = async (bot,message,args) =>{
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have enough permissions");

      let toMute =message.mentions.members.first() || message.guild.members.get(args[0]);
      if(!toMute) return message.channel.send("No user or ID specified");

      if(toMute.id === message.author.id) return message.channel.sendMessage("You can't unmute yourself ");
      if(toMute.highestRole.position>= message.member.highestRole.position) return message.channel.sendMessage("You don't have enough permissions");

      let role = message.guild.roles.find(r => r.name ==="Muted");
 
      if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("This user is not muted!");

      await toMute.removeRole(role);

      
      delete bot.mutes[toMute.id];

      fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err =>{
        if(err) throw err;
        message.channel.send(`${toMute.user.tag} is now unmuted`);
      })
      
    }
    
    module.exports.help = {
        name: "unmute",
    
    }