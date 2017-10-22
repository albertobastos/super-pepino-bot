'use strict';

const ruleProcessor = require('./ruleProcessor');

if(require.main === module) { // invoked from command line
    let inputs = {
        '¿Alguien conoce el camino?': true,
        'Para pasar el rato está bien.': true,
        '¡No eran 13 apóstoles, eran 12!': true,
        'Me comería un pepino ahora mismo.': false,
        'No le pones suficiente ahínco.': true,
        'Me conformo con sacar un 5.': true,
        'Me afeito cada domingo.': false,
        'Podemos estar hasta el infinito': true,
        '¿Iréis a la fiesta?': true,
        '¿Y si digo 15?': false,
        '¿Y si digo 39145?': true,
        '¿Y si digo 39115?': false,
        '¿Y si digo 8?': true,
        '¿Y si digo 12345678?': true,
        '¿Y qué pasa con TAB?': true
    };

    Object.keys(inputs).forEach(input => {
        let response = ruleProcessor.findResponse(input);
        if((inputs[input] && response) || (!inputs[input] && !response)) {
            console.log('[OK]\t', input, '==>', response);
        } else {
            console.error('[NOOK]\t', input, '==>', response);
        }
    });
}