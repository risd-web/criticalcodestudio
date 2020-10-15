// this is the production that I would deploy on Heroku
// API Keys / Access tokens are managed via the Heroku interface
// as environment variables

let Twit = require('twit');
let TwitterBot = require('node-twitterbot').TwitterBot;

let Bot = new TwitterBot({
 consumer_key: process.env.BOT_API_KEY,
 consumer_secret: process.env.BOT_API_SECRET,
 access_token: process.env.BOT_ACCESS_TOKEN,
 access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

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

let phrase = chooseRandom(phraseArray)[1]; //second array item contains string

Bot.tweet(phrase); //tweet it!
