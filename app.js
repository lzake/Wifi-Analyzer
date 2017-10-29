const port = process.env.PORT || 8080;
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const fs = require('fs');
const CsvReadableStream = require('csv-reader');
const csv = require("fast-csv");
const cors = require('cors');
const index = require('./routes/index');
const checkkill = require('./routes/checkkill');
const startwlan = require('./routes/startwlan');
const airodwlan1 = require('./routes/airodwlan1');
const checkInterface = require('./routes/checkInterface');
const app = express();
const router = express.Router();
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./frontend/html/'));
app.use('/', router);
app.use('/checkkill', checkkill);
app.use('/startwlan', startwlan);
app.use('/airodwlan1', airodwlan1)
app.use('/checkinterface', checkInterface);

router.get('/', function (req, res) {
})

router.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-Width');
    next();
})

setInterval(function () {
    var csvData = {};
    var date = new Date();
    if (date.getSeconds() === 0) {
       csv
        .fromPath("/home/pi/Desktop/scanData/-01.csv")
        .on("data", function(data){
            console.log(data);
        })
        .on("end", function(){
            console.log("done");
        });
    }
}, 1000);


app.listen(port);
module.exports = app;
