module.exports.run = async (bot, message, args) => {
  message.channel.startTyping();

  if (!args.length) {
    message.channel.send("No arguments supplied! Do: `.gif [text]`");
  } else {
    lookupGif(args, message);
  }

  message.channel.stopTyping();
};
var lookupGif = async function(args, message) {
  message.channel.startTyping();

  var query = args.join(" ");
  giphy
    .search("gifs", { q: `${query}` })
    .then(async response => {
      var totalResponses = response.data.length;
      var responseIndex = Math.floor(Math.random() * 20 + 1) & totalResponses;
      var responseFinal = response.data[responseIndex];

      let msg = await message.channel.send({
        embed: {
          color: 16777215,

          title: query,

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

          //if the user downvoted, delete the message and fetch a gif again by doing a recursive call on the method
          if (reaction.emoji.name === "👎") {
            msg.delete();
            message.channel.stopTyping();
            lookupGif(args, message);
          } else {
            message.channel.stopTyping();
            msg.clearReactions();
          }
        })
        .catch(collected => {
          msg.clearReactions() 

          message.channel.stopTyping();
          
        });
    })
    .catch(() => {
      message.channel.stopTyping();
    });
  message.channel.stopTyping();
};

module.exports.help = {
  name: "gif"
};
