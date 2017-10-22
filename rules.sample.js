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