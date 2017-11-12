const express = require('express');
const app = express();
const request = require('request'); 
const bodyParser = require('body-parser');
const async = require('async');

const config = require('./config')(process.env.NODE_ENV);
const appPort = process.env.PORT || config.port;


/***************************************
 * App Use
 */

let source; // files to read
let backendMode = false; // enable backend files

if(backendMode === true){
    source = './backend-test';
    console.warn("BACKEND DEVELOPMENT IS ON")
}else{
    source = './src';
}

app.use('/', express.static(source));
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
        let x = 0;

        for(var j = 0; j < eventsTemp.length; j++){
            let i = j;
            let eT = eventsTemp[i];
            let lat;
            let long;
            let city;
            let region;
            let country;
            request('https://www.eventbriteapi.com/v3/venues/' + eT.venue_id + '/?token=TOT2UEOZ2ZSLW5LM37FN', function(err, res, body){
                let locationResponse = JSON.parse(body);

                if(locationResponse.address != null){
                    lat = locationResponse.latitude;
                    long = locationResponse.longitude;
                    city = locationResponse.address.city;
                    region = locationResponse.address.region;
                    country = locationResponse.address.country;

            
                    if(err){
                        console.error(err.message);
                    }
                    
                    events[i] = {
                        id: i,
                        name: eventsTemp[i].name.text,
                        desc: eventsTemp[i].description.text,
                        eventid: eventsTemp[i].id,
                        url: eventsTemp[i].url,
                        lat: lat,
                        long: long,
                        address: {
                            city: city,
                            region: region,
                            country: country
                        }
                    }

                    x++;

                    if(x === events.length){
                        response.setHeader('Content-Type', 'application/json');
                        response.setHeader('Access-Control-Allow-Origin', '*');
                        response.send(JSON.stringify({ events }));
                        response.end();
            
                        console.log('events sent');
                    }
                }else{
                    x++;
                }  
            });   
        }

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