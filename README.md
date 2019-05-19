# DiscordBot
Generic Discord bot that is able to reply to some commands, fetch gifs, images and some stats.
Detailed readme on how to setup the bot locally and host it.

## Setting up the bot locally.

Prerequisites: Node JS, Discord account + Server, Giphy dev account(for the token).

1. Clone the repo ```git clone https://github.com/bensadiku/DiscordBot.git```  and navigate to it.```cd DiscordBot```
2. Install Node JS. [Tutorial]( https://www.guru99.com/download-install-node-js.html)
3. Create a discord account or login to your existing one, create a server if you don't have one, then go to the [ developers portal](https://discordapp.com/developers/applications/ "Discord Developer Portal")
    1. ```New Application```
    2. Give it a name
    3. ```Create```
    4. Go to ```Bot```, ```Add Bot```, ```Yes Do it```
    5. ```Copy``` the token and add it to the botsettings.json file
4. Create a Giphy account and get a token, add it to the botsettings.json file giphyToken
5. Install nodemon globally ```npm install -g nodemon```
6. Install the required Node_Modules ```npm install``` Note: This may take a while if it's the first time installing these dependencies
7. Run the ```start.bat``` file.
8. In the console you should see the link to invite the bot in your server, copy that, open it in browser and join your server with it.


If you added the bot  and giphy token properly, bot should be online in your server. Do ```.ping``` to check if it's online

If you want to host the bot online you can host it on [HEROKU](https://dashboard.heroku.com/ "Heroku Dashboard") for free. I've included the ```PROCFILE``` which is used by heroku to setup the worker which will launch your bot.
# Setting up Heroku 
* Push the repository you just cloned earlier on  your Github account
* Create account on Heroku [if you don't have one](https://signup.heroku.com/ "Sign up Heroku") else [Login](https://id.heroku.com/login "Login Heroku")
* Once logged in, in the dashboard tap ```new``` then ```create new app```
* Give it a name a pick a region
* Pick a Deployment method(Github), authorize your Github account, pick the bot repository you just pushed and tap ```Connect```.
* Setup a CI on your master branch(or others if you know what you're doing).(Optional, you can tick the *Wait for CI to pass before deloying*. You don't need it to work but it's a good practice)
* Tap ```Enable Automatic Deploys```.
  *  It should say something like this *Automatic deploys from master are enabled*
* After that, tap the ```Deploy Branch``` button. By deault it will pick Master branch and it will pull in the dependencies.
  * You should see something like *Your app was successfully deployed.*
* Restart the heroku browser tab and navigate to ```Resources```, then disable *web  npm start* and enable *worker node bot.js*.

Your bot should successully be hosted on Heroku, shut down any local instances running.

If you start the bot locally and keep the heroku instance running, there will be two bots runnning. So for testing purposes you can disable the heroku instance (the worker you just enabled) and run it locally only until you finish the new feature.

Alternatively you can create separate heroku apps, one for production which CI deployes from the master branch and one for the new features/testing that observes a different branch or just create two different discord bots, use one for testing and the other for production.

MIT License

Copyright (c) 2019 Ben Sadiku

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.