'use strict';

const ruleProcessor = require('./ruleProcessor');

if(require.main === module) { // invoked from command line
    let inputs = [
        '¿Alguien conoce el camino?',
        'Para pasar el rato está bien.',
        '¡No eran 13 apóstoles, eran 12!',
        'Me comería un pepino ahora mismo.',
        'No le pones suficiente ahínco.',
        'Me conformo con sacar un 5.'
    ];

    inputs.forEach(input => console.log(input, '==>', ruleProcessor.findResponse(input)));
}