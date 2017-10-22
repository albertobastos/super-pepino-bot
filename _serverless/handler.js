'use strict';

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
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'TODO',
      input: event,
    }),
  };

  callback(null, response);
}