

module.exports.run = async (bot,message,args) =>{

    const pingMessage = await message.channel.send("🏓 Ping?");
    pingMessage.edit(`🏓 Pong! Latency is ${pingMessage.createdTimestamp - message.createdTimestamp}ms.`);
  };
      
    module.exports.help = {
        name: "ping",
    }