const Discord = require("discord.js");
const fs = module.require("fs");

module.exports.run = async (bot,message,args) =>{
     if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You do not have enough permissions");

      let toMute =message.guild.member( message.mentions.users.first())|| message.guild.members.get(args[0]);
      if(!toMute) return message.channel.sendMessage("No user or ID specified");

      if(toMute.id === message.author.id) return message.channel.sendMessage("You can't mute yourself ");
      if(toMute.highestRole.position>= message.member.highestRole.position) return message.channel.sendMessage("You don't have enough permissions");
      

      let role = message.guild.roles.find(r => r.name ==="Muted");
      if(!role){
        try {
          role = await message.guild.createRole({
            name: "Muted",
            color: "#000000",
            permissions: []
          });
  
          message.guild.channels.forEach(async(channel, id) => {
            await channel.overwritePermissions(role,{
              SEND_MESSAGES : false,
              ADD_REACTIONS:  false
            });
          });
  
         }catch(e){
           console.log(e.stack);
         }
      }
      
      if(toMute.roles.has(role.id)) return message.channel.sendMessage("This user is already muted!");

      bot.mutes[toMute.id] ={
        guild : message.guild.id,
        time : Date.now() + parseInt(args[1]) * 1000
      }

      await toMute.addRole(role);
    
      fs.writeFile("./mutes.json", JSON.stringify(bot.mutes,null,4),err =>{
        if(err) throw err;
        message.channel.send(`${toMute.user.tag} is now muted`);
      })
     
      return;

   
}

module.exports.help = {
    name: "mute",

}