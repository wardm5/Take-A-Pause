var cow = "mooh";
var startTime;
var endTime;

setInterval(function() {
    alert("Hello");
    // window.open('popup.html','mywin','width=300,height=250');
    PopupCenter('popup.html', 'mywin', 315, 250);
}, 200000000);

function PopupCenter(pageURL, title,w,h) {
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2);
  var targetWin = window.open (pageURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
  return targetWin;
}
