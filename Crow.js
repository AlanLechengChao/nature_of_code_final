"use strict"

class Crow{
  constructor(x,y){
    this.pos = new p5.Vector(x,y);
    this.vel = new p5.Vector();
    this.acc = new p5.Vector();
    this.Head = new Head();
    this.TailFeathers = new TailFeathers();
    this.Wings = new Wings();
    this.Legs = new Legs();
    this.maxSpeed = 6;
    this.maxForce = 0.1;
    this.rad = 200;
    this.freq = random(5, 20);
    this.status;

    this.detectVector = createVector();
    this.directionVector = createVector();
    this.predictDistance = 40;
    this.detectRadius = 80;

    this.ah = loadSound("crow" + floor(random(1,5)) + ".wav");

    this.checked = false;
  }
  flow(angle) {
    let desired = p5.Vector.fromAngle(angle);
    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }
  seek(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let distance = desired.mag();
    desired.normalize();
    if (distance < this.rad) {
      let mappedMag = map(distance, 0, this.rad, 0, this.maxSpeed);
      desired.mult(mappedMag);
    } else {
      desired.mult(this.maxSpeed);
    }

    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }
  seekPos(x,y) {
    let target = new p5.Vector(x,y)
    let desired = p5.Vector.sub(target, this.pos);
    let distance = desired.mag();
    desired.normalize();
    if (distance < this.rad) {
      let mappedMag = map(distance, 0, this.rad, 0, this.maxSpeed);
      desired.mult(mappedMag);
    } else {
      desired.mult(this.maxSpeed);
    }

    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }
  detect(target) {
    this.detectVector = p5.Vector.mult(this.vel.copy().normalize(), this.predictDistance);
    let centerPos = p5.Vector.add(this.pos, this.detectVector)

    let distance = centerPos.dist(target);
    if (distance < this.detectRadius) {

      this.maxDesiredVelocity = map(distance, 0, this.detectRadius, 2, 5);

      this.directionVector = p5.Vector.sub(target, centerPos);
      this.directionVector.setMag(this.detectRadius);
      this.directionVector.mult(-1);

      let directionPos = p5.Vector.add(centerPos, this.directionVector);
      this.seek(directionPos);
    }
  }

  applyForce(force){
    let f = force.copy();
    this.acc.add(f);
  }
  checkEdges() {
    if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }
  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    // this.display(this.vel.heading());
    // if (this.vel.mag() > 6) {
    //   this.makeSound();
    // }

  }
  display(angle){
    let k;
    angle += PI/2;
    while( angle < 0 || angle > TWO_PI){
      if (angle > TWO_PI) {
        angle -= TWO_PI;
      }
      else if (angle < 0) {
        angle += TWO_PI;
      }
    }
    if (angle < PI) {
      k = 1;
    }else{
      k = -1;
    }
    push();
    fill(30);
    noStroke();
    translate(this.pos.x, this.pos.y);
    if (this.status == "stand") {
      if (angle >= PI && angle <= 3*PI/2) {
        angle += PI/2
      }else if (angle <= PI && angle >= PI/2) {
        angle -= PI/2
      }
      this.Legs.setAnchor(0, -2);
      this.Legs.display(k);
    }
    // textSize(8)
    // text(this.checked, 30,20)
    rotate(angle);
    // rotate(angle - PI/2);

    beginShape();
    vertex(3*k, -10);
    quadraticVertex(-8*k,-20, -8*k, 2);
    quadraticVertex(-12*k,20, -2*k, 20);
    quadraticVertex(12*k, 20, 13*k, -2);
    quadraticVertex(12*k,-20, 3*k, -10);
    endShape();
    this.Head.setAnchor(0, -4);
    this.Head.display(PI/12*k, k);
    if (this.ah.isPlaying()) {
      this.Head.open = 1;
    }else{
      this.Head.open = 0;
    }
    this.TailFeathers.setAnchor(0, 10);
    this.TailFeathers.display(1.5);
    this.Wings.setAnchor(-6 *k, -8, 6*k, -5);
    let pan = 2*this.pos.x/width-1;
    if (this.vel.mag() < 1.6 && this.vel.mag() >= 0.4) {
      this.Wings.flap(30 + this.freq, k, pan);
      this.status = "fly";
    }else if (this.vel.mag() < 0.4) {
      this.Wings.unflap(k);
      this.status = "stand";
    }
    else {
      this.Wings.flap(this.freq, k, pan);
      this.status = "fly";
    }
    this.Wings.update();
    this.Wings.display(k);


    pop();
  }
  makeSound(){
    if (!this.ah.isPlaying()) {
      this.ah.play();
      this.ah.amp(0.8);
      let pan = 2*this.pos.x/width-1;
      this.ah.pan(pan);
    }
  }
}

class Head{
  constructor(){
    this.x;
    this.y;
    this.angle;
    this.open = 0;
  }
  setAnchor(x, y){
    this.x = x;
    this.y = y;
  }

  display(__angle,k){
    push();
    translate(this.x, this.y);
    rotate(__angle);
    // stroke(0);
    beginShape();
    vertex(0,0);
    quadraticVertex(15*k, 0, 12*k, -10);
    quadraticVertex(12*k, -15, 9*k, -20);
    quadraticVertex(7*k, -24, 8*k, -20);

    vertex((12+this.open)*k, -31 + this.open);
    vertex(6*k, -24)
    vertex((12-3*this.open)*k, -31 - 2*this.open);
    vertex(5*k, -28);
    quadraticVertex(-8*k, -28, -8*k, -6);
    quadraticVertex(-7*k, 0, 0, 0);
    endShape();

    pop();
  }
}

class TailFeathers{
  constructor(){
    this.x;
    this.y;
  }
  setAnchor(x,y){
    this.x = x;
    this.y = y;
  }
  display(wide){
    for (let i = 0; i< 5 + floor(wide); i++) {
      push();
      noStroke();
      rotate(-PI/24 * wide + PI/48 * i * wide);
      ellipse(0, 20, 3 + wide, 40);
      pop();
    }
  }
}

class Wings {
  constructor(){
    this.anchor1;
    this.anchor2;
    this.wing1 = new p5.Vector.fromAngle(0, 28);
    this.wing2 = new p5.Vector.fromAngle(0, 20);
    this.node1;
    this.node2;
    this.phase = random(100);
    this.flapSound = [loadSound("flap1.wav"), loadSound("flap2.wav"), loadSound("flap3.wav")]
  }
  flap(freq, k, pan){
    let angle = 5 * PI / 6 * k + PI/2;
    let val = floor(frameCount*freq + this.phase) % SIN_RES;
    if (rSin[val] < -0.99) {
      let r = floor(random(3));
      this.flapSound[r].amp(random(0.06))
      this.flapSound[r].play();
      this.flapSound[r].rate(1);
    }
    for (var i = 0; i < this.flapSound.length; i++) {
      if (this.flapSound[i].isPlaying()) {
        this.flapSound[i].pan(pan);
      }
    }
    angle = map(rSin[val], -1, 1, 2*PI/6*k + PI/2, 5*PI/6*k + PI/2);
    this.wing1 = new p5.Vector.fromAngle(angle, 28);
    angle = - 4 * PI / 6 *k + PI/2;
    angle = map(rSin[val], -1, 1, -1*PI/6*k + PI/2, -4*PI/6*k + PI/2);
    this.wing2 = new p5.Vector.fromAngle(angle, 20);
    return rSin[val];
  }
  unflap(k){
    let h1 = this.wing1.heading()
    let h2 = this.wing2.heading()
    let rate1 = abs(h1-PI/2)
    let rate2 = abs(h2-PI/2)
    if (h1 > PI/2 + PI/30 || h1 < PI/2 - PI/30) {
      let angle = h1 - k*PI/20*rate1;
      this.wing1 = new p5.Vector.fromAngle(angle, 28);
    }else{
      this.wing1.setMag(20);
    }
    if (h2 > PI/2 + PI/30 || h2 < PI/2 - PI/30) {
      let angle = h2 + k*PI/25*rate2;
      this.wing2 = new p5.Vector.fromAngle(angle, 20);
    }else{
      this.wing2.setMag(12);
    }
  }
  update(){
    this.node1 = p5.Vector.add(this.anchor1, this.wing1);
    this.node2 = p5.Vector.add(this.anchor2, this.wing2);
  }
  display(k){
    push();
    stroke(30);
    line(this.anchor1.x, this.anchor1.y, this.node1.x, this.node1.y);
    line(this.anchor2.x, this.anchor2.y, this.node2.x, this.node2.y);
    strokeWeight(1);
    for (let i = 0; i < 12; i++) {
      let l = p5.Vector.mult(this.wing1, i/12);
      let p = p5.Vector.add(this.anchor1, l);
      beginShape();
      vertex(p.x, p.y);
      quadraticVertex(p.x, p.y + 10 ,p.x - 4*k, p.y + 18 + 0.8*i);
      quadraticVertex(p.x - 6*k, p.y + 15 ,p.x, p.y);
      endShape();
    }
    push();
    for (let i = 0; i < 6; i++) {
      let p = new p5.Vector(this.node1.x + 5*k - i*k, this.node1.y + 3*i);
      let l = this.wing1.copy().add(p);
      rotate(-PI/200 * i*k)
      beginShape();
      vertex(p.x, p.y);
      quadraticVertex(l.x + 5*k, l.y - 4, l.x, l.y);
      vertex(p.x,p.y + 2);
      endShape();
    }
    pop();


    for (let i = 0; i < 12; i++) {
      let l = p5.Vector.mult(this.wing2, i/12);
      let p = p5.Vector.add(this.anchor2, l);
      beginShape();
      vertex(p.x, p.y);
      quadraticVertex(p.x, p.y + 7 ,p.x + 4*k, p.y + 12 + 0.8*i);
      quadraticVertex(p.x + 5*k, p.y + 10 ,p.x, p.y);
      endShape();
    }
    for (let i = 0; i < 5; i++) {
      let p = new p5.Vector(this.node2.x - k + i*k, this.node2.y + 2*i);
      let l = this.wing2.copy().add(p);
      rotate(PI/200 * i*k)
      beginShape();
      vertex(p.x, p.y);
      quadraticVertex(l.x - 5*k, l.y - 4, l.x, l.y);
      vertex(p.x,p.y + 2);
      endShape();
    }
    pop();
  }
  setAnchor(x1, y1, x2, y2){
    this.anchor1 = new p5.Vector(x1, y1);
    this.anchor2 = new p5.Vector(x2, y2);
  }


}

class Legs {
  constructor(){
    this.x;
    this.y;
  }
  setAnchor(x,y){
    this.x = x;
    this.y = y;
  }
  display(k){
    // console.log("work");
    push();
    translate(this.x, this.y);
    stroke(30);
    strokeWeight(5);

    line(3*k,0, 3*k, 15);
    line(-1*k,0,-1*k,15);
    strokeWeight(2);
    line(-2*k,12, -1*k, 22);
    strokeWeight(2.5)
    line(2*k,12,3*k, 22);
    strokeWeight(0.8);
    line(-1*k,22, -5*k, 25);
    line(-1*k,22, -2*k, 25);
    line(-1*k,22, 0*k, 25);
    line(3*k,22, 7*k, 25);
    line(3*k,22, 4*k, 25);
    line(3*k,22, 1*k, 25);
    pop();
  }
}
