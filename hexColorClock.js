//This clock takes the current time and creates a hex color format for every second the color changes.

// new date instead of date.now allows for get hour mins
var clock = document.getElementById('clock');
var hexColor = document.getElementById('hex-color');

//hexclock gets current time, turn into hexcolor format, updates the content then changes the background color
function hexClock() {
  var time = new Date();
  var hours = (time.getHours() % 12).toString();
  var minutes = time.getMinutes().toString(); //get hoursd oesnt return length so use toString
  var seconds = time.getSeconds().toString();

  //changes the hex color format
  //#000000
  if (hours.length < 2) {
    hours = '0' + hours;//can only return one or two numbers, so put a zero in from of time
   }

   if (minutes.length < 2) {
     hours = "0" + minutes;
   }

  if (seconds.length < 2) {
   seconds = '0' + seconds;
  }

var clockStr = hours + " : " + minutes  + ' : ' + seconds;;
var hexColorStr = "#" + hours + minutes + seconds;

clock.textContent = clockStr;
hexColor.textContent = hexColorStr;
document.body.style.backgroundColor = hexColorStr;

}
hexClock();
setInterval(hexClock, 1000); //changes color every second
