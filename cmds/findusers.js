module.exports.run = async (bot,message,args) =>{

    let users = bot.users;

    let searchTerm = args[0];
    if(!searchTerm) return message.chanel.send("No search term provided");

    let matches = users.filter(u =>u.tag.toLowerCase().includes(searchTerm.toLowerCase()));

    if(!matches){
        return   message.channel.send("No users found.");
    }else{
        message.channel.send(matches.map(u => u.tag).join(", "));
    }
}

module.exports.help = {
    name: "findusers",
}