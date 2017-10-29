const express = require('express');
const execa = require('execa');
const fs = require('fs');
const CsvReadableStream = require('csv-reader');
const getStream = require('get-stream');
const router = express.Router();

router.get('/airodumpStart', function (req, res, next) {
    const options = {
        timeout: 6000,
        maxBuffer: 90000000,
        killSignal: 'SIGKILL'
    }

    return new Promise(function (resolve, reject) {
        execa.shell(`airodump-ng -w /home/pi/Desktop/scanData/ wlan1mon`, options)
            .then(result => {
                console.log(result.stdout);
                resolve(res.json(result.stdout));
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    })
        .then(value => {
            var inputStream = fs.createReadStream('/home/pi/Desktop/scanData/-01.csv', 'utf8');

            inputStream
                .pipe(CsvReader({ parseNumbers: true, parseBooleans: true, trim: true }))
                .on('data', function (row) {
                    console.log('A row arrived: ', row);
                })
                .on('end', function (data) {
                    console.log('No more rows!');
                });
        })
        .catch(error => {
            console.log(error);
        });
});

module.exports = router;
