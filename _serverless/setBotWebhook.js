const config = require('./config');
const TelegramBot = require('node-telegram-bot-api');

let bot = new TelegramBot(config.token, {polling: false}); // no pooling, uses webhook

bot.setWebHook(config.webhook);

console.log('Webhook set to', config.webhook);