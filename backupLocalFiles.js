'use strict';

const fs = require('fs');
const path = require('path');
const config = require('./config');

const FILES = ['config.js', 'rules.js'];

if(require.main === module) { // invoked from command line
    let targetPath = path.resolve(config.localBackupPath)
    for(let FILE of FILES) {
        let targetPath = path.resolve(config.localBackupPath, FILE);
        try {
            fs.createReadStream(FILE).pipe(fs.createWriteStream(targetPath));
            console.log('[OK]\t', FILE, '==>', targetPath);
        } catch(err) {
            console.error('[NOOK]\t', FILE, '==>', targetPath);
            console.error(err);
        }
    }
}