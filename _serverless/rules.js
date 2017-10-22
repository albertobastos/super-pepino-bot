module.exports = [
    {
        matchers:   [ suffix('ino') ],
        responses:  [ '{{WQ}} ¡Agárrame el pepino!' ],
        exclusions: [ 'pepino' ]
    },
    {
        matchers:   [ suffix('ote') ],
        responses:  [ 'Para {{w}} mi cipote.', '{{WQ}} ¡Pues toma mi cipote!' ],
        exclusions: [ 'cipote' ]
    },    
    {
        matchers:   [ suffix('abo') ],
        responses:  [ '{{WQ}} ¡Leche de mi nabo!', 'Para {{w}} lo que me sale del nabo.' ],
        exclusions: [ 'nabo' ]
    },
    {
        matchers:   [ suffix('ajo') ],
        responses:  [ '{{WQ}} ¡Cómeme el badajo!', '{{WQ}} ¡Agárrame lo de abajo!' ],
        exclusions: [ 'badajo' ]
    },
    {
        matchers:   [ suffix('ulo') ],
        responses:  [ 'Para {{w}} mi pirulo.' ],
        exclusions: [ 'pirulo', 'culo' ]
    },
    {
        matchers:   [ suffix('(i|í)nco'), exact('5') ],
        responses:  [ 'Qué fácil... ¡por el culo te la hinco!' ]
    },
    {
        matchers:   [ suffix('ocho'), exact('8') ],
        responses:  [ 'Je, je... ¡Por el culo te la embrocho!' ]
    },    
    {
        matchers:   [ suffix('ujo') ],
        responses:  [ '{{WQ}} ¡Por el culo te la estrujo!' ],
        exclusions: [ 'estrujo' ]
    },    
    {
        matchers:   [ suffix('ano') ],
        responses:  [ '{{WQ}} ¡Me la agarras con la mano!', 'Para {{w}} el que te sacas del ano.' ],
        exclusions: [ 'mano', 'ano' ]
    },
    {
        matchers:   [ suffix('ena') ],
        responses:  [ 'Pues para {{w}}, mi polla rellena.' ],
        exclusions: [ 'rellena' ]
    },
    {
        matchers:   [ suffix('ato') ],
        responses:  [ '{{WQ}} ¡Agárrame el aparato!' ],
        exclusions: [ 'aparato' ]
    },    
    {
        matchers:   [ suffix('u(c|k)a') ],
        responses:  [ '{{WQ}} ¡Pollas con peluca!' ],
        exclusions: [ 'peluca', 'pelucas' ]
    },
    {
        matchers:   [ exact('13') ],
        responses:  [ '¿Trece? ¡Pos agárramela y verás cómo me crece!' ]
    },    
    {
        matchers:   [ suffix('e(c|s)e') ],
        responses:  [ '{{WQ}} ¡Tócamela y verás cómo me crece!' ],
        exclusions: [ 'ese' ]
    },
    {
        matchers:   [ suffix('ucio') ],
        responses:  [ '{{WQ}} ¡Castígame el prepucio!' ],
        exclusions: [ 'prepucio' ]
    },
    {
        matchers:   [ suffix('ones') ],
        responses:  [ '¡{{W}} mis cojones!' ],
        exclusions: [ 'cojones' ]
    },
    {
        matchers:   [ suffix('o(ll|y)a') ],
        responses:  [ '{{WQ}} Jeje, te va la marcha... ¡pos toma mi polla!' ],
        exclusions: [ 'polla', 'poya' ]
    },
    {
        matchers:   [ suffix('illa') ],
        responses:  [ '{{WQ}} ¡Acaríciame el frenillo!' ],
        exclusions: [ 'frenillo' ]
    },
    {
        matchers:   [ suffix('elo') ],
        responses:  [ '{{W}}, {{w}}... ¿te gusta mi ciruelo?' ],
        exclusions: [ 'ciruelo' ]
    },
    {
        matchers:   [ suffix('ete') ],
        responses:  [ '{{WQ}} ¡Mi tronco pa\' tu ojete!' ],
        exclusions: [ 'ojete' ]
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