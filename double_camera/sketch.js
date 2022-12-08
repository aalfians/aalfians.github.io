//Also see https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
//To detect wether something is a mobile device

//Also check out this guide on making p5js look good on mobile: https://creative-coding.decontextualize.com/mobile/

var capture;

function setup() {
  createCanvas(displayWidth, displayHeight);
  var constraints = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
    }    
    //video: {
      //facingMode: "user"
    //} 
  };
  capture = createCapture(constraints);
  
  capture.hide();
}


function draw() {
 image(capture, 0, 0); 
}