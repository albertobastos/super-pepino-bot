'use strict';

const mock = require('mock-require');

if(require.main === module) { // invoked from command line
    testRules();
    testRatio100();
    testRatio25();
    testHandler();
}

function testRules() {
    mock.reRequire('./rules');
    mock.reRequire('./ruleProcessor');

    const inputs = require('./rules').tests;
    const ruleProcessor = require('./ruleProcessor');

    console.log('Rules:\n');
    let someError = false;
    Object.keys(inputs).forEach(input => {
        let response = ruleProcessor.findResponse(input, true); // ignore ratio!
        if((inputs[input] && response) || (!inputs[input] && !response)) {
            //console.log('[OK]\t', input, '==>', response);
        } else {
            console.error('[NOOK]\t', input, '==>', response);
            someError = true;
        }
    });
    !someError && console.log('[OK]\t', 'All test inputs behave as expected');
    console.log();

    mock.stopAll();
}

function testRatio100() {
    let str = 'abc';
    mock('./rules', {
        rules: [
            {
                matchers:   [ function() { return new RegExp(`(^|\\s)${str}(?!\\w)`, 'i') } ], // an exact word matcher
                responses:  [ 'test response' ],
                ratio:      1
            }    
        ]
    });
    mock.reRequire('./rules');
    mock.reRequire('./ruleProcessor');

    console.log('Ratio 100:\n');
        
    let findResponse = require('./ruleProcessor').findResponse;
    let responses = 10;
    [...Array(10).keys()].forEach(i => {
        if(findResponse(`test ${str} test`)) responses--;
    });

    if(responses > 0) {
        console.log('[NOOK]\t', responses, 'times without response');
    } else {
        console.log('[OK]\t', 'all times responded');
    }
    console.log();

    mock.stopAll();
}

function testRatio25() {
    let str = 'abc';
    mock('./rules', {
        rules: [
            {
                matchers:   [ function() { return new RegExp(`(^|\\s)${str}(?!\\w)`, 'i') } ], // an exact word matcher
                responses:  [ 'test response' ],
                ratio:      .25
            }    
        ]
    });
    mock.reRequire('./rules');
    mock.reRequire('./ruleProcessor');

    console.log('Ratio 100:\n');
        
    let findResponse = require('./ruleProcessor').findResponse;
    let responses = 0;
    [...Array(100).keys()].forEach(i => {
        if(findResponse(`test ${str} test`)) responses++;
    });

    if(responses < 20 || responses > 40) {
        console.log('[NOOK]\t', responses, 'times out of 100 responded, does not look like 25%');
    } else {
        console.log('[OK]\t', responses, 'times out of 100 responded');
    }
    console.log();

    mock.stopAll();
}

function testHandler() {
    let str = 'abc';
    mock('./config', {
        defaultRatio: 1
    });
    mock('./bot', {
        sendReply: () => { botWasCalled = true; return Promise.resolve('dummy_response'); }
    });
    mock('./rules', {
        rules: [
            {
                matchers:   [ function() { return new RegExp(`(^|\\s)${str}(?!\\w)`, 'i') } ], // an exact word matcher
                responses:  [ 'test response' ],
                ratio:      1
            }    
        ]
    });
    
    mock.reRequire('./rules');
    mock.reRequire('./config');
    mock.reRequire('./bot');
    mock.reRequire('./ruleProcessor');
    mock.reRequire('./handler');

    const handler = require('./handler');
    let botWasCalled = false;
        
    let event = {
        body: JSON.stringify({
            message: {
                text: `test ${str} test`, // one that matches
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