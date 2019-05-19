const request = require("request");

module.exports.run = async (bot,message,args) =>{
    message.channel.startTyping();
    
  //use this commented code if you want to generate an invite on console 

  try {
    let link = await bot.generateInvite(["ADMINISTRATOR"]);
    console.log(link);
    //message.channel.send(link); // or send it on the chat, 
  } catch (e) { console.log(e.stack);}

    message.channel.stopTyping();
  };
  
    
    module.exports.help = {
        name: "invite",
    }