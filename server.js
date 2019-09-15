const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'home.html'));
});

const port = process.env.PORT || 4000
app.listen(port, function () {
    console.log('Your node js server is running on port: ', port);
});