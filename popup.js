var inputHours = 0;
var inputMinutes = 0;
var inputSeconds = 0;

var defaultHours = 2;
var defaultMinutes = 1;
var defaultSeconds = 01;

initializeClock();

function initializeClock() {
    chrome.runtime.getBackgroundPage(function (backgroundPage) {
        if (backgroundPage.created) {
            backgroundPage.start();
        } else {
            setClock(0, 0, 0);
            // var clock = document.getElementById('clockdiv');
            // var hoursSpan = clock.querySelector('.hours');
            // var minutesSpan = clock.querySelector('.minutes');
            // var secondsSpan = clock.querySelector('.seconds');
            // hoursSpan.innerHTML = ('0' + 0).slice(-2);
            // minutesSpan.innerHTML = ('0' + 0).slice(-2);
            // secondsSpan.innerHTML = ('0' + 0).slice(-2);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
  var startTimerButton = document.getElementById('startTimer');
  var pauseTimerButton = document.getElementById('pauseTimer');

  // start timer button
  startTimerButton.addEventListener('click', function() {
    chrome.runtime.getBackgroundPage(function (backgroundPage) {
        backgroundPage.hours = defaultHours;
        backgroundPage.minutes = defaultMinutes;
        backgroundPage.seconds = defaultSeconds;
        backgroundPage.repeat = true;
        backgroundPage.paused = false;
        backgroundPage.start();
    });
  }, false);

  // end timer button
  pauseTimerButton.addEventListener('click', function() {
    chrome.runtime.getBackgroundPage(function (backgroundPage) {
        backgroundPage.paused = true;
    });
  }, false);
}, false);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "updateTime") {
            setClock(request.data.hours, request.data.minutes, request.data.seconds);
            // var clock = document.getElementById('clockdiv');
            // var hoursSpan = clock.querySelector('.hours');
            // var minutesSpan = clock.querySelector('.minutes');
            // var secondsSpan = clock.querySelector('.seconds');
            // hoursSpan.innerHTML = ('0' + request.data.hours).slice(-2);
            // minutesSpan.innerHTML = ('0' + request.data.minutes).slice(-2);
            // secondsSpan.innerHTML = ('0' + request.data.seconds).slice(-2);
        }
    }
);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "initialize") {

        }
    }
);

function setClock(hours, minutes, seconds) {
    var clock = document.getElementById('clockdiv');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');
    hoursSpan.innerHTML = ('0' + hours).slice(-2);
    minutesSpan.innerHTML = ('0' + minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + seconds).slice(-2);
}
