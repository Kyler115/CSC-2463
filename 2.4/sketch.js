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
let pluh;

function preload()
{
  bug = loadImage("media/Sprite-0001.png");
  samples = new Tone.Players
  (
    {
      pluh:"media/pluh.mp3",
    }
  ).toDestination();
}

function setup() 
{
  createCanvas(windowWidth,windowHeight);

    filt = new Tone.Filter(1500, "lowpass").toDestination()
  synth1 = new Tone.PolySynth(Tone.Synth).connect(filt);
  
  part1 = new Tone.Part(((time, note) => {
    synth1.triggerAttackRelease(note, "4n", time);
  }), [
    [0, "C2"],
    ["0:2:0", ["C3"]],
    ["0:2:1", "G3"],
    ["0:2:2", "D3"],
    ["0:2:3", "A3"],
    ["0:2:4", "G3"],
    [1, "D2"],
    ["0:2:5", "D3"],
    ["0:2:6", "B3"],
    ["0:2:7", "B3"],
    ["0:2:8", "E3"],
    ["0:2:9", "G3"],
    ["0:2:10", "D3"],
  ]);

  Tone.Transport.start();
  Tone.Transport.bpm.value = 120;
  part1.loop = true;
  part1.loopEnd = "1m";

  seq1 = new Tone.Sequence(((time, note) => {
    synth1.triggerAttackRelease(note, "4n", time);
  }), ["A4", "B4", ["C5", "D5", "E5"], "A4"]);

  part2 = new Tone.Part(((time, value) => {
    synth1.triggerAttackRelease(value.note, value.duration, time);
  }), [
    {time: 0, note: ["D4", "F4", "A4"], duration: "8n"},
    {time: "0:1", note: ["D4", "F4", "B4"], duration: "4n"},
    {time: "0:3", note: ["B#4", "E4", "A4"], duration: "2n"},
    {time: "1:3", note: "A4", duration: "16t"},
    {time: "1:3:1.33", note: "D5", duration: "16t"},
    {time: "1:3:2.67", note: "E4", duration: "16t"}
  ])

  part2.loop = true;
  part2.loopEnd = "2m";
  
  // part3 = new Tone.Part(((time, value) => {
  //   filt.frequency.rampTo(value.freq, value.rampTime, time);
  // }), [
  //   {time: 0, freq: 300, rampTime: 1}
  // ])
  
  part3 = new Tone.Part(((time, note) => {
    synth1.triggerAttackRelease(note, "4n", time);
  }), [
    [0, "D3"],
    ["0:1:0", ["G3"]],
    ["0:1:1", "E3"],
    ["0:1:2", "B3"],
    ["0:1:3", "B3"],
    ["0:1:4", "D3"],
    [1, "D2"],
    ["0:2:1", "G3"],
    ["0:2:2", "A3"],
    ["0:2:3", "D3"],
    ["0:2:4", "G3"],
    ["0:2:5", "C3"],
    ["0:2:6", "C3"],
  ]);

  part3.loop = true;
  part3.loopEnd = "1m";

}

function draw() 
{
  background(220);  
  switch(gameStates)
  {
    case GameStates.START:
      textAlign(CENTER,CENTER);
      textSize(18);
      image(bug,100,50,1300,300);
      text("BUG SQUISH",width/2,height/2);
      text("Press ENTER to start!",width/2,height/1.7);
      part1.start(Tone.now());
      break;

    case GameStates.PLAY:
      part1.stop(Tone.now());//
      part2.start(Tone.now());//
      textAlign(LEFT,TOP);
      text("Score: "+score,0,0);
      textAlign(RIGHT,TOP);
      text("Time: "+Math.ceil(time) ,width,0);
      time -= deltaTime/1000; 
      if(time<=0)
      {
        part2.stop(Tone.now());
        part3.start(Tone.now());
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
      if (part3.state !== "started") 
      {
        Tone.Transport.bpm.value = 120;
        part2.stop(Tone.now());
        part3.start(Tone.now());
      }
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
  Tone.start();
  for (let bug of bugList) 
    {
      if(mouseX >= bug.x && mouseX <= bug.x + 80 && mouseY >= bug.y && mouseY <= bug.y + 80 && bug.dead == false) 
      {
        bug.currentAnimation = "dying";
        score = score+1;
        bugSpeed=bugSpeed+1;
        bugRate = bugRate +.01;
        bug.dead = true;
        death();
      }
    }     
}

// function keyReleased() {
//   if (key === "a") {
//     part1.stop()
//   } else if (key === "s") {
//     seq1.stop()
//   } else if (key === "d") {
//     part2.stop()
//   }
// }

function death() 
{
  let randomRate = random(0.5, 2.0);
  samples.player("pluh").playbackRate = randomRate;
  samples.player("pluh").start();
  Tone.Transport.bpm.value += 5;
}
