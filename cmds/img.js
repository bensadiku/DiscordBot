var cheerio = require("cheerio");
var request = require("request");

module.exports.run = async (bot, message, args) => {

  if(!args.length){
    return message.channel.send("No arguments found");
  }
  var search = args.join(" ");

  var options = {
    url: "http://results.dogpile.com/serp?qc=images&q="+search,
    method: "GET",
    headers: {
      Accept: "text/html",
      "User-Agent": "Chrome"
    }
  };

  request(options, function(error, response, responseBody) {
    if (error) {
      // handle error
      return;
    }

    /* Extract image URLs from responseBody using cheerio */

    $ = cheerio.load(responseBody); // load responseBody into cheerio (jQuery)

    // In this search engine they use ".image a.link" as their css selector for image links
    var links = $(".image a.link");

    // We want to fetch the URLs not the DOM nodes, we do this with jQuery's .attr() function
    // this line might be hard to understand but it goes thru all the links (DOM) and stores each url in an array called urls
    var urls = new Array(links.length)
      .fill(0)
      .map((v, i) => links.eq(i).attr("href"));
    if (!urls.length) {
      message.channel.send(`No ${search} images found`);
      return;
    }
    // Send result
   // message.channel.send(urls[Math.floor(Math.random() * 5) + 1]);
   const exampleEmbed = {
    color: 0x0099ff,
    title: args.join(" "),
    image: {
      url: urls[Math.floor(Math.random() * 5) + 1],
    },
  }
  message.channel.send({ embed: exampleEmbed });
  });
  
};

module.exports.help = {
  name: "img"
};
