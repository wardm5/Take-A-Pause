var timer;
var reminderWindow;
// var remaining = {
//     hrs: 0,  // remaining hours
//     mins: 0,  // remaining minutes
//     secs: 0,  // remaining seconds
// }

// var set = {
//     hrs: 0,   // set hours
//     mins: 0,  // set minutes
//     secs: 0,  // set seconds
// }

// var alarm = {
//     hrs: 0,  // alarm hours
//     mins: 0,  // alarm minutes
//     secs: 20,  // alarm seconds
// }

var pD = {  // popupData
    rH: 0,  // remaining hours
    rM: 0,  // remaining minutes
    rS: 0,  // remaining seconds

    sH: 0,   // set hours
    sM: 0,  // set minutes
    sS: 0,  // set seconds

    aH: 0,  // alarm hours
    aM: 0,  // alarm minutes
    aS: 0,  // alarm seconds

    repeat: false,
    paused: false
}

var reminderData = {
    reminderHours: 0,
    reminderMinutes: 0,
    remainderSeconds: 5,
    sound: false
}

function extensionPopup() {
    popupClock();   // shows clock
    clearInterval(timer);  // clears last timer
    timer = setInterval(popupClock, 1000);  // sets new timer
    created = true;
}

function reminderPopup() {
    reminderClock();   // shows clock
    clearInterval(timer);  // clears last timer
    timer = setInterval(reminderClock, 1000);  // sets new timer
    created = true;
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "extensionPopup") {
            pD = request.data;
            extensionPopup();
        }
    }
);

function popupClock() {
  if (pD.rH <= 0 && pD.rM <= 0 && pD.rS <= -1 && (pD.sH > 0 || pD.sM > 0 || pD.sS > 0)) {
      reminderWindow = PopupCenter('/src/reminder/reminder.html', 'mywin', 315, 250);
      pD.rH = pD.aH;
      pD.rM = pD.aM;
      pD.rS = pD.aS;
      clearInterval(timer);
      reminderPopup();
      // if (pD.repeat) {
      //     pD.rH = pD.sH;
      //     pD.rM = pD.sM;
      //     pD.rS = pD.sS;
      //     extensionPopup();
      // }
  } else {
      chrome.runtime.sendMessage({
          msg: "updateTime",
          data: pD
      });
  }
  if (!pD.paused) {
      clockCalculateNextValues();
  }
}

function reminderClock() {
  if (pD.rH <= 0 && pD.rM <= 0 && pD.rS <= -1) {
      clearInterval(timer);
      reminderWindow.close();
      // create new method...
        // start clock for reminder
        // close window at end of timers
      // if repeat is on, set remaining seconds, minutes, and hours back to what it was.
      if (pD.repeat) {
          pD.rH = pD.sH;
          pD.rM = pD.sM;
          pD.rS = pD.sS;
          extensionPopup();
      }
  } else {
      chrome.runtime.sendMessage({
          msg: "reminderTime",
          data: pD
      });
  }
  clockCalculateNextValues();
}

function clockCalculateNextValues() {
    if (pD.rM <= 0 && pD.rH >= 1 && pD.rS <= 0) {
        pD.rm = 60;
        pD.rh--;
    }
    if (pD.rS <= 0 && pD.rM >= 1) {
        pD.rS = 60;
        pD.rM--;
    }
    pD.rS--;
}

function PopupCenter(pageURL, title,w,h) {
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2);
  var targetWin = window.open(pageURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
  return targetWin;
}
