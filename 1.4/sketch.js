let GameStates = Object.freeze
(
  {
    START: "start",
    PLAY: "play",
    END: "end",
  }
);

let score = 0;
let time = 30;
let characterB;
let lastDirection = "stand";
let bug;
let bugSpeed = 2;
let bugRate = .05;
let gameStates = GameStates.START;
let bugList=[];

function preload()
{
  bug = loadImage("media/Sprite-0001.png");
}

function setup() 
{
  createCanvas(windowWidth,windowHeight);
}

function draw() 
{
  background(220);  
  switch(gameStates)
  {
    case GameStates.START:
      textAlign(CENTER,CENTER);
      textSize(18);
      text("Press ENTER to start",width/2,height/2);
      break;

    case GameStates.PLAY:
      textAlign(LEFT,TOP);
      text("Score: "+score,0,0);
      textAlign(RIGHT,TOP);
      text("Time: "+Math.ceil(time) ,width,0);
      time -= deltaTime/1000; 
      if(time<=0)
      {
        gameStates=GameStates.END;
      }
      if (Math.random() < bugRate) {
        bugs();
      }
      for (let bug of bugList) 
      {
        bug.draw();
      }      
      break;
    case GameStates.END:
      textAlign(CENTER,CENTER);
      textSize(18);
      text("Wow, you did okay, i guess... ive gotten 1000 before, so not that great.",width/2,height/3);
      textAlign(CENTER+24,CENTER+24);
      textSize(18);
      text("You killed "+score+" bugs. All innocent, might i add.",width/2,height/2);
      break;
  }
  frameRate(40);//30 seems a little too fast, but everything else is too choppy so i think its the best option.
}

function bugs()
{
    let direction = Math.floor(Math.random()*4);
    let xStart, yStart;
    
    switch(direction)
    {
      case 0:
        xStart = Math.random() * (width - 80);
        yStart = height - 80;
        break;
      case 1:
        xStart = Math.random() * (width - 80);
        yStart = 0;
        break;
      case 2:
        xStart = width - 80;
        yStart = Math.random() * (height - 80);
        break;
      case 3:
        xStart = 0;;
        yStart = Math.random() * (height - 80);;
        break;
    }
    characterB = new Character(xStart,yStart,direction);
    characterB.addAnimation("dying",new SpriteAnimation(bug,5,0,2));
    characterB.addAnimation("squished",new SpriteAnimation(bug,7,0,1));

    switch(direction)
    {
      case 0:
        characterB.addAnimation("up",new SpriteAnimation(bug,1,0,4));
        characterB.currentAnimation = "up";
        break;
      case 1:
        characterB.addAnimation("down",new SpriteAnimation(bug,1,0,4));
        characterB.currentAnimation = "down";
        break;
      case 2:
        characterB.currentAnimation = "left";
        characterB.addAnimation("left",new SpriteAnimation(bug,1,0,4));
        break;
      case 3:
        characterB.currentAnimation = "right";
        characterB.addAnimation("right",new SpriteAnimation(bug,1,0,4));
        break;
    }
    bugList.push(characterB);
}

function keyPressed() 
{
  switch(keyCode) {
    case ENTER:
      gameStates = GameStates.PLAY;
      break;
  }
}

// function keyReleased() 
// {
//   characterB.currentAnimation = lastDirection;
// }

class Character 
{
  constructor(x,y,direction) 
  {
    this.x = x;
    this.y = y;
    this.currentAnimation = null;
    this.animations = {};
    this.dead = false;
    this.direction = direction;
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
        push();
        translate(this.x, this.y);
        
        switch(this.currentAnimation) 
        {
          case "up":
            this.y -= bugSpeed;
            lastDirection="upS";
            break;
          case "down":
            this.y += bugSpeed;
            lastDirection="downS";
            break;
          case "right":
            this.x += bugSpeed;
            lastDirection="rightS";
            break;
          case "left":
            this.x -= bugSpeed;
            lastDirection="leftS";
            break;
          case "dying":
            this.currentAnimation = "squished";
            break;
        }
        if(this.direction == 2)
        {
          rotate(radians(270));
          translate(-80, 0);
        }
        else if(this.direction == 3)
        {
          rotate(radians(90));
          translate(0, -80);
        }
        else if(this.direction == 1)
        {
          rotate(radians(180));
          translate(-80, -80);
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

function mouseClicked()
{
  for (let bug of bugList) 
    {
      if(mouseX >= bug.x && mouseX <= bug.x + 80 && mouseY >= bug.y && mouseY <= bug.y + 80 && bug.dead == false) 
      {
        bug.currentAnimation = "dying";
        console.log("Bug squished at:", bug.x, bug.y);
        score = score+1;
        bugSpeed=bugSpeed+1;
        bugRate = bugRate +.01;
        bug.dead = true;
      }
    }     
}
