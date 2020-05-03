
/*
// in HTML there is a paragraph called timer (top)
// but screw that; I did createP as well (bottom)
var timer = 0;
var counter = 0;
var seconds, minutes;
var game = "Game Over";

function setup() {
	createCanvas(200, 200);
	timer = createP("0:00");
	setInterval(timeIt, 1000);
  }
  
  function draw() {
	background(120);
	textAlign(CENTER, CENTER);
	textSize(20);
	if(counter == 300)
	{
	  text(game, width/2, height/2);
	}
  }
  
  function timeIt() {
	// 1 counter = 1 second
	if (counter < 300) {
	  counter++;
	}
	
	  minutes = floor(counter/60);
	seconds = counter % 60;
	
	// if (counter < 60)
	
	timer.html(minutes + ":" + seconds);
  }
*/


// image detail variables
var locationDict, selectedImage, selectedLocationX, selectedLocationY;
var i = 0;

// scope and interaction variables
var precision = 50; //pixels
var Found = false;
let input, button, greeting;



//preloads the images and associated details
function preload(){
    //load map images from the web
    img1 = loadImage('images/liftyboi1.jpg');
    img2 = loadImage('images/liftyboi2.jpg');
	img3 = loadImage('images/liftyboi3.jpg');
	img4 = loadImage('images/liftyboi4.jpg');
	img5 = loadImage('images/rollyboi.jpg');
    splashScreen = loadImage('images/foundme.jpg');
    
    //create an array (list) of lifty's location - Scene letter: image, x proportion, y proportion
	locationDict = {A:[img1,0.75, 0.35], B:[img2, 0.75, 0.30], C:[img3,0.35, 0.25], D:[img4,0.35, 0.6],
		 E:[img5,0, 0] };
    var listOfKeys = Object.keys(locationDict);
    
    //select a random key - random lifty
    var selectedKey = listOfKeys[Math.floor(random(listOfKeys.length))];
    
    //identify the selected image and location
    selectedImage = locationDict[selectedKey][0];
    selectedLocationX = locationDict[selectedKey][1];
	selectedLocationY = locationDict[selectedKey][2];
	
	
	if(selectedKey == listOfKeys[4])
	{
		input = createInput();
  		input.position(20, 65);

  		button = createButton('submit');
  		button.position(input.x + input.width, 65);
  		button.mousePressed(greet);

 	 	greeting = createElement('h2', 'Is rollyboi better than liftyboi?');
  		greeting.position(20, 5);

  		textAlign(CENTER);
 		textSize(50);
	}
	
    
}

function greet() {
	const name = input.value();
	greeting.html('hello ' + name + '!');
	input.value('');
  
	for (let i = 0; i < 200; i++) {
	  push();
	  fill(random(255), 255, 255);
	  translate(random(width), random(height));
	  rotate(random(2 * PI));
	  text(name, 0, 0);
	  pop();
	}
  }

//changes the state of the sketch 
function mouseClicked() {
  if (mouseX >= (windowWidth*selectedLocationX-precision) && 
      mouseX <= (windowWidth*selectedLocationX+precision) && 
      mouseY >= (windowHeight*selectedLocationY-precision)&& 
      mouseY <= (windowHeight*selectedLocationY+precision)) {
      Found = true;
  } 
  
}

function setup() {
	createCanvas(windowWidth,windowHeight);
	
	
} 



function draw() {

    //functions
	showScene();
	
}


//creates the scene until lifty is found
function showScene() {
    if (Found == false) {
    imageMode(CORNERS);
    backgroundImage = image(selectedImage,0, 0, windowWidth,windowHeight);}
    else {
	//var selectedKey = listOfKeys[i+1];
    backgroundImage = image(splashScreen,0, 0, windowWidth,windowHeight);
	};
	

}
