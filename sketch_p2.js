let crows = [];
let SIN_RES = 500;
let rSin = [];
let foods = [];
let bc = 240;
let lines = [];
let font;
function preload(){
  for (var i = 0; i < SIN_RES; i++) {
    let val = map(i, 0, SIN_RES - 1, 0, TWO_PI);
    rSin.push( sin(val) );
  }
  for (let i = 0; i < 9; i++) {
    crows.push(new Crow(random(windowWidth), random(windowHeight)))
  }
  font = loadFont("方正瘦金书繁体.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  foods.push(new Food(1.5, width/2, height/2));
}

function draw(){
  if (crows.length>0) {
    background(bc);
  }

  let b = 1;
  for (let i = 0; i < width; i+=5) {
    push();
    strokeWeight(3 + 2*b)
    translate(i, height/2)
    if (crows.length == 0) {
      rotate(i%17*0.01 - i%11*0.01 + i%23*0.01)
    }else {
      rotate(i%17*0.01 - i%11*0.01 + i%23*0.01)

    }
          stroke(150 + 40*b)

    line(0, -height/2, 0, height/2);
    pop();
    b = -b;
  }
  if (frameCount%30 == 0) {
    foods.push(new Food(random(0.5, 2.5), random(0, width), random(0, height)));
  }

  let i = 0;
  while(i< foods.length && foods.length > 0){
    foods[i].update();
    foods[i].display();
    i +=1
  }

  for (let i = 0; i < crows.length; i++) {
    if (foods.length>0) {
      let min = 0;
      for (let j = 0; j < foods.length; j++) {
        let dist = p5.Vector.dist(crows[i].pos, foods[j].pos);
        if (dist < p5.Vector.dist(crows[i].pos, foods[min].pos)) {
          min = j;
        }
      }
      let pos = p5.Vector.dist(crows[i].pos, foods[min].pos)
      crows[i].seek(foods[min].pos);
      if (pos < 10 && crows[i].vel.mag() < 0.1) {
        foods.splice(min,1)
        crows[i].makeSound()
      }

    }
    for (let j = 0; j < crows.length; j++) {
      if (i != j) {
        crows[i].detect(crows[j].pos);
      }
    }
    crows[i].checkEdges()
    crows[i].update();
    crows[i].display(crows[i].vel.heading());
  }

  if (mouseIsPressed) {
    push();
    fill(230, 10, 20, 200);
    noStroke()
    translate(mouseX, mouseY)
    triangle(0, 0, 20, 30, 30 ,10);
    noCursor();

    pop();
  }else {
    cursor();
  }
  for (let i = 0; i < lines.length; i++) {
    lines[i].display();
  }
  for (let i = lines.length-1; i >=0 ; i--) {
    if (lines[i].lifespan <= 0) {
      lines.splice(i);
    }
  }
  if (crows.length == 0) {
    fill(255,0,0)
    textFont(font);
    textSize(500);
    textAlign(CENTER);
    text("死亡", width/2, 3*height/4);
  }
}

function mouseDragged() {
  let mouseVec = new p5.Vector(mouseX, mouseY);
  lines.push(new Line(mouseX, mouseY, pmouseX, pmouseY))
  for (var i = 0; i < crows.length; i++) {
    if (p5.Vector.dist(mouseVec, crows[i].pos) < 30) {
      let x = crows[i].pos.x;
      let y = crows[i].pos.y;
      crows.splice(i,1);
      if (bc == 0) {
        bc = 240;
      }
      else if (bc == 240) {
        bc = 0
      }
    }
  }
}


class Food{
  constructor(_scale,x,y){
    this.pos = new p5.Vector(x,y);
    this.vel = new p5.Vector(random(-3,3),2);
    this.scale = _scale;
    this.a = 0;
    this.angle = random(TAU);
  }
  update(){
    this.pos.add(this.vel);
    this.vel.mult(0.98);
  }
  display(){
    push();
    stroke(40);
    translate(this.pos.x, this.pos.y);
    scale(this.scale);
    rotate(this.angle+this.a*0.02)
    if (this.vel.mag() > 0.1) {
      this.a+= random(1)
    }
    line(-10,0, 10, 0);
    line(-10, 3, 10,2);
    line(-10, -2, 10,-3);
    pop();
  }
}

class Line {
  constructor(x1, y1, x2, y2){
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
    this.lifespan = 1;
  }
  display(){
    this.lifespan -= 0.04;
    push();
    strokeWeight(this.lifespan*12);
    stroke(255,0,0, this.lifespan*255)
    line(this.x1,this.y1,this.x2,this.y2);
    pop();
  }
}
