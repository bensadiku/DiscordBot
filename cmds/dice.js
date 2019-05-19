module.exports.run = async (bot, message, args) => {
  var myArray = ["1", "2", "3", "4", "5", "6"];
  var rand = myArray[(Math.random() * myArray.length) | 0];
  if (args.length === 0) {
    if (rand == 6) {
      message.channel.send(
        `🎲 The dice landed on ${rand} Yay`
      );
    } else if (rand == 1) {
      message.channel.send(
        `🎲 The dice landed on ${rand} oh no`
      );
    } else {
      message.channel.send(`🎲 The dice landed on ${rand}`);
    }
  } else {
    message.channel.send(`🎲 The dice landed on ${rand}`);
  }
};
module.exports.help = {
  name: "dice"
};
