var url = "http://api.openweathermap.org/data/2.5/weather?q=Chicago&units=imperial&appid=3c59758cb4b64096ba0b4f377be9510b";
var weather;

function initApplication() {
  console.log("Initializing...");
  getWeather();
}
function getWeather(){
  var xhr = new XMLHttpRequest();
  var value;
  xhr.onreadystatechange = function() {
  if (xhr.readyState==4 && xhr.status==200) {
      value = xhr.responseText;
      console.log("Collected weather info: " + value);
      weather = JSON.parse(value);
      document.getElementById("currentTemp").innerHTML = currentTempGreeting(weather.main.temp);
    }
  }
  xhr.open("GET",url);
  xhr.send();
}
function printTemp() {
  console.log(weather.main.temp);
}
function currentTempGreeting(temp) {
  return ("Greetings! The weather is "+ temp + " degrees.");
}
