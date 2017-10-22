'use strict';

const ruleProcessor = require('./ruleProcessor');
const bot = require('./bot');

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
    let responseMsg = ruleProcessor.findResponse(event.message.text);
    if(responseMsg) {
      bot.sendReply(event.message.chat.id, event.message.message_id, responseMsg).then(
        result => { callback(null, { statusCode: 200 }); },
        err => {
          console.log(err);
          callback(err, { statusCode: 500 });
        }
      );
    } else {
      callback(null, { statusCode: 200 });
    }
  } catch(err) {
    console.log(err);
    callback(err, { statusCode: 500 });
  }
}