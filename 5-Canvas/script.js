document.addEventListener("DOMContentLoaded", () => {
	const canvas = document.querySelector("canvas");
	const ctx = canvas.getContext("2d");
	const R = 5;
	const maxRadius = 50;
	const velocitys = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
	const numberCircle = 400;
	const arrayColor = ["#FFC857", "#E9724C", "#C5283D", "#481D24", "#255F85"];
	let arrayCircle;
	let mouse = {
		x: undefined,
		y: undefined,
	};

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	document.addEventListener("resize", () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		init();
	});

	document.addEventListener("mousemove", (event) => {
		mouse.x = event.clientX;
		mouse.y = event.clientY;
	});

	class Circle {
		constructor(x, y, color) {
			this.x = x;
			this.y = y;
			this.radius = R;
			this.color = color;
			this.velocity = {
				dx: velocitys[Math.floor(Math.random() * velocitys.length)],
				dy: velocitys[Math.floor(Math.random() * velocitys.length)],
			};
		}
		draw() {
			ctx.save();
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
			ctx.fillStyle = this.color;
			ctx.shadowColor = this.color;
			ctx.shadowBlur = 10;
			ctx.fill();
			ctx.closePath();
			ctx.restore();
		}
		update() {
			this.collision();
			this.x += this.velocity.dx;
			this.y += this.velocity.dy;
			if (Math.abs(mouse.x - this.x) < 75 && Math.abs(mouse.y - this.y) < 75) {
				this.radius < maxRadius && this.radius++;
			} else {
				if (this.radius > R) {
					this.radius -= 1;
					this.x += this.velocity.dx * 2;
					this.y += this.velocity.dy * 2;
				}
			}
			this.draw();
		}
		collision() {
			if (this.x >= canvas.width - this.radius || this.x <= this.radius) {
				this.velocity.dx = -this.velocity.dx;
			}
			if (this.y >= canvas.height - this.radius || this.y <= this.radius) {
				this.velocity.dy = -this.velocity.dy;
			}
		}
	}

	function createX() {
		return 2 * R + Math.floor(Math.random() * (canvas.width - 4 * R));
	}

	function createY() {
		return 2 * R + Math.floor(Math.random() * (canvas.height - 4 * R));
	}

	function randomColor() {
		return arrayColor[Math.floor(Math.random() * arrayColor.length)];
	}

	function init() {
		arrayCircle = [];
		for (let i = 0; i < numberCircle; i++) {
			arrayCircle.push(new Circle(createX(), createY(), randomColor()));
		}
	}

	function animate() {
		window.requestAnimationFrame(animate);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		arrayCircle.forEach((circle) => {
			circle.update();
		});
	}

	init();
	animate();
});
