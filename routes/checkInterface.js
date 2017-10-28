const express = require('express');
const router = express.Router();
const execa = require('execa');

router.get('/check', function (req, res, next) {
    execa.shell(`airmon-ng`, {maxBuffer: 1500 * 1500}).then(result => {
        console.log(result.stdout);
        res.json(result.stdout);
    })
    .catch(error => {
        console.log(error);
    });
});

module.exports = router;


