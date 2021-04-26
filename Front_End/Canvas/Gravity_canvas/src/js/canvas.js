import utils from './utils.js'

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
}

const colors = ['#F27781', '#18298C', '#04BF8A', '#F2CF1D', '#F29F05']

// Event Listeners
addEventListener("mousemove", (event) => {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
})

addEventListener("resize", function () {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	init();
})

addEventListener("click", function(){
	init();
})

// Postion

function randomPosition(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// function randomColor() {
// 	return colors[Math.floor(Math.random() * colors.length)];
// }

// Objects
class Ball {
	constructor(x, y, dx, dy, radius) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius;
		this.color = colors[Math.floor(Math.random() * colors.length)];
	}

	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.strokeStyle = 'black';
		c.stroke();
		c.closePath();
	}

	update() {
		if (this.y + this.radius + this.dy >= canvas.height) {
			this.dy = -this.dy * frictionY;
		} else {
			this.dy += gravity;
		}
		if(this.x + this.radius + this.dx >= canvas.width || this.x - this.radius <= 0){
			this.dx = -this.dx
		}
		else{
			this.dx *= frictionX;
		}
		if(this.y + this.radius == canvas.height){
			this.dx = 0;
		}
		this.x += this.dx
		this.y += this.dy;
		this.draw();
	}
}
// ============= ============= ============= ============= ============= ============= ============= =============
let gravity = 1;
let frictionY = 0.9;
let frictionX = 0.998;
let dy = randomPosition(3, 10);
let ballArray;
// Implementation  
function init() {
	ballArray = [];
	for (let i = 0; i < 500; i++) {
		let radius = randomPosition(5, 50);
		let x = randomPosition(radius, canvas.width);
		let y = randomPosition(radius, canvas.height);
		let dx = randomPosition(-5, 2);
		ballArray.push(new Ball(x, y, dx, dy, radius));
	}
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < ballArray.length; i++) {
		ballArray[i].update();
	}
}

init();
animate();