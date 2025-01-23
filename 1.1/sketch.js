
function setup() 
{
  createCanvas(1920,1500)
  colorMode(HSB)
  angleMode(DEGREES)
}

function draw() 
{
background(250,20,100);
noStroke();
fill(100,70,100);
rect(100,100,200,100);
 
stroke(0);
fill(100);
circle(150,150,75);

stroke(0);
fill(100);
square(210,112.5,75);
////////////////////////////////////////////////////
noStroke();
fill(100);
square(100,400,200);

noStroke();
fill(0,30,100,.7);
circle(200,475,100);

noStroke();
fill(100,30,100,.7);
circle(225,525,100);

noStroke();
fill(250,30,100,.7);
circle(175,525,100);
////////////////////////////////////////////////////
noStroke();
fill(1,70,0);
rect(100,800,200,100);

noStroke();
fill(60,100,100);
circle(150,850,75);

noStroke();
fill(0);
triangle(110,875,110,825,150,850);

noStroke();
fill(0,100,100);
rect(210,840,75,45);
noStroke();
fill(0,100,100);
circle(247.5,845,75.5);
noStroke();
fill(100);
circle(230,840,20);
noStroke();
fill(100);
circle(265,840,20);
noStroke();
fill(240,100,100);
circle(230,840,10);
noStroke();
fill(240,100,100);
circle(265,840,10);
////////////////////////////////////////////////////
noStroke();
fill(240,100,50);
square(100,1000,200);

push(); 
stroke(255);
strokeWeight(2);
fill(120, 100, 60);
circle(200, 1100, 100);
fill(0, 100, 100);
beginShape();
  vertex(200,1050);
  vertex(190,1085);
  vertex(155,1085);
  vertex(185-3,1105+3);
  vertex(173-3,1140-3);
  vertex(200,1125);

  vertex(225+4,1135+2);
  vertex(215,1105+3);  
  vertex(245,1085);
  vertex(210,1085);
  vertex(200,1050);
endShape(close);
pop();
}
  // circle(125,125,20);
  // circle(175,125,20);
  
  // arc(150,160,75,25,0,180);

  // noStroke();
  // strokeWeight(1);
  // vertex(100,100);
  // vertex(75,75);
  // vertex(125,90);
  // vertex(150,60);
  // vertex(175,90);
  // vertex(190,50);
  // vertex(200,100);

  // fill(30,100,100)
  // endShape(CLOSE);