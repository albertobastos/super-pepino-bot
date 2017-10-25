'use strict';

const fs = require('fs');
const path = require('path');
const config = require('./config');

const FILES = ['config.js', 'rules.js'];

if(require.main === module) { // invoked from command line
    if(process.argv[2] === '--backup') {
        doBackup();
    } else if(process.argv[2] === '--restore') {
        doRestore();
    } else {
        console.error('Unknown option', process.argv[2]);
    }
}

function doBackup() {
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

function doRestore() {
    for(let FILE of FILES) {
        let sourcePath = path.resolve(config.localBackupPath, FILE);
        try {
            fs.createReadStream(sourcePath).pipe(fs.createWriteStream(FILE));
            console.log('[OK]\t', sourcePath, '==>', FILE);
        } catch(err) {
            console.error('[NOOK]\t', sourcePath, '==>', FILE);
            console.error(err);
        }
    }    
}