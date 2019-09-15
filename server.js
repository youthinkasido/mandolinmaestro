const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.listen(process.env.PORT || 4000, function () {
    console.log('Your node js server is running');
});