let samples, sampler, buton1, button1;

let del = new Tone.FeedbackDelay(0.2,0.9).toDestination()

function preload()
{
  samples = new Tone.Players
  (
    {
      camera1: "media/bbc_photograph_07076042.mp3",
      camera2: "media/bbc_photograph_07076040.mp3",
      frog: "media/bbc_common-fro_nhu0510423.mp3",
      bee: "media/bbc_galapagos-_nhu0510428.mp3"
    }
  ).connect(del)
}

function setup() {
  createCanvas(400, 400);
  button1 = createButton("Play old camera Sample");
  button1.position(10,30);
  button2 = createButton("Play new camera Sample");
  button2.position(200,200);
  button3 = createButton("Play frog sample");
  button3.position(100,90);
  button4 = createButton("Play bee sample");
  button4.position(220,40);
  button1.mousePressed(()=> {samples.player("camera1").start()})
  button2.mousePressed(()=> {samples.player("camera2").start()})
  button3.mousePressed(()=> {samples.player("frog").start()})
  button4.mousePressed(()=> {samples.player("bee").start()})

  delTimeSlider = createSlider(0,1,0,0.01);
  delTimeSlider.position(10,300);
  delTimeSlider.input(() => {del.delayTime.value = delTimeSlider.value()})
}

function draw() {
  background(220);
  text("Delay time: "+delTimeSlider.value(),15,270);
}
