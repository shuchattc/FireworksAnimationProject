function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

let gravity = .007;
let friction = .99;

// Event Listeners
addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

// Objects
class Particle {
  constructor(x, y, radius, color, velo) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velo = velo;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }



  update() {
    this.y += this.velo.y;
    this.velo.y += gravity * friction;
    this.x += this.velo.x;
    this.draw();
  }
}


let particles;
function initialize(){
 particles = [];
}
initialize();

// Animation Loop
function animate() {
  mortar.drawRectangle();
  requestAnimationFrame(animate);
  // c.clearRect(0, 0, canvas.width, canvas.height);
  // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y);
  c.fillStyle = 'rgba(0, 0, 0, .05)';
  c.fillRect(0,0, canvas.width, canvas.height);
  //ball.update();
  particles.forEach(particle => {
   particle.update()
  })
}

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

addEventListener('click', function(e){
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  let particleCount = 400;

  //get radians for shooting fireworks
  let angleInc = Math.PI * 2 / particleCount; // Math.PI / 400 is the amount of particles being looped

  for(let i = 0; i<particleCount; i++){
    particles.push(new Particle(mouse.x, mouse.y, 5, getRandomColor(), {x:Math.cos(angleInc * i) * Math.random(), y:Math.sin(angleInc * i) * Math.random()}));
    console.log(angleInc);
  }
    e.preventDefault();
});

initialize();
animate();