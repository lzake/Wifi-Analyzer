const express = require('express');
const router = express.Router();
const execa = require('execa');

router.get('/kill', function (req, res, next) {
    return new Promise(function (resolve, reject) {
        execa.shell(`airmon-ng check kill`, { maxBuffer: 1500 * 1500 }).then(result => {
            console.log(result.stdout);
            resolve(res.json(result.stdout));
        })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    })
});

module.exports = router;


