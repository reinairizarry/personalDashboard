//This clock takes the current time and creates a hex color format for every second the color changes.

// new date instead of date.now allows for get hour mins
var clock = document.getElementById('clock');

//hexclock gets current time, turn into hexcolor format, updates the content then changes the background color
function hexClock() {
  var time = new Date();
  var hours = (time.getHours() % 12).toString();
  var minutes = time.getMinutes().toString(); //get hours doesnt return length so use toString
  var clockStr = "";
  //changes the hex color format
  //#000000
  if (hours.length < 2) {
    hours = '0' + hours;//can only return one or two numbers, so put a zero in from of time
   }

   if (minutes.length < 2) {
     hours = "0" + minutes;
   }
var clockStr = hours + " : " + minutes;
  if (clockStr != null){
    clock.textContent = clockStr;
  }
}
hexClock();
setInterval(hexClock, 1000); //changes color every second
