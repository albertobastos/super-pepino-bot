"use strict";

/**
 * AWS Lambda Function for Telegram Bot
 * It listens to all messages within the chat and, if
 * any of them matches one of the configured suffixes,
 * sends a reply with an adaptad message.
 */

const config = require('./config');
const TelegramBot = require('node-telegram-bot-api');
const expressions = require('./expressions');

let bot = new TelegramBot(config.token, {polling: false}); // no pooling, uses webhook

exports.handler = function(event, context, lambdaCallback) {
    let text = event.message.text;

    let response = expressions.findResponse(text);
    if(!response) {
        // you are safe... for now
        context.succeed({ statusCode: 200 });
        return;
    }

    bot.sendMessage(
        event.message.chat.id,
        response,
        { reply_to_message_id: event.message.message_id }
    ).then(
        result => { context.succeed({ statusCode: 200 }); },
        error => { context.fail(error); }
    );
}