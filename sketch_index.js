let crows = [];
let SIN_RES = 500;
let rSin = [];
let font;
let points;
let done = false;
function preload(){
  for (var i = 0; i < SIN_RES; i++) {
    let val = map(i, 0, SIN_RES - 1, 0, TWO_PI);
    rSin.push( sin(val) );
  }

  size = floor(windowWidth / 100);
  for (var i = 0; i < size; i++) {
    crows.push( new Crow(random(0, windowWidth),random(0, windowHeight)) );
  }
  font = loadFont("方正瘦金书繁体.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(230);
  textFont(font);

  points = font.textToPoints("鸦", width/2 - 400, height/2 + 300, 800, {
    sampleFactor: 0.1,
    simplifyThreshold: 0
  })


}

function draw() {
  background(230);

  // for (var i = 0; i < points.length; i+= 1) {
  //     point(points[i].x, points[i].y)
  //   }

  // console.log(points);

  mouseVec = createVector(mouseX, mouseY);
  // strokeWeight(10)
  if (!done) {
    drawYa();
  }else {
    push();
    textAlign(CENTER);
    textSize(100);
    fill(0);
    var box = font.textBounds("START", width/2, 3*height/4, 100, "CENTER");
    if (mouseX > box.x && mouseX < box.x+box.w && mouseY > box.y && mouseY < box.y + box.h) {
      cursor("pointer");
      if (mouseIsPressed) {
        window.open("p1.html", "_self")
      }
    }else {
      cursor("default")
    }
    text("START", width/2, 3*height/4);
    pop();
  }


  for (var i = 0; i < crows.length; i++) {
    if (!done) {
      let rate = floor( i/crows.length * points.length)
      // crows[i].detect(mouseVec);
      crows[i].seekPos(points[rate].x, points[rate].y - 24);
    }else{
      if (mouseX > box.x && mouseX < box.x+box.w && mouseY > box.y && mouseY < box.y + box.h) {crows[i].seek(mouseVec)}
      else {
        let target = createVector(noise(frameCount*0.004 + 4*i) * width*2 - width, noise(frameCount*0.004 -5*i) * height*2 - height);
        crows[i].seek(target);
      }

      crows[i].checkEdges();
    }
    // crows[i].checkEdges();
    crows[i].update();
    crows[i].display(crows[i].vel.heading())
    if (p5.Vector.dist(crows[i].pos, mouseVec) < 50) {
      crows[i].vel.setMag(10);
      crows[i].makeSound();

      crows[i].checked = true;
    }

  }
  done = true;
  for (var i = 0; i < crows.length; i++) {
    if (!crows[i].checked) {
      done = false;
      break;
    }
  }
  // console.log(done);
  push();
  textSize(20)
  text(floor(frameRate()),100,100);
  pop();
}


function drawYa(){
  push();
  textSize(800);
  fill(0, 10, 5, constrain(frameCount*0.4, 0, 200));
  text("鸦", width/2 - 400, height/2 +300);
  pop();
}
