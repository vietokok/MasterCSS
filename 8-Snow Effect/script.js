document.addEventListener("DOMContentLoaded", () => {
	const canvas = document.querySelector("canvas");
	const c = canvas.getContext("2d");
	let arraySnow = [];

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	class Snow {
		constructor() {
			this.radius = Math.random() * 6;
			this.x = Math.floor(Math.random() * canvas.width);
			this.y = -this.radius;
			this.color = "#fff";
			this.velocity = {
				dx: Math.floor(Math.random() * 4 - 2),
				dy: Math.floor(Math.random() * 3 + 2),
			};
		}

		draw() {
			c.save();
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
			c.fillStyle = this.color;
			c.shadowColor = "#fff";
			c.shadowBlur = 5;
			c.fill();
			c.closePath();
			c.restore();
		}

		update() {
			if (this.y > canvas.height - 2 * this.radius) {
				this.velocity.dy = 0;
			}
			this.draw();
			this.x += this.velocity.dx;
			this.y += this.velocity.dy;
		}
	}

	function init() {
		arraySnow.push(new Snow());
	}

	function animate() {
		window.requestAnimationFrame(animate);
		c.clearRect(0, 0, canvas.width, canvas.height);
		arraySnow.forEach((snow) => {
			snow.update();
		});
		arraySnow.length > 500 && arraySnow.splice(0, 1);
		init();
	}

	animate();
});
