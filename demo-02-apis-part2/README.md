# Twitter Bot Tutorial

> Demo results at: https://twitter.com/HowtoSpeakBird 
> This bot tweets a bird sound in a randomly selected language, every day at 8:00am. Source: [Wikipedia](https://en.wikipedia.org/wiki/Cross-linguistic_onomatopoeias#Wild_birds)

Deploying a twitter bot involves a couple components. Unlike the demo from last week, which involved just pulling information via an API, we’ll be interacting with the platform itself with the Twitter API. 

You’ll need:

1. An account with Twitter. This will be the account your bot will communicate to with the Twitter API.

1. The script that is your bot. You can use any standard programming language to code your bot — in python, javascript, etc. In our case, we will be using `node.js` and use javascript to write our Twitter bot. (Javascript is usually used as a front-end client-side browser-based programming language, but `node.js` allows us to use it like a server-side language, as a runtime environment.)

1. We then need a server to which we can deploy this code. We can run the bot on our computer, but in order to make it a "bot," we’ll want it to run on its own somewhere — we need to deploy this on a host that can run the server-side code. (Github pages is only capable of hosting static files, and can’t run any of the repository code on its servers.) So here, we’ll be using `heroku`.

This content below is adapted from the following tutorials on [Medium](https://medium.com/@mattpopovich/how-to-build-and-deploy-a-simple-twitter-bot-super-fast-with-node-js-and-heroku-7b322dbb5dd3) and [Hackernoon](https://hackernoon.com/create-a-simple-twitter-bot-with-node-js-5b14eb006c08#.flysreo60).


## Prerequisites

We’ll be using the Terminal to set things ups and run them.
For a primer on the Terminal, or command-lining, check out [Code Lab Session 02](https://github.com/RISD-Code-Lab/cl-spring2020/tree/master/session-02). We’re assuming:

- You have `homebrew` installed, a package manager for macOS. If you don’t have it already, you can [get it here](https://brew.sh/): open up your Terminal and paste in `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`.

- You have `git` installed on your computer. If you do not have `git`, and have homebrew installed, you can install it via `brew install git`.

## 1. Create a Twitter account for your bot
*Twitter site*

- Sign up for an twitter account and set up a developer account to create a [Twitter App](https://developer.twitter.com/en/apps). If this is your first app, you’ll need to go through the [application processs](https://developer.twitter.com/en/apply-for-access) to accesss to the Twitter API. 
- Once your application is approved:
	- Take note of your API Keys. You will need them later.
	- Go to the **Keys and Tokens** of your App, and generate your **Access Token & Secret** under "Authentication Tokens"
	- Make sure you have "Read and Write" enabled in your **App permissions**.


## 2. Setup NodeJS
*Terminal*

- To check if you have node already installed on your computer, just type in `node -v` into your Terminal to see if it returns a version number. If you get a `command not found` error, you need to install node. You can [download it here](https://nodejs.org/en/). 


## 3. Get setup with Heroku
*Heroku Site* -> *Terminal*
- [Sign up for an account](https://signup.heroku.com/) 
- Install the Heroku CLI on your computer.
	- Follow the [Heroku instructions](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) to install Heroku
	- When the install is complete, enter `heroku login` on your Terminal to authenticate your Heroku account on your machine.

## 4. Setup your Bot
*Terminal*
- Once you have node installed, you can type in the following command in Terminal, changing `our-twitterbot-name` to whatever you please.  Stick to all lowercase and hyphens for spaces.

```bash
mkdir our-twitterbot-name
cd our-twitterbot-name
git init
npm init
```

Which in regular English translates to:

1. make a directory called `our-twitterbot-name`

1. change the current directory (go to) this new folder, `our-twitterbot-name`

1. initialize `git` (which we’ll be using to push our code to our remote servers on heroku)

1. initialize a `node` app
	- This will prompt you with the app basics, i.e. `package name` and the `(default value)`. You can just hit Enter to accept the default value given for each prompt. Continue until you get `Is this OK? (yes)` and Enter. This creates a `package.json` which manages our project files and dependecies.

You’ll then setup your Twitter bot files.

```bash
npm install twit --save
npm install node-twitterbot --save
touch bot-test.js
touch config.js
touch .gitignore 
echo 'bot-test.js' >> .gitignore
echo 'config.js' >> .gitignore
```

1. We installed two Node modules — `twit` and `node-twitterbot` — and saved them to our `package.json` file. These are `node.js`-specific plugins that will help us use the Twitter API as part of a nodeJS app.

1. We made a script file — `bot-test.js` — that will serve as the core file controlling our bot.

1. We made a config file — `config.js` — that will house the settings (API keys) to use for our bot. 

1. We made a `.gitignore` file to ignore the abovet two files. We will set git to ignore the two files above, since we do not want to push this file remotely (more on this later.)

```
our-twitterbot-name
|- bot.js
|- config.js
|- .gitignore
|- package.json
```

## 5. Try a quick tweet
*Text Editor*

- Using your text editor, open up `config.js`.
- Setup your Twitter configuration, replacing the `xxx` with your information, and Save.

`config.js`
```
module.exports = {
  consumer_key: 'xxxxxxxxxxxx',  
  consumer_secret: 'xxxxxxxxxxxx',
  access_token: 'xxxxxxxxxxxx',  
  access_token_secret: 'xxxxxxxxxxxx'
}
```

- Open `bot-test.js`
- This is the file where you will actually be determining the bot’s behavior.
- Let’s start just by doing a test tweet.

Add this in `bot-test.js`
```js
let Twit = require('twit');
var config = require('./config.js');  //use config file
let TwitterBot = require('node-twitterbot').TwitterBot;

let Bot = new TwitterBot(config);

Bot.tweet("Test Tweet!");
```

### 6. Test it
*Terminal*

To test your `bot-test` code, go back to your Terminal to run it.
Make sure your Terminal is at your bot folder, and type `node bot-test.js`. 
Check your bot’s twitter feed. It should say whatever you specified in "Test Tweet!"


### 7. Write your Bot code
*Text Editor*

Now that we know our bot file is working, we can expand on our code to program our bot’s behavior.

- For our demo example, we will randomly "tweeting" in different languages
- We will be tweeting a random item in a static array (extracted from [wikipedia](https://en.wikipedia.org/wiki/Cross-linguistic_onomatopoeias#Bird_sounds),) but this list could also potentially be dynamically pulled via another API.

In `bot-test.js`:

```js
let Twit = require('twit');
let config = require('./config.js'); 
let TwitterBot = require('node-twitterbot').TwitterBot;

let Bot = new TwitterBot(config);

let phraseArray = [ 
	["Afrikaans","twiet twiet"],
	["Albanian","ciu-ciu"],
	["Arabic","سِقسِق"],
	["Armenian","ճիւ ճիւ"],
	["Basque","txio-txio"],
	["Bengali","kichir michir"],
	["Bosnian","čip čip"],
	["Bulgarian","чик-чирик"],
	["Catalan","piu-piu"],
	["Chinese","叽叽喳喳"],
	["Croatian","čip čip"],
	["Czech","píp píp"],
	["Danish","pip pip"],
	["Dutch","twiet twiet"],
	["English","chirp chirp"],
	["Estonian","tsirr tsirr"],
	["Finnish","tsirp tsirp"],
	["French","piou piou"],
	["German","piep piep"],
	["Greek","τσίου τσίου"],
	["Hebrew","צְוִיץ־צְוִיץ ]"],
	["Hindi","cheh cheh"],
	["Hungarian","csip-csirip"],
	["Icelandic","bíbí"],
	["Indonesian","cit-cit"],
	["Italian","pio pio"],
	["Japanese","ピヨ ピヨ"],
	["Kazakh","шыр-шыр"],
	["Korean","짹짹"],
	["Latvian","čiu čiu"],
	["Lithuanian","čik čirik"],
	["Macedonian","чурулик чурулик"],
	["Malay","cip cip"],
	["Malayalam","കൂ കൂ"],
	["Marathi","छिव-छिव"],
	["Persian","چه‌چه "],
	["Polish","ćwir ćwir"],
	["Portuguese","piu piu"],
	["Romanian","cip cirip"],
	["Russian","чирик-чирик"],
	["Serbian","ћију-ћију"],
	["Sinhalese","කුමු-කුමු"],
	["Slovak","píp píp"],
	["Slovene","čiv čiv"],
	["Spanish","pío pío"],
	["Swedish","kvitter kvitter"],
	["Tagalog","twit twit"],
	["Tamil","koo koo"],
	["Thai","จิ๊บ"],
	["Turkish","cik cik"],
	["Ukrainian","тьох-тьох"],
	["Vietnamese","chíp chíp"]
];

function chooseRandom(array) {
	//gets random item from array list
  return array[Math.floor(Math.random() * array.length)];
}

let phrase = chooseRandom(phraseArray)[1]; //second array item contains the string we want.

Bot.tweet(phrase); //tweet it!
```

Save, and run it via the Terminal per step 6. above. You should see a random tweet on your Feed!

## 7. Deploy to Heroku
Now that we know our bot code is working when we run it from our Terminal, we want to figure out how to keep this code running as a bot (who wants to run commands in Terminal all day long?) There are several ways to do this, but we will be using `Heroku` for our demo.

```bash
heroku create our-twitterbot-name
```

Heroku has a way of managing environment variables such as API keys within its dashboard. So instead of using the `config.js` file, we will be using this feature and removing the config for our production file, which we’ll call `bot.js`. (This is why we set up `git` to ignore these files earlier.) This will look exactly the same as our `bot-test.js` file, except for how our API keys are incorporated:

Replace 
```js
let Twit = require('twit');
let config = require('./config.js'); 
let TwitterBot = require('node-twitterbot').TwitterBot;

let Bot = new TwitterBot(config);

let phraseArray = [ 
.
.
.
```
with

```js
let Twit = require('twit');
let TwitterBot = require('node-twitterbot').TwitterBot;

let Bot = new TwitterBot({
 consumer_key: process.env.BOT_API_KEY,
 consumer_secret: process.env.BOT_API_SECRET,
 access_token: process.env.BOT_ACCESS_TOKEN,
 access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

let phraseArray = [
.
.
.
```

We can now add these files to our Heroku app via `git`.

```bash
git add .
git commit -m "Your commit message"
git push heroku master
```

- Log into your [Heroku dashboard](https://dashboard.heroku.com/apps) online and navigate to your app.
- Go to **Settings** of your app. Under **Config Vars** enter the following key-value pairs for `BOT_API_KEY`, `BOT_API_SECRET`,`BOT_ACCESS_TOKEN`, `BOT_ACCESS_TOKEN_SECRET`, with the values from your Twitter applicaiton.

## 8. Add a scheduler
*Terminal*->*Heroku Dashboard*

Finally, we can setup the frequency at which we want the bot to tweet via a Heroku scheduler.

On your Terminal, enter `heroku addons:create scheduler:standard`

Navigate back to the Dashboard in your browser.
- Now, under **Installed add-ons** of your App dashboard, click on "Heroku Scheduler". Click on "Create a job."
- Under "Schedule", select your desired interval.
- Under "Run Command" type in `node bot.js`.
- Click on "Save Job".

You’re all set! Your bot should now be tweeting away.

## Documentation

For further info on what you can do with the Twitter API, go to the 
[Twit](https://github.com/ttezel/twit/) and [Node Twitter Bot](https://github.com/nkirby/node-twitterbot/wiki/TwitterBot) documentation. 

See also: a nice tutorial + implementation with Google Spreadsheets by [Allison Parish](http://air.decontextualize.com/twitterbot/)


