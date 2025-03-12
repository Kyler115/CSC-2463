let basicSynth, filt, LFOfilt, panner, fmSynth, values, noise1, noiseEnv, filt1, values1,imageFlag;

function preload() {
  img = loadImage("media/cannonball.jpeg");
}

function setup() {
  createCanvas(400, 400);

  panner = new Tone.AutoPanner({
    frequency: 0.1,
    depth: 1
  }).toDestination().start()

  filt = new Tone.Filter(300, "lowpass", -48).connect(panner);

  basicSynth = new Tone.Synth().connect(filt);

  LFOfilt = new Tone.LFO(0.1, 200, 2000).start();

  fmSynth = new Tone.FMSynth({
    harmonicity: 1,
    modulationIndex: 10
  }).toDestination();

  values = new Float32Array([1, 0.02, 0.3, 15, 15, 0.3, 1]);

  filt1 = new Tone.AutoFilter({
    frequency: 0.1,
    depth: 0.3,
    baseFrequency: 500,
    octaves: 4
  }).toDestination().start();

  noiseEnv = new Tone.AmplitudeEnvelope({
    attack: 3,
    decay: 0.1,
    sustain: 1,
    release: 1
  }).connect(filt1)

  noise1 = new Tone.Noise().connect(noiseEnv).start();
  noiseFilt = new Tone.LFO(0.1, 0, 1).start();
  noiseFilt.connect(filt1.frequency);

  values1 = new Float32Array([-96, -30, -30, -12, 0, -12, 0, 0, -6, -12, -30, -96])
}

function draw() 
{
  background(220);
  text("Click for cannonball!",100,100);
  if(imageFlag)
  {
    image(img,0,0,400,400);
  }
}

function mouseClicked() 
{
  Tone.start();
  if (mouseX<=400 && mouseY<=400)
  {
    imageFlag = true;
    noiseEnv.triggerAttackRelease(1);
  }
}
