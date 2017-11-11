const express = require('express');
const app = express();

const config = require('./config')(process.env.NODE_ENV);
const appPort = process.env.PORT || config.port;

app.use('/', express.static('./src'));

// authentication stuff can go below this

app.listen(appPort, function(){
    console.log('safetravels running on port: ' + appPort);
});