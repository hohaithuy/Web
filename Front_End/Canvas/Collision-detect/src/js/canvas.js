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
	constructor(x, y, radius) {
		this.x = x;
		this.y = y;
		this.mass = 1;
		this.velocity = {
			x: Math.random() - 0.5,
			y: Math.random() - 0.5
		};
		this.radius = radius;
		this.color = colors[Math.floor(Math.random() * colors.length)];
	}

	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.strokeStyle = this.color;
		c.stroke();
		c.closePath();
	};

	update() {
		this.draw();
		for (let i = 0; i < circleArray.length; i++) {
			if (this == circleArray[i])
				continue;
			if (getDistance(this.x, this.y, circleArray[i].x, circleArray[i].y) < this.radius * 2) {
				resolveCollision(this, circleArray[i]);
			}
		}
		if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
			this.velocity.x = -this.velocity.x;
		}
		if (this.y + this.radius > window.innerHeight || this.y < this.radius) {
			this.velocity.y = -this.velocity.y;
		}
		this.x += this.velocity.x;
		this.y += this.velocity.y;
	};


}

function getDistance(x1, y1, x2, y2) {
	const xDistance = x2 - x1;
	const yDistance = y2 - y1;
	return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}


function rotate(velocity, angle) {
	const rotatedVelocities = {
		x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
		y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
	};

	return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
	const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
	const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

	const xDist = otherParticle.x - particle.x;
	const yDist = otherParticle.y - particle.y;

	// Prevent accidental overlap of particles
	if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

		// Grab angle between the two colliding particles
		const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

		// Store mass in var for better readability in collision equation
		const m1 = particle.mass;
		const m2 = otherParticle.mass;

		// Velocity before equation
		const u1 = rotate(particle.velocity, angle);
		const u2 = rotate(otherParticle.velocity, angle);

		// Velocity after 1d collision equation
		const v1 = {
			x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
			y: u1.y
		};
		const v2 = {
			x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),
			y: u2.y
		};

		// Final velocity after rotating axis back to original location
		const vFinal1 = rotate(v1, -angle);
		const vFinal2 = rotate(v2, -angle);

		// Swap particle velocities for realistic bounce effect
		particle.velocity.x = vFinal1.x;
		particle.velocity.y = vFinal1.y;

		otherParticle.velocity.x = vFinal2.x;
		otherParticle.velocity.y = vFinal2.y;
	}
}

// ==============================================================================================================
let circleArray = [];


function init() {
	circleArray = [];
	for (let i = 0; i < 6; i++) {
		let radius = 80;
		let x = Math.random() * (window.innerWidth - radius * 2) + radius;
		let y = Math.random() * (window.innerHeight - radius * 2) + radius;
		if (i != 0) {
			for (let j = 0; j < circleArray.length; j++) {
				if (getDistance(x, y, circleArray[j].x, circleArray[j].y) < radius * 2) {
					let x = Math.random() * (window.innerWidth - radius * 2) + radius;
					let y = Math.random() * (window.innerHeight - radius * 2) + radius;
					j = -1;
				}
			}
		}
		circleArray.push(new Circle(x, y, radius));
	}
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < circleArray.length; i++)
		circleArray[i].update();
}

init();
animate();