

let name = document.getElementById('maininput');
let button = document.getElementById('submit');

let http = new XMLHttpRequest();

function sendEventName(eventName){
    http.open('post', '/getEvents', true);
    data = {
        eventName: eventName
    }
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('Access-Control-Allow-Origin', '*');
    http.send(JSON.stringify(data));
};

var currentStoredValue = sessionStorage.getItem('input');
function getEvents(){
    
    sendEventName(currentStoredValue);
    sessionStorage.clear();
};

button.onclick = function(){
    
    
    var indexinput = name.value;
    
    
    
        if (window.location.pathname === "/index.html" || window.location.pathname === "/"){
            sessionStorage.setItem('input', indexinput);
            console.log("you're at home!");
            
            console.log(sessionStorage.getItem('input'))
            document.location.href = "/results.html"
        
           
            
      
        }
        else if (window.location.pathname === "/results.html") {
            used = document.getElementById("test");
            used.innerHTML = "";
            sendEventName(indexinput);
            
        }

    
}

function sendEventDetails(lat, long){
    http.open('post', '/getTrip', true);
    data = {
        lat: lat,
        long: long
    };
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('Access-Control-Allow-Origin', '*');
    http.send(JSON.stringify(data));
}

    
    
    http.onreadystatechange = function() {
    
    if (this.readyState == 4 && this.status == 200) {
        
      const response = this.response;
      var allEvents = JSON.parse(response).events;
      var numberOfEvents = allEvents.length;

      document.getElementById("resultNumber").innerHTML = "SHOWING" + " " + numberOfEvents + " " + "EVENTS..."
      

    var description = "";

      for (i = 0; i < allEvents.length; i++) {
          if(!allEvents[i]){
            console.log('skipping event...');
          }else{
            var eventNameActual = allEvents[i].name;
            var description = allEvents[i].desc;
            var regionalName = allEvents[i].address.city + "," + allEvents[i].address.country;
            var logoURL = allEvents[i].logo
            var latitude = allEvents[i].lat;
            var long = allEvents[i].long;
  
            if(description.length > 250){
                description = description.substring(0,250);
                description += "..."
            }
            var wrapper = document.createElement("div");
            var logo = document.createElement("img");
            var parent = document.getElementById("test");
            var uniqueChild = document.createElement("div");
            var uniqueName = document.createElement("p");
            var regionalChild = document.createElement("span");
            var regionalName = document.createTextNode(regionalName);
            var eventName = document.createTextNode(eventNameActual);
            var button = document.createElement("button");
            var tripImage = document.createElement("img");
            var tripText = document.createElement("p");
            var tripTextNode = document.createTextNode("Book safe hotels via TripAdvisor");
           
            tripImage.src = "images/tripadvisor.png" ;
            wrapper.appendChild(logo);
            uniqueChild.appendChild(wrapper);
            regionalChild.appendChild(regionalName);
            uniqueName.appendChild(eventName);
            uniqueName.className = "eventName";
            uniqueName.appendChild(regionalChild);
            wrapper.appendChild(uniqueName);
            logo.src = logoURL
            logo.className = "uniqueLogos";
            button.className = "tripIcons" ;
            tripImage.id = "tripIcon";
            button.id = "tripButton";
            tripText.className = "tripText";
            tripText.appendChild(tripTextNode);
            console.log(allEvents[i]);
            sessionStorage.setItem('eventDetails' + i, JSON.stringify(allEvents[i]));
            var j = i;
            button.onclick = function() {
                document.location.href = '/eventpage.html?n=' + j;
             }
  
            
            
            
  
  //           //**<button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
  //   //**<i class="material-icons">add</i>
  //   </button> 
  
            var line = document.createElement("hr");
  
            wrapper.appendChild(line);
            button.appendChild(tripImage);
            wrapper.appendChild(button);
            wrapper.appendChild(tripText);
  
           
  
            uniqueChild.className = "dynamicContent";
            
            parent.appendChild(uniqueChild);
  
  
          }

          var wrapper = document.createElement("div");
          var logo = document.createElement("img");
          var parent = document.getElementById("test");
          var uniqueChild = document.createElement("div");
          var uniqueName = document.createElement("p");
          var regionalChild = document.createElement("span");
          var regionalName = document.createTextNode(regionalName);
          var eventName = document.createTextNode(eventNameActual);
          var button = document.createElement("button");
          var tripImage = document.createElement("img");
          var tripText = document.createElement("p");
          var tripTextNode = document.createTextNode("Safe Hotels, an Owl-click away.");
         
          tripImage.src = "images/tripadvisor.png" ;
          wrapper.appendChild(logo);
          uniqueChild.appendChild(wrapper);
          regionalChild.appendChild(regionalName);
          uniqueName.appendChild(eventName);
          uniqueName.className = "eventName";
          uniqueName.appendChild(regionalChild);
          wrapper.appendChild(uniqueName);
          logo.src = logoURL
          logo.className = "uniqueLogos";
          button.className = "tripIcons" ;
          tripImage.id = "tripIcon";
          button.id = "tripButton";
          tripText.className = "tripText";
          tripText.appendChild(tripTextNode);
          button.onclick = function() {
                sendEventDetails(latitude,long);
           }

          
          
          

//           //**<button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
//   //**<i class="material-icons">add</i>
//   </button> 

          var line = document.createElement("hr");

          wrapper.appendChild(line);
          button.appendChild(tripImage);
          wrapper.appendChild(button);
          wrapper.appendChild(tripText);

         

          uniqueChild.className = "dynamicContent";
          
          parent.appendChild(uniqueChild);



      }
      
      if (allEvents.length == 0) {
        var parent = document.getElementById("test");
        var uniqueChild = document.createElement("div");
        var uniqueName = document.createElement("p");
        var eventName = document.createTextNode("Zoinks!");
        uniqueName.appendChild(eventName);
        uniqueName.className = "eventName";
        uniqueChild.appendChild(uniqueName);

        var line = document.createElement("hr");
        uniqueChild.appendChild(line);

        var descriptioncontain = document.createElement("p");
        var descriptiontext = document.createTextNode("Looks like there aren't any events under that name.  Try redoing your search with different keywords.");
        descriptioncontain.appendChild(descriptiontext);
        descriptioncontain.className = "description";
        uniqueChild.appendChild(descriptioncontain);

        

        uniqueChild.className = "dynamicContent";
        
        parent.appendChild(uniqueChild);

      }
      

    }
 
  }



/**<div class="resultsContent1">
            <input id="maininput" placeholder="Tell us here." size=10> <button id="submit"  class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                    SEARCH
                  </button>
            <div class="dynamicContent">
                    .
             </div>
             <div class="dynamicContent">
                    .
             </div> */