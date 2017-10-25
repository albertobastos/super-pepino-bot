'use strict';

const mock = require('mock-require');

if(require.main === module) { // invoked from command line
    testRules();
    testHandler();
}

function testRules() {
    const inputs = require('./rules').tests;
    const ruleProcessor = require('./ruleProcessor');

    console.log('Rules:\n');
    Object.keys(inputs).forEach(input => {
        let response = ruleProcessor.findResponse(input);
        if((inputs[input] && response) || (!inputs[input] && !response)) {
            console.log('[OK]\t', input, '==>', response);
        } else {
            console.error('[NOOK]\t', input, '==>', response);
        }
    });
    console.log();
}

function testHandler() {
    let botWasCalled = false;

    mock('./config', {
        ratio: 1
    });
    mock('./bot', {
        sendReply: () => { botWasCalled = true; return Promise.resolve('dummy_response'); }
    });
    const handler = require('./handler');
    
    let event = {
        body: JSON.stringify({
            message: {
                text: '5', // one that matches
                chat: {
                    id: 1
                },
                messageId: 1
            }
        })
    };
    let callback = (err, result) => {
        if(err)                 console.log('[NOOK]\t', err);
        else if(!botWasCalled)  console.log('[NOOK]\t', 'Bot was not called');
        else                    console.log('[OK]\t', result);
        mock.stopAll();
    };

    console.log('Handler:\n');
    handler.message(event, null, callback); // context is not used
}