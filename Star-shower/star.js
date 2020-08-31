addEventListener('resize', () => {
	canvas.width = innerWidth
	canvas.height = innerHeight

	init();
})

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

// module.exports = { randomIntFromRange, randomColor, distance }
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
// =========  =========  ========= ========= ========= ========= ========= ========= ========= =========

function Star(x, y, radius, color) {
	this.x = x
	this.y = y
	this.vel = {
		x: randomIntFromRange(-10, 10),
		y: 2
	}
	this.radius = radius
	this.color = color
	this.fric = 0.8;
	this.gravity = 2;
}

Star.prototype.shatter = function () {
	for (let i = 0; i < 8; i++) {
		miniStars.push(new MiniStar(this.x, this.y, 2));
	}
	console.log(miniStars);
}

Star.prototype.draw = function () {
	c.save();
	c.beginPath()
	c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
	c.fillStyle = this.color
	c.shadowColor = '#E3EAEF';
	c.shadowBlur = 20;
	c.fill();
	c.closePath();
	c.restore();
}

Star.prototype.update = function () {
	this.draw()
	if (this.y + this.radius + this.vel.y > canvas.height - groundHeight) {
		this.vel.y = -this.vel.y * this.fric;
		this.shatter();
		this.radius -= randomIntFromRange(3, 9);
	} else {
		this.vel.y += this.gravity;

	}
	if (this.x + this.radius + this.vel.x > canvas.width || this.x - this.radius<= 0) {
		this.vel.x = -this.vel.x * fric;
		this.shatter();
		this.radius -= randomIntFromRange(3, 9);
	} 
	this.x += this.vel.x;
	this.y += this.vel.y;
}

function MiniStar(x, y, radius, color) {
	Star.call(this, x, y, radius, color);
	this.vel = {
		x: randomIntFromRange(-5, 5),
		y: randomIntFromRange(-15, 15)
	}
	this.fric = 0.8;
	this.gravity = 0.1;
	this.lifeSpan = 200;
	this.opacity = 1;
}

MiniStar.prototype.draw = function () {
	c.save();
	c.beginPath();
	c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
	c.fillStyle = `rgba(227, 234, 239, ${this.opacity})`;
	c.shadowColor = '#E3EAEF';
	c.shadowBlur = 20;
	c.fill();
	c.closePath();
	c.restore();
}

MiniStar.prototype.update = function () {
	this.draw()
	if (this.y + this.radius + this.vel.y > canvas.height - groundHeight) {
		this.vel.y = -this.vel.y * this.fric;
	} else {
		this.vel.y += this.gravity;
	}
	this.x += this.vel.x;
	this.y += this.vel.y;
	this.lifeSpan -= 1;
	this.opacity -= 1 / this.lifeSpan;
}

function createMountainInRange(Amount, height, color){
	for(let i = 0; i < Amount; i++){
		const mountainWidth = canvas.width / Amount;
		c.beginPath();
		c.moveTo(i * mountainWidth, canvas.height);
		c.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height);
		c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height);
		c.lineTo(i * mountainWidth - 325, canvas.height);
		c.fillStyle = color;
		c.fill();
	}
}




// =========  =========  ========= ========= ========= ========= ========= ========= ========= =========
const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height);
backgroundGradient.addColorStop(0, '#171e26');
backgroundGradient.addColorStop(1, '#3f586b');



let fric = 0.9;
let gravity = 1;
let ticker = 0;
let randomSpawnRate = 75;
let stars;
let miniStars;
let backgroundStars;
let groundHeight = 100
function init() {
	stars = [];
	miniStars = [];
	backgroundStars = [];
	for (let i = 0; i < 1; i++) {
		stars.push(new Star(canvas.width / 2, 30, 30, '#E3EAEF'));
	}
	for(let i = 0; i < 150; i++){
		const x = Math.random() * canvas.width;
		const y = Math.random() * canvas.height;
		const radius = Math.random() * 3;
		backgroundStars.push(new Star(x, y, radius, 'white'))
	}
}
// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.fillStyle = backgroundGradient;
	c.fillRect(0, 0, canvas.width, canvas.height)
	for(let i = 0; i < backgroundStars.length; i++){
		backgroundStars[i].draw();
	}
	createMountainInRange(1, canvas.height - 50, '#384551');
	createMountainInRange(2, canvas.height - 100, '#2B3843');
	createMountainInRange(3, canvas.height - 300, '#26333E');
	c.fillStyle = '#182028'
	c.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
	stars.forEach((Star, index) => {
		Star.update();
		if(Star.radius <= 0){
			stars.splice(index, 1);
		}
	});
	miniStars.forEach((MiniStar, index) => {
		MiniStar.update();
		if(MiniStar.lifeSpan <= 0){
			miniStars.splice(index, 1);
		}
	});
	ticker++;
	if(ticker % randomSpawnRate == 0){
		const radius = 30;
		const x = Math.random() * (canvas.width - radius) + radius;
		stars.push(new Star(x, -100, 30, '#E3EAEF'));
		randomSpawnRate = random(100, 200);
	}

}

init()
animate()