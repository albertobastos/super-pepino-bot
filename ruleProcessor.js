"use strict";

const rules = require('./rules').rules;

module.exports.findResponse = findResponse;

/**
 * Given a message input, searches for a rule matching any text on it and returns one of the configured responses.
 */
function findResponse(input) {
    if(!input) return;

    for(let rule of rules) {
        for(let matcher of rule.matchers) {
            let match = matcher().exec(input);
            if(match) { // match found...
                let matchedWord = match[0].trim();
                if(!isExclusion(rule, matchedWord)) { // ... and the matched word isn't excluded, we have a winner!
                    let responseTpl = rule.responses.pickRandom();
                    return fillResponse(responseTpl, matchedWord);
                }
            }
        }
    }

    return null; // no match found
}

// Determines if the word in included within the rule's exclusions
function isExclusion(rule, word) {
    let exclusions = rule.exclusions || [];
    return exclusions.findIndex(excl => excl.toUpperCase() === word.toUpperCase()) >= 0;
}

// Fills the response template with the allowed placeholders based on the input
function fillResponse(tpl, word) {
    return tpl
            .replaceAll('\\{\\{W\\}\\}', word.capitalize())
            .replaceAll('\\{\\{WQ\\}\\}', `¿${word.capitalize()}?`)
            .replaceAll('\\{\\{w\\}\\}', word.toLowerCase())
            .replaceAll('\\{\\{wq\\}\\}', `¿${word.toLowerCase()}?`);
}


// Some polyfills, can't believe JS doesn't include them natively yet!

Array.prototype.pickRandom = function() {
    var target = this;
    return target[Math.floor(Math.random() * target.length)];
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.capitalize = function() {
    var target = this;
    return target && target.charAt(0).toUpperCase() + target.slice(1);
}