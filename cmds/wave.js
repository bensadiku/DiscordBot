let target;
let title;

module.exports.run = async (bot, message, args) => {
  message.channel.startTyping();
  target = message.mentions.users.first();

  if (!args.length) {
    if (!target) {
      target = message.author;
      title =  target.username +" waves";
    }
  } else {
    if (!target) {
      target = message.author;
      title = `${target.username} waves ${args.join(" ")}`;
    }else{
      title = `${message.author.username} waves ${target.username} `;
    }
  }
  lookupGif(args, message);
  message.channel.stopTyping();
};
var lookupGif = async function(args, message) {
  message.channel.startTyping();
  var query = "wave";
  giphy
    .search("gifs", { q: `${query}` })
    .then(async response => {
      var totalResponses = response.data.length;

      var responseIndex = Math.floor(
        (Math.random() * (totalResponses - 1 + 1)) << 0
      );
      var responseFinal = response.data[responseIndex];

      let msg = await message.channel.send({
        embed: {
          color: 16777215,

          title: `${title}`,

          image: {
            url: responseFinal.images.fixed_height.url
          },
          footer: {
            text: `rating: ${responseFinal.rating}`
          }
        }
      });
      msg.react("👍").then(() => msg.react("👎"));

      const filter = (reaction, user) => {
        return (
          ["👍", "👎"].includes(reaction.emoji.name) &&
          user.id === message.author.id
        );
      };

      msg
        .awaitReactions(filter, {
          max: 1,
          time: 10000,
          errors: ["time"]
        })
        .then(collected => {
          const reaction = collected.first();

          if (reaction.emoji.name === "👎") {
            msg.delete();
            message.channel.stopTyping();
            lookupGif(args, message);
          } else {
            msg.clearReactions();
            message.channel.stopTyping();
          }
        })
        .catch(collected => {
          msg.clearReactions();
          message.channel.stopTyping();
         
        });
    })
    .catch(e => {
      message.channel.stopTyping();
    
    });
  message.channel.stopTyping();
};

module.exports.help = {
  name: "wave"
};
