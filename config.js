let localConfig;
try {
    localConfig = require('./config.local');
} catch(err) {
    localConfig = {};
}

module.exports = localConfig;