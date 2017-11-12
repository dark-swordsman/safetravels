const express = require('express');
const app = express();
const request = require('request'); 
const bodyParser = require('body-parser');
const async = require('async');
const fs = require('fs');

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
    let x = 0;
    eventName = eventName.toLowerCase();

    const token = 'BWNZ64GURPVF7K5MWG3M';

    request('https://www.eventbriteapi.com/v3/events/search/?q=' + eventName + '&token=' + token, function(err, res, body){

        let eventsTemp = JSON.parse(res.body).events;
        let events = [];

        let eventCap;

        if(eventsTemp.length <= 20){
            eventCap = eventsTemp.length;
        } else {
            eventCap = 20;
        }

        for(var j = 0; j < eventCap; j++){

            let i = j;
            let eT = eventsTemp[i];
            let venueID = eT.venue_id;

            let lat;
            let long;
            let city;
            let region;
            let country;
            let logo;

            // function 
            request('https://www.eventbriteapi.com/v3/venues/' + venueID + '/?token=' + token, function(err, res, body){
                let locationResponse = JSON.parse(body);

                if(locationResponse.address != null){
                    lat = locationResponse.latitude;
                    long = locationResponse.longitude;
                    city = locationResponse.address.city;
                    region = locationResponse.address.region;
                    country = locationResponse.address.country;
                    if(eventsTemp[i].logo == null){
                        logo = null;
                    } else {
                        logo = eventsTemp[i].logo.original.url;
                    }

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
                        },
                        logo: logo
                    }

                    x++;
                }else{
                    x++;
                } 
                
                if(x === eventCap){
                    response.setHeader('Content-Type', 'application/json');
                    response.setHeader('Access-Control-Allow-Origin', '*');
                    response.send(JSON.stringify({ events }));
                    response.end();
        
                    console.log('events sent');
                }
            });
        }

        if(err){
            console.error(err.message);
        }
    });
}

function getTrip(lat, long, response){

}

/***************************************
 * App other stuff
 */

app.post('/getEvents', function(req, res){
    let eventNameRequest = req.body.eventName;
    getEvents(eventNameRequest, res);
});

app.post('./getTrip', function(req, res){
    let lat = req.body.lat;
    let long = req.body.long;
    getTrip(lat, long, res);
});



// authentication stuff can go below this
// eventbrite api key: OEVF3VMLIJ2LAQ5DRZ
// https://www.eventbriteapi.com/v3/users/me/?token=TOT2UEOZ2ZSLW5LM37FN

app.listen(appPort, function(){
    console.log('safetravels running on port: ' + appPort);
});