/**
 * Each rule includes the following attributes:
 * - Matchers: one or many RegExp-builder functions to match a string suffix or exact word. Use the helper methods suffix(str) and exact(str) to create those.
 * - Responses: one or many possible responses the bot will send when that rule matches. You can use the following placeholders within each response:
 *      {{WQ}}  The matched input, capitalized and between question marks.      input ==> ¿Input?
 *      {{wq}}  The matched input, in lower case and between question marks.    input ==> ¿input?
 *      {{W}}   The matched input, capitalized.                                 input ==> Input
 *      {{w}}   The matched input, in lower case.                               input ==> input
 * - Exclusions (optional): exact words that should be excluded from this rule's matches. They will be checked in a case-insensitive way.
 */
module.exports = [
    {
        matchers:   [ suffix('ino') ],
        responses:  [ '{{WQ}} ¡Agárrame el pepino!' ],
        exclusions: [ 'pepino' ]
    },
    {
        matchers:   [ suffix('(i|í)nco'), exact('5') ],
        responses:  [ 'Qué fácil... ¡por el culo te la hinco!' ]
    },
    /*
    {
        matchers:   [ ... ],
        responses:  [ ... ],
        exclusions: [ ... ]
    },
    */
];

// Creates a RegExp that matches words ending with -suffix
function suffix(suffix) {
    return new RegExp(`([\\wáéíóúñ])+${suffix}(?!\\w)`, 'i');
}

// Creates a RegExp that matches the exact word str
function exact(str) {
    return new RegExp(`(^|\\s)${str}(?!\\w)`, 'i');
}