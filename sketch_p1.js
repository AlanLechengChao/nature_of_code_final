let crows = [];
let SIN_RES = 500;
let rSin = [];
let font;
let thunder;
function preload(){
  for (var i = 0; i < SIN_RES; i++) {
    let val = map(i, 0, SIN_RES - 1, 0, TWO_PI);
    rSin.push( sin(val) );
  }

  crows[0] = new Crow(0, 0) ;
  for (let i = 0; i < 20; i++) {
    crows.push(new Crow(random(-windowWidth/2, windowWidth/2), random(-windowHeight/2, windowHeight/2)))
  }
  thunder = loadSound("thunder.wav")
  font = loadFont("方正瘦金书繁体.ttf");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  thunder.play()
}

function draw(){
  if (!thunder.isPlaying()) {
    open("p2.html", "_self")
    noLoop()
  }
  let time = thunder.currentTime() > 4.2
  if (time) {
    background(floor(2*noise(0.1*frameCount)) * 200, 100);
  }else {
    background(200);
  }


  translate(width/2, height/2);
  for (let x = -width/2; x < width/2; x+= 30) {
    for (let y = -height /2; y < height/2; y+= 20) {
      push();
      stroke(100, 100)
      strokeWeight(1)
      let angle = noise(0.01*frameCount + 0.1*x + 0.5*y) - 0.5
      rotate(angle)
      line(x,y, x + 20, y + 100)
      pop();
    }
  }

  push();

  if (time) {
    scale(2*rSin[2*floor(frameCount)%500] + 3);
  }else {
    scale(5);
  }

  for (let i = 0; i < crows.length; i++) {
    let angle = map(mouseX - width/2, -width/2, width/2, -PI/2, 0)
    if (time) {
      let target = createVector(noise(frameCount*0.004 + 4*i) * width*2 - width, noise(frameCount*0.004 -5*i) * height*2 - height);
      crows[i].seek(target);
      crows[i].update();
      crows[i].display(crows[i].vel.heading());
      if (random() < 0.01) {
        crows[i].makeSound()
      }
    }else {
      crows[i].display(angle + i)
    }



  }
  pop()

}
