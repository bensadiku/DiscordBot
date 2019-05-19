const request = require("request");

module.exports.run = async (bot,message,args) =>{
    message.channel.startTyping();
    request({ uri: "https://dog.ceo/api/breeds/image/random", json: true }, (error, response, body) => {
      if (error) throw new Error(error);
      message.channel.stopTyping();
      const exampleEmbed = {
        color: 0x0099ff,
        title: args.join(" "),
        image: {
          url: body.message,
        },
      }
      message.channel.send({ embed: exampleEmbed });
  });
      
}
    
    module.exports.help = {
        name: "dog",
    }