'use strict';

const ruleProcessor = require('./ruleProcessor');
const bot = require('./bot');
const config = require('./config');

/*
  Just a basic ping to acknowledge if system is alive.
*/
module.exports.ping = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'pong!'
    }),
  };

  callback(null, response);
};

/*
  Receives a Telegram Bot message incoming event and, if the message contents
  matches any rule, sends a response to the author.
*/
module.exports.message = (event, context, callback) => {
  try {
    let body = JSON.parse(event.body || {});
    let message = body.message || {};

    let responseMsg = ruleProcessor.findResponse(message.text);
    if(responseMsg) {
      let prob = Math.random();
      if(prob <= config.ratio) {
        console.log('preparing reply', 'ratio', config.ratio, prob, 'chatId', message.chat.id, 'messageId', message.message_id, 'response', responseMsg);
        bot.sendReply(message.chat.id, message.message_id, responseMsg).then(
          result => { callback(null, { statusCode: 200 }); },
          err => {
            console.log(err);
            callback(err, { statusCode: 500 });
          }
        );
      } else {
        console.log('match found, but response discarted', 'ratio', config.ratio, prob, 'chatId', message.chat.id, 'messageId', message.message_id, 'response', responseMsg);
        callback(null, { statusCode: 200 });
      }
    } else {
      callback(null, { statusCode: 200 });
    }
  } catch(err) {
    console.log(err);
    callback(err, { statusCode: 500 });
  }
}