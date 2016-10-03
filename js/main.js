var loadedJSON;
var herbData = [];
var herbals = [];
var bgColor = '#fff';
var img;


function preload(){
    img = loadImage("img/herbIcon.png");
   loadJSON("data/Herbal.json", gotData);
}

function setup(){

	var width = document.getElementById('chart-herbs').offsetWidth;
  var myCanvas = createCanvas(width, 1200);
	myCanvas.parent('chart-herbs');
  background(bgColor);
  createHerbs();
  // console.log(herbData.herbs.length);
}

function gotData(data){
  herbData = (data);
  // console.log(herbData);
  // console.log(herbData.herbs[2].botanicalName);

}

function draw(){
  background(bgColor);
  // image(img, 0,0);

  for (var i =0; i<herbals.length; i++){
    herbals[i].drawHerb();
    herbals[i].isActivated();
    if(herbals[i].isActive==true) herbals[i].showDetails();
}
}


function findHerb(event){

  var myIssue = document.getElementById('theInput').value;
	// if there is no value, or it is an empty string, prompt the user

	if(!myIssue || myIssue=="") return alert("Enter an ailment like: headache");
		console.log("the value is " + myIssue);
		console.log(herbData.herbs[9].medicinalUse.length);
	// else we need to look it up in the
	for (var i = 0; i<herbData.herbs.length; i++){
		for(var j = 0; j<herbData.herbs[i].medicinalUse.length; j++){
    if (myIssue == herbData.herbs[i].medicinalUse[j]) {
				var results = createP(herbData.herbs[i].commonName);
				results.parent('theResults');
				var resultsAreIn = true;
      console.log(herbData.herbs[i].commonName);
    }
	}
  }

}


function createHerbs(){
  // loop through the herb array and create an object for eache herb
  var x = 95;
  var y = 95;
  var spacer = 140;
  for (var i = 0; i<herbData.herbs.length; i++){
    herbals.push(new Herb(herbData.herbs[i].commonName,herbData.herbs[i].botanicalName,x,y));
    x+= spacer;
    if(x>=width){
      x = 95;
      y+=spacer;
    }
  }
}

function Herb(commonName, botanicalName,x,y){
  this.name1 = commonName;
  this.name2 = botanicalName;
  this.x = x;
  this.y = y;
  this.isActive = false;
  this.Size = 100;
  // maybe color can be based off of the type of the part of the plant used?
  this.color = '#88e7b4';

  this.drawHerb = function(){
    noStroke();
    fill(this.color);
    ellipseMode(CENTER);
    ellipse(this.x, this.y,this.Size,this.Size);
    imageMode(CENTER);
    image(img, this.x, this.y);
  }

  this.isActivated = function(){
    //reset to false?
    this.isActive = false;
    if(mouseX >= this.x-50 && mouseX<=this.x+50 && mouseY>=this.y-50 && mouseY<=this.y+50){
      return this.isActive = true;
    }
    return this.isActive = false;
  }

  this.showDetails = function(){
    fill(255,255,255,200);
    ellipse(this.x, this.y, this.Size, this.Size);
    textAlign(CENTER);
    textStyle(BOLD);
    textSize(10);
    fill(0,97,215);
    text(this.name1,this.x,this.y);
    textStyle(ITALIC);
    textSize(12);
    text(this.name2,this.x,this.y+70);
  }
}

document.getElementById('theInput').addEventListener('change', findHerb);
