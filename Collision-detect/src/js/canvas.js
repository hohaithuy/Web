import utils, {
	distance
} from './utils';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
}

const colors = ['#F27781', '#18298C', '#04BF8A', '#F2CF1D', '#F29F05', '#F23827', '#050259', '#6204BF', '#7C05F2', '#F205CB']

// Event Listeners
addEventListener('mousemove', (event) => {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
})

addEventListener('resize', () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	init()
})

// Objects
class Circle {
	constructor(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.dx = 10;
		this.dy = 10;
		this.radius = radius;
		this.color = color;
	}

	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	}

	update() {
		this.draw();
		if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if(this.y + this.radius > window.innerHeight || this.y < this.radius){
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;
	}


}

function getDistance(x1, y1, x2, y2) {
	let xDistance = x2 - x1;
	let yDistance = y2 - y1;
	return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// ==============================================================================================================
let circle1;
let circle2;
let inCircle = 0;
let outCircle = 0;

function init() {
	circle1 = new Circle(200, 300, 60, '#2185C5');
	circle2 = new Circle(400, 500, 80, 'black');
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	if (getDistance(circle1.x, circle1.y, circle2.x, circle2.y) < circle1.radius + circle2.radius) {
		if(circle1.dx/circle2.dx < 0){
			circle1.dx = -circle1.dx;
			circle2.dx = -circle2.dx;
		}
		else{
			circle1.dx = -circle1.dx;
		}
		if(circle1.dy/circle2.dy < 0){
			circle1.dy = -circle1.dy;
			circle2.dy = -circle2.dy;
		}
		else{
			circle1.dy = -circle1.dy;
		}

		if (outCircle == 1)
			inCircle = 1;
	} else {
		outCircle = 1;
	}
	if (inCircle == 1 && outCircle == 1) {
		circle2.color = colors[Math.floor(Math.random() * colors.length)];
		inCircle = 0;
		outCircle = 0;
	}
	circle1.update();
	//	circle2.update();
}

init();
animate();