const fs = require('fs');

setInterval(() => {
    fs.unlink('./asdfgsfs.js', (err) => {
        if(err) {
            console.error(err);
        }
    });
}, 1000);