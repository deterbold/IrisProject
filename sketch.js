let video;
let classifier;
let modelURL = './model/';
let instr = "Drop an image here for analysis";

//this is to draw around the things that are detected
let detections = [];

function preload()
{
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() 
{
  const cvs = createCanvas(windowWidth, windowHeight);

  //FUNCTION CALLED WHEN AN IMAGE
  //IS DROPPED IN THE CANVAS
  cvs.drop(receivedImage);

  //LIVE OBJECT CLASSIFICATION HERE
  //video = createCapture(VIDEO);
  //video.hide();
  //classifyVideo();
}

function classifyVideo()
{
  classifier.classify(video, gotResults);
}

function classifyImage(img)
{
  drawUI('analyzing ...', "");
  classifier.classify(img, gotResults);
}

function draw() 
{
  drawUI("", instr);
}

function receivedImage(file)
{
  if(file.type == 'image')
  {
    drawUI();
    const img = createImg(file.data, "");
    img.size(300, 300);
    img.position(width/2 - img.width/2, 0);
    classifyImage(img);
  }
  else
  {
    console.log("not an image file");
  }
}
function gotResults(error, results)
{
  if (error)
  {
    console.error(error);
    return;
  }
  detections = results;
  drawUI("Result: " + results[0].label, instr );

  
  //classifyVideo();
}

function drawUI(lbl, instr)
{
  //UI
  background(0);
  //ONLY RELEVANT WITH STATIC IMAGES
  fill(255);
  noStroke();
  textSize(24);
  textAlign(CENTER, CENTER);
  text(lbl, windowWidth / 2, windowHeight / 2);
  
  if(instr === instr)
  {
    fill(128, 128, 128);
    rect(windowWidth / 2 - 175, windowHeight / 2 + 50, 350, 100);
    fill(255);
    text(instr, windowWidth / 2, windowHeight / 2 + 100);
  }
  if(instr === "")
  {
    console.log("here");
    fill(0);
    rect(windowWidth / 2 - 175, windowHeight / 2 + 50, 350, 100);
  }
  noLoop();
}

function windowResized() 
{
  resizeCanvas(windowWidth, windowHeight);
}