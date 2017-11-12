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
    
    
    
        if (window.location.pathname === "/index.html"){
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



    
    
    http.onreadystatechange = function() {
    
    if (this.readyState == 4 && this.status == 200) {
        
      const response = this.response;
      var allEvents = JSON.parse(response).events;
    
      console.log(allEvents.length)
      

    var description = "";

      for (i = 0; i < allEvents.length; i++) {
          eventNameActual = allEvents[i].name;
          description = allEvents[i].desc;

          if(description.length > 250){
              description = description.substring(0,250);
              description += "..."
          }

          var parent = document.getElementById("test");
          var uniqueChild = document.createElement("div");
          var uniqueName = document.createElement("p");
          var eventName = document.createTextNode(eventNameActual);
          uniqueName.appendChild(eventName);
          uniqueName.className = "eventName";
          uniqueChild.appendChild(uniqueName);

          var line = document.createElement("hr");
          uniqueChild.appendChild(line);

          var descriptioncontain = document.createElement("p");
          var descriptiontext = document.createTextNode(description);
          descriptioncontain.appendChild(descriptiontext);
          descriptioncontain.className = "description";
          uniqueChild.appendChild(descriptioncontain);

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