'use strict';

const ruleProcessor = require('./ruleProcessor');
const handler = require('./handler');
const bot = require('./bot');
const rulesTests = require('./rules').tests;

if(require.main === module) { // invoked from command line
    testRules();
    testHandler();
}

function testRules() {
    console.log('Rules:\n');
    Object.keys(rulesTests).forEach(input => {
        let response = ruleProcessor.findResponse(input);
        if((rulesTests[input] && response) || (!rulesTests[input] && !response)) {
            console.log('[OK]\t', input, '==>', response);
        } else {
            console.error('[NOOK]\t', input, '==>', response);
        }
    });
    console.log();
}

function testHandler() {
    let event = {
        body: JSON.stringify({
            message: {
                text: '5', // we don't mind if it matches
                chat: {
                    id: 1
                },
                messageId: 1
            }
        })
    };
    let callback = (err, result) => {
        if(err) { console.log('[NOOK]\t', err)}
        else    { console.log('[OK]\t', result); }
    };
    bot.sendReply = function(chatId, messageId, text) {
        return Promise.resolve('dummy_response');
    }

    console.log('Handler:\n');
    handler.message(event, null, callback); // context is not used
    console.log();
}