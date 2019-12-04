'use strict';


var frame = new Image();
frame.origin = 'anonymous';
;frame.src = ('frames/frame1.png');
var width = null; // We will scale the photo width to this
var height = null; // This will be computed based on the input stream
var canvas = null;
var photo = null;
var startbutton = null;
var LinkDownload = null;
var videoContent;

startbutton = document.getElementById('startButton');
LinkDownload = document.getElementById('LinkDownload');
canvas = document.getElementById('canvas');
photo = document.getElementById('photo');
videoContent = document.getElementById('localVideo');
clearphoto();

videoContent.addEventListener('loadedmetadata', function (e) {
  console.log(videoContent.videoWidth, videoContent.videoHeight);
  width = videoContent.videoWidth * 2;
  height = videoContent.videoHeight * 2;
});

// get video by device cammera ------
var constraints = {
  video: true,
};

var video = document.querySelector('video');

function handleSuccess(stream) {
  video.srcObject = stream;
  console.log(stream);
}

function handleError(error) {
  console.error('getUserMedia error: ', error);
}

navigator.mediaDevices.getUserMedia(constraints).
then(handleSuccess).catch(handleError);


// my intervension -----
startbutton.addEventListener('click', function (ev) {
  takepicture();
  ev.preventDefault();
}, false);

// btnDownload.addEventListener('click', function(ev){
// 	var atributo = photo.getAttribute('src');
// 	photo.setAttribute('href', );
// 	console.log(atributo);
// 	// window.open(atributo);
//   ev.preventDefault();
// }, false);

function takepicture() {
  var context = canvas.getContext('2d');
  if (width && height) {
    console.log('agora passou aki');
    canvas.width = width;
    canvas.height = height;
 
    context.drawImage(video, 0, 0, width, height);
    if (frame.src!="") {
      context.drawImage(frame, 0, 0, width, height);
     
    }
    var data = canvas.toDataURL('img/png');
    photo.setAttribute('src', data);
    LinkDownload.setAttribute('href', data);

  } else {
    clearphoto();
  }
}

function clearphoto() {
  var context = canvas.getContext('2d');
  context.fillStyle = "#fff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  var data = canvas.toDataURL('img/png');
  photo.setAttribute('src', data);
}