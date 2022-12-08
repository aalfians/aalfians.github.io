let video = null; 
let detector = null; 
let detections = []; 
let videoVisibility = true;
let detecting = false;

const toggleVideoEl = document.getElementById('toggleVideoEl');
const toggleDetectingEl = document.getElementById('toggleDetectingEl');

document.body.style.cursor = 'wait';

function preload() {
  detector = ml5.objectDetector('cocossd');
}

function setup() {
  createCanvas(640, 480);
  var constraints = {
  audio: false,
  video: {
     facingMode: {
        exact: "environment"
      }
    }    
  };
  video = createCapture(constrain);
  video.size(640, 480);
  console.log('video element is created');
  video.elt.addEventListener('loadeddata', function() {
    if (video.elt.readyState >= 2) {
      document.body.style.cursor = 'default';
    }
  });
}

function draw() {
  if (!video || !detecting) return;
  image(video, 0, 0);
  for (let i = 0; i < detections.length; i++) {
    drawResult(detections[i]);
  }
}

function drawResult(object) {
  drawBoundingBox(object);
  drawLabel(object);
}

function drawBoundingBox(object) {
  stroke('yellow');
  strokeWeight(4);
  noFill();
  rect(object.x, object.y, object.width, object.height);
}

function drawLabel(object) {
  noStroke();
  fill('orange');
  textSize(24);
  text(object.label, object.x + 10, object.y + 24);
  text(nf(object.confidence*100,2,2), object.x + 10, object.y + 48);
}

// callback function. it is called when object is detected
function onDetected(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  if (detecting) {
    detect(); 
  }
}

function detect() {
  detector.detect(video, onDetected);
}

function toggleVideo() {
  if (!video) return;
  if (videoVisibility) {
    video.hide();
    toggleVideoEl.innerText = 'Show Video';
  } else {
    video.show();
    toggleVideoEl.innerText = 'Hide Video';
  }
  videoVisibility = !videoVisibility;
}

function toggleDetecting() {
  if (!video || !detector) return;
  if (!detecting) {
    detect();
    toggleDetectingEl.innerText = 'Stop Detecting';
  } else {
    toggleDetectingEl.innerText = 'Start Detecting';
  }
  detecting = !detecting;
}
