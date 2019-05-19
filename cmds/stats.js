const { version } = require("discord.js");
const moment = require("moment");
const os = require("os");
require("moment-duration-format");

module.exports.run = async (bot, message, args) => {
  const duration = moment
    .duration(bot.uptime)
    .format(" D [days], H [hrs], m [mins], s [secs]");
  message.channel.send(
    `= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${bot.users.size.toLocaleString()}
• Servers    :: ${bot.guilds.size.toLocaleString()}
• Channels   :: ${bot.channels.size.toLocaleString()}
• Host OS    :: ${os.type()} ${os.release()} (${os.arch()})
• Discord.js :: v${version}
• Node       :: ${process.version}`,
    { code: "asciidoc" }
  ); 
};

module.exports.help = {
  name: "stats"
};
