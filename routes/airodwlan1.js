// const express = require('express');
// const execa = require('execa');
// const exec = require('exec');
// const fs = require('fs');
// const CsvReadableStream = require('csv-reader');
// const getStream = require('get-stream');
// const router = express.Router();

// router.get('/airodumpStart', function (req, res, next) {
//     const options = {
//         maxBuffer: 90000000,
//         timeout: 6000,
//         killSignal: 'SIGQUIT',
//     }

//     return new Promise(function (resolve, reject) {
//         execa.shellSync(`airodump-ng -w /home/pi/Desktop/scanData/ wlan1mon`, options)
//             .then(result => {
//                 console.log(result.stdout);
//                 resolve(res.json(result.stdout));
//             })
//         .catch(error => {
//             console.log(error);
//         });
//     })
//         .then(value => {
//             var inputStream = fs.createReadStream('/home/pi/Desktop/scanData/-01.csv', 'utf8');
//             inputStream
//                 .pipe(CsvReader({ parseNumbers: true, parseBooleans: true, trim: true }))
//                 .on('data', function (row) {
//                     console.log('A row arrived: ', row);
//                 })
//                 .on('end', function (data) {
//                     console.log('No more rows!');
//                 });
//         })
//         .catch(error => {
//             console.log(error);
//         });
// });


// module.exports = router;

const Promise = require('bluebird');
const express = require('express');
const execa = require('execa');
const CsvReadableStream = require('csv-reader');
const getStream = require('get-stream');
const router = module.exports = express.Router();

router.get('/airodumpStart', function (req, res, next) {
  // Do some scanning!
  scanWifi({timeout: 4000})
    .then(data => res.status(200).send(JSON.stringify(data)))
    .catch(err => res.status(500).send(JSON.stringify(err)))
});

// Tip: move this kind of method to a seperate file
// - will make it easier to test via the command line (e.g. tools like ava, tape, mocha)
function scanWifi({timeout = 5000}) {
  const childProcess = execa.shellSync(`airodump-ng -w /home/pi/Desktop/scanData/ wlan1mon`, {
    maxBuffer: 10 * 1024 * 1024
  })
    
  return Promise
    .resolve(childProcess)
    .delay(timeout)
    .then(p => getStream(p.stdout))
    .tap(() => childProcess.kill('SIGKILL'))
    .delay(500)
    .then(raw => {
      console.warn('RAW DATA', raw)
      return {results: raw, error: false}
    })
    .catch(err => {
      // combine stderr & stdout for use outside scanWifi method
      return Promise.all([err, getStream(childProcess.stderr), getStream(childProcess.stdout)])
      .then(([error, outputError, results]) => {
        return {error, outputError, results} // The re-shaped data we might need
      })
    })
}