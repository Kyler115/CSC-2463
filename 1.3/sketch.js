let monk;
let meat;
let bruh;
let characterM;
let characterME;
let characterB;
let lastDirection = "stand";

function preload()
{
  monk = loadImage("media/monk.png");
  meat = loadImage("media/meat.png");
  bruh = loadImage("media/bruh.png");
}

function setup() 
{
  createCanvas(400, 400);

  characterM = new Character(0,0);
  characterME = new Character(100,0);
  characterB = new Character(200,0);

  characterM.addAnimation("down",new SpriteAnimation(monk,6,5,6));
  characterM.addAnimation("up",new SpriteAnimation(monk,0,5,6));
  characterM.addAnimation("left",new SpriteAnimation(monk,1,0,8));
  characterM.addAnimation("right",new SpriteAnimation(monk,1,0,8));

  characterM.addAnimation("stand",new SpriteAnimation(monk,0,0,1));
  characterM.addAnimation("downS",new SpriteAnimation(monk,7,5,1));
  characterM.addAnimation("upS",new SpriteAnimation(monk,0,5,1));
  characterM.addAnimation("leftS",new SpriteAnimation(monk,0,0,1));
  characterM.addAnimation("rightS",new SpriteAnimation(monk,0,0,1));

  characterME.addAnimation("down",new SpriteAnimation(meat,6,5,6));
  characterME.addAnimation("up",new SpriteAnimation(meat,0,5,6));
  characterME.addAnimation("left",new SpriteAnimation(meat,1,0,8));
  characterME.addAnimation("right",new SpriteAnimation(meat,1,0,8));

  characterME.addAnimation("stand",new SpriteAnimation(meat,0,0,1));
  characterME.addAnimation("downS",new SpriteAnimation(meat,7,5,1));
  characterME.addAnimation("upS",new SpriteAnimation(meat,0,5,1));
  characterME.addAnimation("leftS",new SpriteAnimation(meat,0,0,1));
  characterME.addAnimation("rightS",new SpriteAnimation(meat,0,0,1));

  characterB.addAnimation("down",new SpriteAnimation(bruh,6,5,6));
  characterB.addAnimation("up",new SpriteAnimation(bruh,0,5,6));
  characterB.addAnimation("left",new SpriteAnimation(bruh,1,0,8));
  characterB.addAnimation("right",new SpriteAnimation(bruh,1,0,8));

  characterB.addAnimation("stand",new SpriteAnimation(bruh,0,0,1));
  characterB.addAnimation("downS",new SpriteAnimation(bruh,7,5,1));
  characterB.addAnimation("upS",new SpriteAnimation(bruh,0,5,1));
  characterB.addAnimation("leftS",new SpriteAnimation(bruh,0,0,1));
  characterB.addAnimation("rightS",new SpriteAnimation(bruh,0,0,1));

  characterM.currentAnimation="stand";
  characterME.currentAnimation="stand";
  characterB.currentAnimation="stand";
}

function draw() 
{
  frameRate(30);//30 seems a little too fast, but everything else is too choppy so i think its the best option.
  background(220);
  characterM.draw();
  characterME.draw();
  characterB.draw();
}

function keyPressed() 
{
  switch(keyCode) {
    case UP_ARROW:
      characterB.currentAnimation = "up";
      characterME.currentAnimation = "up";
      characterM.currentAnimation = "up";
      break;
    case DOWN_ARROW:
      characterB.currentAnimation = "down";
      characterME.currentAnimation = "down";
      characterM.currentAnimation = "down";
      break;
    case LEFT_ARROW:
      characterB.currentAnimation = "left";
      characterME.currentAnimation = "left";
      characterM.currentAnimation = "left";
      break;
    case RIGHT_ARROW:
      characterB.currentAnimation = "right";
      characterME.currentAnimation = "right";
      characterM.currentAnimation = "right";
      break;  
  }
}

function keyReleased() 
{
  characterB.currentAnimation = lastDirection;
  characterME.currentAnimation = lastDirection;
  characterM.currentAnimation = lastDirection;
}

class Character 
{
  constructor(x,y) 
  {
    this.x = x;
    this.y = y;
    this.currentAnimation = null;
    this.animations = {};
  }

  addAnimation(key, animation) 
  {
    this.animations[key] = animation;
  }

  draw() 
  {
    let animation = this.animations[this.currentAnimation]; 
    if(animation) 
      {
        switch(this.currentAnimation) 
        {
          case "up":
            this.y -= 2;
            lastDirection="upS";
            break;
          case "down":
            this.y += 2;
            lastDirection="downS";
            break;
          case "right":
            this.x += 2;
            lastDirection="rightS";
            break;
          case "left":
            this.x -= 2;
            lastDirection="leftS";
            break;
        }
      push();
      translate(this.x, this.y);
      if(this.currentAnimation == "left"||lastDirection=="leftS")
      {
        scale(-1,1);
        translate(-80, 0);
      }
      animation.draw();
      pop();
    }
  }
}

class SpriteAnimation 
{
  constructor(spritesheet, startU, startV, duration) 
  {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
  }

  draw() 
  {
    image(this.spritesheet, 0, 0, 80, 80, this.u * 80, this.v * 80, 80, 80);
    this.u++;
    if (this.u == this.startU + this.duration) 
    {
      this.u = this.startU;
    }
  }
}
