const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  console.log("commands");
     message.channel.send(`= .commands = no prefix commands
• morning         :: 


• .help           :: to display commands
• .bot            :: to display commands
        `,
         { code: "asciidoc" });

  return;
};

module.exports.help = {
  name: "commands"
};
