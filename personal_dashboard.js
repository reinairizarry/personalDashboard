var url = "http://api.openweathermap.org/data/2.5/weather?q=Chicago&units=imperial&appid=3c59758cb4b64096ba0b4f377be9510b";
var weather;

function initApplication() {
  console.log("Initializing...");
  setup();
}
function setup(){
  getWeather();
  getTime();
}
function getWeather(){
  var xhr = new XMLHttpRequest();
  var value;
  xhr.onreadystatechange = function() {
  if (xhr.readyState==4 && xhr.status==200) {
      value = xhr.responseText;
      console.log("Collected weather info: " + value);
      weather = JSON.parse(value);
      document.getElementById("currentTemp").innerHTML = currentTempGreeting(weather);
      return weather;
    }
  }
  xhr.open("GET",url);
  xhr.send();
}
function currentTempGreeting(object) {
  var temp = object.main.temp;
  var desc = object.weather[0].description;
  var city = object.name;
  return ("It is "+ temp + "&deg;F with " + desc + " in " + city);
}
function getTime() {
  var greeting;
  var today = new Date();
  var currentHour = today.getHours();
  if(currentHour>=23||currentHour<=3) {
    greeting = "You're up late...";
  } else if (currentHour > 3 && currentHour <11) {
    greeting = "Good Morning!";
  } else if (currentHour>=11 && currentHour <= 16) {
    greeting = "Good Afternoon!";
  } else {
    greeting = "Good Evening!";
  }
  document.getElementById("greeting").innerHTML = greeting;
  return today;
 }
