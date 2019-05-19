const api = "https://catfact.ninja/fact";
const snekfetch = require("snekfetch");

module.exports.run = async (bot,message,args) =>{
    message.channel.startTyping();
    snekfetch.get(api).then(r =>{
            let body = r.body;
     

            message.channel.stopTyping();

            message.channel.send(`🐱 **Did you know?** ${body.fact}`);
    
           
        })
      
    
}
    
    module.exports.help = {
        name: "catfact",
    }