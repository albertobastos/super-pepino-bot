let suffixes = require('./suffixes.local');

/*
    Given a suffix and a matched word, picks one response
    among all the possible choices and fills it, if necessary,
    with the matched word.
*/
function pickResponse(suffix, word) {
    let response = suffixes[suffix][Math.floor(Math.random() * suffixes[suffix].length)];
    return response
        .replaceAll('<MATCH>', word)
        .replaceAll('<MATCH_UPPER>', word.capitalize());
}

/*
    Creates a regex to match the suffix whether is followed
    by a blank space, comma, question mark, end of sentence, etc.
*/
function createRegex(suffix) {
    return new RegExp('(\\w)*' + suffix + '(?!\\w)', 'i');
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.capitalize = function() {
    var target = this;
    return target && target.charAt(0).toUpperCase() + target.slice(1);
}

/*
    Function that, given an input, returns the answer
    that the bot must send to the original message author.
*/
module.exports.findResponse = (input) => {
    if(!input) {
        return; // no input
    }

    for(suffix in suffixes) {
        let match = createRegex(suffix).exec(input);
        if(match) {
            let matchedWord = match[0].trim();
            return pickResponse(suffix, matchedWord);
        }
    }

    return null;
};

// some basic test if called from command-line
// > node expressions
if(require.main === module) {
    let inputs = [
        'vaya minino', 
        'un latino con barba',
        'camino',
        '¿Alguien a visto a Tino?'
    ];

    inputs.forEach(input => {
        let response = module.exports.findResponse(input);
        console.log(input, '==>', response);
    });

    console.log();
    console.log(Object.keys(suffixes).length, 'sufijos configurados');
}