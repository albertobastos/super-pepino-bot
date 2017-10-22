'use strict';

const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');

module.exports.sendReply = sendReply;

function sendReply(chatId, messageId, text) {
    let bot = new TelegramBot(config.token, {polling: false});
    return bot.sendMessage(
        chatId,
        text,
        { reply_to_message_id: messageId }
    ); // returns a promise!
}