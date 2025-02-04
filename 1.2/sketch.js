let x = 0;
let y = 0;
let colors = 0;

function setup() {
  createCanvas(1920, 1080);
  colorMode(HSB);
  background(0, 0, 70);
}

function draw() {
  noStroke();
  fill(0, 100, 100);
  square(2, 2, 30);

  noStroke();
  fill(30, 100, 100);
  square(2, 34, 30);

  noStroke();
  fill(60, 100, 100);
  square(2, 66, 30);

  noStroke();
  fill(90, 100, 100);
  square(2, 98, 30);

  noStroke();
  fill(180, 100, 100);
  square(2, 130, 30);

  noStroke();
  fill(220, 100, 100);
  square(2, 162, 30);

  noStroke();
  fill(290, 100, 100);
  square(2, 194, 30);

  noStroke();
  fill(30, 100, 50);
  square(2, 226, 30);

  noStroke();
  fill(0, 0, 100);
  square(2, 258, 30);

  noStroke();
  fill(30, 100, 0);
  square(2, 290, 30);
}

function mouseClicked() 
{
  if (mouseX >= 2 && mouseX <= 32 && mouseY >= 2 && mouseY <= 32) 
  {
    colors = 1;
    console.log(colors);
  } 
  else if (mouseX >= 2 && mouseX <= 32 && mouseY >= 34 && mouseY <= 64) 
  {
    colors = 2;
  } 
  else if (mouseX >= 2 && mouseX <= 32 && mouseY >= 66 && mouseY <= 96) 
  {
    colors = 3;
  }
  else if (mouseX >= 2 && mouseX <= 32 && mouseY >= 98 && mouseY <= 128)
  {
    colors = 4;
  } 
  else if (mouseX >= 2 && mouseX <= 32 && mouseY >= 130 && mouseY <= 160) 
  {
    colors = 5;
  } 
  else if (mouseX >= 2 && mouseX <= 32 && mouseY >= 162 && mouseY <= 192) 
  {
    colors = 6;
  } 
  else if (mouseX >= 2 && mouseX <= 32 && mouseY >= 194 && mouseY <= 224) 
  {
    colors = 7;
  } 
  else if (mouseX >= 2 && mouseX <= 32 && mouseY >= 226 && mouseY <= 256) 
  {
    colors = 8;
  }
  else if (mouseX >= 2 && mouseX <= 32 && mouseY >= 258 && mouseY <= 288) 
  {
    colors = 9;
  } 
  else if (mouseX >= 2 && mouseX <= 32 && mouseY >= 290 && mouseY <= 320) 
  {
    colors = 10;
  }
}

function mouseDragged() 
{
  switch (colors) 
  {
    case 1:
      stroke(0, 100, 100);
      break;
    case 2:
      stroke(30, 100, 100);
      break;
    case 3:
      stroke(60, 100, 100);
      break;
    case 4:
      stroke(90, 100, 100);
      break;
    case 5:
      stroke(180, 100, 100);
      break;
    case 6:
      stroke(220, 100, 100);
      break;
    case 7:
      stroke(290, 100, 100);
      break;
    case 8:
      stroke(30, 100, 50);
      break;
    case 9:
      stroke(0, 0, 100);
      break;
    case 10:
      stroke(30, 100, 0);
      break;
  }

  strokeWeight(10);
  line(pmouseX, pmouseY, mouseX, mouseY);
  console.log(mouseX, mouseY);
}