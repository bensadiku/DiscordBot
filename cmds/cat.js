const snek = module.require("snekfetch");
const api = "http://aws.random.cat/meow";

module.exports.run = async (bot, message, args) => {
  message.channel.startTyping();

 let file = (await snek.get(api)).body.file; 
 if(!file) return message.channel.send("Failed, try again.");


const exampleEmbed = {
  color: 0x0099ff,
  title: args.join(" "),
  image: {
    url: file,
  },
}
message.channel.send({ embed: exampleEmbed });

  message.channel.stopTyping();
};

module.exports.help = {
  name: "cat"
};
