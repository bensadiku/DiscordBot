const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require("fs");

const AdminPrefix = botSettings.AdminPrefix;
const prefix = botSettings.prefix;
const giphyToken = botSettings.giphyToken;

var GphApiClient = require("giphy-js-sdk-core");
giphy = GphApiClient(giphyToken);

const bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();
bot.mutes = require("./mutes.json");

fs.readdir("./cmds/", (err, files) => {
  if (err) console.error(err);

  let jsFiles = files.filter(f => f.split(".").pop() === "js");
  if (jsFiles.length <= 0) {
    console.log("No CMD to load");
    return;
  }
  console.log(`Loading ${jsFiles.length} commands`);

  jsFiles.forEach((f, i) => {
    let props = require(`./cmds/${f}`);
    console.log(`${i + 1}: ${f} loaded`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`Bot ready ${bot.user.username}`);

  bot.user.setActivity("Learning");
  //console.log(bot.commands);

  try {
    let link = await bot.generateInvite(["ADMINISTRATOR"]);
    console.log(link);
} catch (e) { console.log(e.stack);}



  bot.setInterval(() => {
    for (let i in bot.mutes) {
      let time = bot.mutes[i].time;
      let guildId = bot.mutes[i].guild;
      let guild = bot.guilds.get(guildId);
      let member = guild.members.get(i);
      let mutedRole = guild.roles.find(r => r.name === "Muted");
      if (!mutedRole) continue;

      if (Date.now() > time) {
        member.removeRole(mutedRole);
        delete bot.mutes[i];

        fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
          if (err) throw err;
         
        });
      }
    }
  }, 5000);
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);

  if (command.startsWith(AdminPrefix)) {
    let cmd = bot.commands.get(command.slice(AdminPrefix.length));
    if (cmd) cmd.run(bot, message, args);
   
  } 

  /*
  Could use this else statement + switch to reply to generic messages that do no contain the Adminprefix
  Note switch statement is not efficient, could increate latency to the bot if there's a lot of messages to check
  */

 /* else {
    switch (message.content.toLocaleLowerCase()) {
     
      case "bot":
      message.channel.send("?");
      break;
   
    }
  }
*/
});



bot.login(botSettings.token);
