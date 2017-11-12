let name = document.getElementById('name');
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
}

button.onclick = function(){
    sendEventName(name.value);
}

http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const response = this.response;
      console.log(JSON.parse(response));
    }
}