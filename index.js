const express = require('express');
const app = express();
const request = require('request'); 
const bodyParser = require('body-parser');

const config = require('./config')(process.env.NODE_ENV);
const appPort = process.env.PORT || config.port;


/***************************************
 * App Use
 */

app.use('/', express.static('./src'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

process.on('SIGINT', function() {
    console.log('SIGINT');
    process._exiting = true;
    process.exit();
});

/***************************************
 * Functions
 */

function getEvents(eventName, response){
    eventName = eventName.toLowerCase();

    request('https://www.eventbriteapi.com/v3/events/search/?q=' + eventName + '&token=TOT2UEOZ2ZSLW5LM37FN', function(err, res, body){

        let eventsTemp = JSON.parse(res.body).events;
        let events = [];

        for(var i = 0; i < eventsTemp.length; i++){
            events[i] = {
                id: i,
                name: eventsTemp[i].name.text,
                desc: eventsTemp[i].description.text,
                eventid: eventsTemp[i].id,
                url: eventsTemp[i].url
            }
        }

        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.send(JSON.stringify({ events }));
        response.end();

        if(err){
            console.error(err.message);
        }
    });

}

/***************************************
 * App other stuff
 */

app.post('/getEvents', function(req, res){
    let eventNameRequest = req.body.eventName;
    getEvents(eventNameRequest, res);
});



// authentication stuff can go below this
// eventbrite api key: OEVF3VMLIJ2LAQ5DRZ
// https://www.eventbriteapi.com/v3/users/me/?token=TOT2UEOZ2ZSLW5LM37FN

app.listen(appPort, function(){
    console.log('safetravels running on port: ' + appPort);
});