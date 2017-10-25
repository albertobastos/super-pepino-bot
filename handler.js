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
    let body = event && event.body;
    if(typeof body === 'string') { body = JSON.parse(body || '{}'); }
    let message = body.message || {};
    let responseMsg = ruleProcessor.findResponse(message.text);
    if(responseMsg) {
      let data = {
        chatId: message.chat.id,
        messageId: message.message_id,
        text: responseMsg
      };
      bot.sendReply(data).then(
        result => sendEmptySuccess(callback),
        err => sendError(callback, err, 500)
      );
    } else {
      sendEmptySuccess(callback);
    }
  } catch(err) {
    sendError(callback, err, 500);
    return;
  }

}

function sendEmptySuccess(callback) {
  callback(null, { statusCode: 200 });
}

function sendError(callback, err, statusCode) {
  callback(err, { statusCode: statusCode });
}