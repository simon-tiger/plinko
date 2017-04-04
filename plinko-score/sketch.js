// module aliases
var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var plinkos = [];
var bounds = [];
var cols = 11;
var rows = 10;

var div;
var button;
var canvas;

function setup() {
  canvas = createCanvas(600, 800);
  canvas.position(47, 0);
  div = createDiv('');
  div.style("background-color", "#000");
  div.style("float", "left");
  div.style("position", "absolute");
  div.style("top", "300px");
  button = createButton('CHIPS');
  button.parent(div);
  button.mousePressed(addParticle);
  colorMode(HSB);
  engine = Engine.create();
  world = engine.world;
  //world.gravity.y = 2;
  
  var spacing = width / cols;
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols + 1; i++) {
      var x = i * spacing;
      if (j % 2 == 0) {
        x += spacing / 2;
      }
      var y = spacing + j * spacing;
      var p = new Plinko(x, y, 16);
      plinkos.push(p);
    }
  }
  
  var b = new Boundary(width / 2, height - 51, width, 100);
  bounds.push(b);
  
  for (var i = 0; i < cols + 2; i++) {
    var x = i * spacing;
    var h = 100;
    var w = 10;
    var y = 698 - h / 2;
    var b = new Boundary(x, y, w, h);
    bounds.push(b);
    
  }
  
  
}

function addParticle() {
  newParticle(width/2, 16);
}

function newParticle(x, y) {
  var p = new Particle(x, y, 10);
  particles.push(p);
}

function draw() {
  background(0, 0, 0);
  console.log(frameRate());
  Engine.update(engine, 1000 / 30);
  for (var i = 0; i < particles.length; i++) {
    particles[i].show();
    if (particles[i].isOffScreen()) {
      World.remove(world, particles[i].body);
      particles.splice(i, 1);
      i--;
    }
  }
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].show();
  }
  for (var i = 0; i < bounds.length; i++) {
    bounds[i].show();
  }
  fill(51);
  noStroke();
  textSize(25);
  text('1\n0\n0', 20, height-64);
  text('5\n0\n0', 75, height-64);
  text('1\n0\n0\n0', 130, height-95);
  text('I', 187, height-64);
  text('0', 184, height-32);
  text('I', 187, height-1);
  text('10', 232, height-98)
  text('0\n0\n0', 240, height-64);
  text('I', 297, height-64);
  text('0', 294, height-32);
  text('I', 297, height-1);
  text('1\n0\n0\n0', 350, height-95);
  text('5\n0\n0', 402, height-64);
  text('1\n0\n0', 458, height-64);
}
