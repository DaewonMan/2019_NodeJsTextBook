const zlib = require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('./readme4.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./readme4.txt.gz');

readStream.pipe(zlibStream).pipe(writeStream);

/*=============Test====================== */

const rS = fs.createReadStream('./readme4.txt.gz', 'utf8');
const wS = fs.createWriteStream('./writeTestme.txt', 'utf8');
rS.pipe(zlibStream).pipe(wS);