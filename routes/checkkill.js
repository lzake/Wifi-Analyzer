const express = require('express');
const router = express.Router();
const execa = require('execa');

router.get('/kill', function (req, res, next) {
    var results = {};
    execa.shell('airmon-ng check kill').then(result => {
        console.log(result.stdout);
        results['info'] = result.stdout;
        res.json(result.stdout);
    })
        .catch(error => {
            console.log(error);
        });
});

module.exports = router;


