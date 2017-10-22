module.exports = [
    {
        matchers: [suffix('ino')],
        responses: ['¡Agárrame el pepino!'],
        exclusions: ['pepino']
    },
    {
        matchers: [suffix('ato')],
        responses: ['¡Agárrame el aparato!'],
        exclusions: ['aparato']
    },
    {
        matchers: [exact('13')],
        responses: ['¿Trese? ¡Pos agárramela y verás cómo me crese?']
    }
];

// Creates a RegExp that matches words ending with -suffix
function suffix(suffix) {
    return new RegExp(`([\\wáéíóúàèìòùñ])+${suffix}(?!\\w)`, 'i');
}

// Creates a RegExp that matches the exact word str
function exact(str) {
    new RegExp(`(^|\\s)${str}(?!\\w)`, 'i');
}