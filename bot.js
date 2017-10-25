'use strict';

const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');

module.exports = {
    sendReply: sendReply,
    //sendReplySync: sendReplySync
}

function sendReply({chatId, messageId, text}) {
    let bot = new TelegramBot(config.token, {polling: false});
    return bot.sendMessage(
        chatId,
        text,
        { reply_to_message_id: messageId }
    ); // returns a promise!
}

// doesn't work on Node 6.10 :-(
/*
async function sendReplySync(data) {
    return await sendReply(data);
}
*/