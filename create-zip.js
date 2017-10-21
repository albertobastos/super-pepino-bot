const ZIP_ENTRIES = ['config.js', 'config.local.js', 'expressions.js', 'index.js', 'node_modules'];
let OUTPUT_DIR = __dirname + '/dist/';
let OUTPUT_FILENAME = OUTPUT_DIR + 'SuperPepinoBot.zip';

let fs = require('fs');
let archiver = require('archiver');
let shell = require('shelljs');

shell.mkdir('-p', OUTPUT_DIR);
let output = fs.createWriteStream(OUTPUT_FILENAME);
let archive = archiver('zip', {
    zlib: { level: 9 }
});

output.on('close', () => {
    console.log('Packing process finished.');
    console.log('File:', output.path);
    console.log('Bytes: ', archive.pointer());
});

output.on('end', function() {
    console.log('Data has been drained');
});
   
archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
        console.warn(err);
    } else {
        throw err;
    }
});
   
archive.on('error', function(err) {
    throw err;
});    

archive.pipe(output);

ZIP_ENTRIES.forEach(entry => {
    let entryStat = fs.lstatSync(entry);
    if(entryStat.isDirectory()) {
        console.log('adding folder', entry, '...');
        archive.directory(entry, entry);
    } else if(entryStat.isFile()) {
        console.log('adding file', entry, '...');
        archive.file(entry, { name: entry });
    } else {
        console.warn('skipping entry', entry);
    }
});

archive.finalize();