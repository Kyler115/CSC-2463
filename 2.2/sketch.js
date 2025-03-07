let synth1, filt, rev;
let activeKey = null;
let isActive = false;

let keyNotes = 
{
  'a':'A4',
  's':'B4',
  'd':'C5',
  'f':'D5',
  'g':'E5',
  'h':'F5',
  'j':'G5',
  'k':'A5'
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  filt = new Tone.Filter(1000,"lowpass").toDestination();
  rev = new Tone.Reverb(2).connect(filt);
  rev.wet.value = 0;
  synth1 = new Tone.Synth
  (
    {
      envelope:
      {
        attack:0,
        decay:0,
        sustain:1,
        release:1
      }
    }
  ).connect(rev)
  
  reverbSlider = createSlider(0,1,0,0.01);
  reverbSlider.position(200,455);
  reverbSlider.input(() => { rev.wet.value = reverbSlider.value(); });

  attackSlider = createSlider(0,1,0,0.01);
  attackSlider.position(200,500);
  attackSlider.input(() => { synth1.envelope.attack = attackSlider.value(); })

  decaySlider = createSlider(0,1,0,0.01);
  decaySlider.position(200,545);
  decaySlider.input(() => { synth1.envelope.decay = decaySlider.value(); })

  sustainSlider = createSlider(0,1,1,0.01);
  sustainSlider.position(200,590);
  sustainSlider.input(() => { synth1.envelope.sustain = sustainSlider.value(); })

  releaseSlider = createSlider(0,1,1,0.01);
  releaseSlider.position(200,635);
  releaseSlider.input(() => { synth1.envelope.release = releaseSlider.value(); })
}

function keys()
{
  fill(255);
  rect(100,100,75,200);
  rect(200,100,75,200);
  rect(300,100,75,200);
  rect(400,100,75,200);
  rect(500,100,75,200);
  rect(600,100,75,200);
  rect(700,100,75,200);
  rect(800,100,75,200);

  fill(100);
  switch (activeKey)
  {
    case "a":
      rect(100,100,75,200);
      fill(100);
      break;
    case "s":
      rect(200,100,75,200);
      fill(100);
      break;
    case "d":
      rect(300,100,75,200);
      fill(100);
      break;
    case "f":
      rect(400,100,75,200);
      fill(100);
      break;
    case "g":
      rect(500,100,75,200);
      fill(100);
      break;
    case "h":
      rect(600,100,75,200);
      fill(100);
      break;
    case "j":
      rect(700,100,75,200);
      fill(100);
      break;
    case "k":
      rect(800,100,75,200);
      fill(100);
      break;
  }
  fill(0);
  text("A",120,200).textSize(50);
  text("B",220,200).textSize(50);
  text("C",320,200).textSize(50);
  text("D",420,200).textSize(50);
  text("E",520,200).textSize(50);
  text("F",620,200).textSize(50);
  text("G",720,200).textSize(50);
  text("A",820,200).textSize(50);
}

function draw() {
  background(220);
  keys();
  textSize(16);
  text("Reverb: " + reverbSlider.value(), 110, 470);
  text("Attack: " + attackSlider.value(), 110, 515);
  text("Decay: " + decaySlider.value(), 110, 560);
  text("Sustain: " + sustainSlider.value(), 100, 605);
  text("Release: " + releaseSlider.value(), 100, 650);

  text("Use asdfghjk on the keyboard to control the corresponding notes!",1010,100);

  textSize(50);


  // rect(100,100,75,200);
  // text("A",120,200).textSize(50);
  // rect(200,100,75,200);
  // text("B",220,200).textSize(50);
  // rect(300,100,75,200);
  // text("C",320,200).textSize(50);
  // rect(400,100,75,200);
  // text("D",420,200).textSize(50);
  // rect(500,100,75,200);
  // text("E",520,200).textSize(50);
  // rect(600,100,75,200);
  // text("F",620,200).textSize(50);
  // rect(700,100,75,200);
  // text("G",720,200).textSize(50);
  // rect(800,100,75,200);
  // text("A",820,200).textSize(50);
}

function keyPressed()
{
  let pitch = keyNotes[key]
  if (pitch && key !== activeKey)
  {
    synth1.triggerRelease();
    activeKey = key;
    synth1.triggerAttack(pitch);
  }
  switch (activeKey)
  {
    case 'A4':
      keys(100,"A4",true);
      break;
    case 'B4':
      keys(200,"B",true);
      break;
    case 'C5':
      keys(300,"C",true);
      break;
    case 'D5':
      keys(400,"D",true);
      break;
    case 'E5':
      keys(500,"E",true);
      break;
    case 'F5':
      keys(600,"F",true);
      break;
    case 'G5':
      keys(700,"G",true);
      break;
    case 'A5':
      keys(800,"A5",true);
      break;
  }
}

function keyReleased()
{
  isActive = false; 
  if (key == activeKey)
  {
    synth1.triggerRelease();
    activeKey = null;
  }
}
