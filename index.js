const { Composer } = require('micro-bot');
const fetchHackedRecommendation = require('./lib/fetchHackedRecommendation');
const { isValidDate } = require('./lib/filterData');
const formatMessage = require('./lib/formatMessage');

// fetch , filter and format recommendations
const getRecommendationMessage = async () => {
  const reccomendationData = await fetchHackedRecommendation();
  const filteredReccomendationArray = reccomendationData.filter(({ date }) => isValidDate(date));
  return formatMessage(filteredReccomendationArray);
};

// pattern match list of words on a particular phrase
const activationPhrasesMatch = activationWords => {
  const matchExp = new RegExp(`(${activationWords.join('|')})`);
  return matchExp;
};

// list of words to activate the bot on
const activationWords = ['crypto trade', 'trade reco', 'trade recos'];

// the bot
const bot = new Composer();

// start command
bot.command('/start', async ({ from, replyWithMarkdown, botInfo }) => {
  replyWithMarkdown(`Hi *${from.first_name || from.username}* !
  
Welcome, i am *${botInfo.first_name}*, a notification bot for Hacked.com.`);
});

// bot will react on certain words and reply back with trade recommendations
bot.hears(activationPhrasesMatch(activationWords), async ({ replyWithMarkdown }) => {
  const recommendationMessage = await getRecommendationMessage();
  return replyWithMarkdown(recommendationMessage);
});

module.exports = bot;
