var weather;
var modal;

$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text('New message to ' + recipient)
  modal.find('.modal-body input').val(recipient)
})

function initApplication() {
  console.log("Initializing...");
  loadItems();
  setup();
  modal = document.getElementById("myModal");
}
function setup(){
  getTime();
  if(/*false*/navigator.geolocation) { //purposely triggering false repsonse, b/c geolocation is not working as expected
    var url;
    navigator.geolocation.getCurrentPosition(makeURL);
    function makeURL(obj) {
      lat = obj.coords.latitude;
      lng = obj.coords.longitude;
      console.log("Lat: " + lat + "Long: " + lng);
      url ="https://api.openweathermap.org/data/2.5/weather?lat="+lat.toFixed(4)+"&lon="+lng.toFixed(4)+"&units=imperial&appid=3c59758cb4b64096ba0b4f377be9510b";
      console.log(url);
      getWeather(url);
    }
  } else {
    var url;
    url = "https://api.openweathermap.org/data/2.5/weather?q=Chicago&units=imperial&appid=3c59758cb4b64096ba0b4f377be9510b";
    getWeather(url);
  }
}
function getWeather(url){
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
