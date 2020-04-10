document.addEventListener("DOMContentLoaded", () => {
	const audio = document.getElementById("audio");
	const canvas = document.createElement("canvas");
	const c = canvas.getContext("2d");

	document.body.appendChild(canvas);

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	let FireWorkArray = [];
	let SparkArray = [];

	let Reset, Size, NumberFw, Fill;

	Reset = document.querySelector("#Reset-Config");
	Size = document.querySelector("#Size");
	NumberFw = document.querySelector("#Number");
	Fill = document.querySelector("#Fill");

	let config = {
		size: 3,
		number: 20,
		fill: 0.1,
	};

	const ColorArray = [
		"#ffffff",
		"#FF0000",
		"#33FF33",
		"#CCFF00",
		"#FF9900",
		"#3399FF",
		"#FF3399",
		"#CC0066",
		"#00FF00",
	];

	document.addEventListener("resize", () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	});

	document.addEventListener("click", () => {
		audio.play();
	});

	Size.addEventListener("change", () => {
		config.size = Size.value;
	});
	NumberFw.addEventListener("change", () => {
		config.number = NumberFw.value;
	});
	Fill.addEventListener("change", () => {
		config.fill = "." + Fill.value;
	});

	Reset.addEventListener("click", () => {
		config.size = 3;
		config.number = 20;
		config.fill = 0.1;
		Size.value = 3;
		NumberFw.value = 20;
		Fill.value = 1;
	});
	/**FireWork**/
	class FireWork {
		constructor() {
			this.radius = config.size;
			this.x = canvas.width / 2;
			this.y = canvas.height;
			this.color = ColorArray[Math.floor(Math.random() * ColorArray.length)];
			this.velocity = {
				x: Math.random() * 8 - 4,
				y: Math.random() * 3 + 3,
			};
			this.maxY = (Math.random() * canvas.height) / 4 + canvas.height / 10;
			this.life = false;
		}
		draw(c) {
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			c.fillStyle = this.color;
			c.fill();
			c.closePath();
		}
		detonating() {
			if (this.y <= this.maxY || this.x <= 0 || this.x >= canvas.width) {
				this.life = true;
				for (let i = 0; i < 10; i++) {
					SparkArray.push(new Spark(this.x, this.y, this.radius, this.color));
				}
			}
		}
		update(c) {
			this.detonating();
			this.draw(c);
			this.y -= this.velocity.y;
			this.x += this.velocity.x;
		}
	}

	/**end firework**/
	/**Spark**/
	class Spark {
		constructor(x, y, radius, color) {
			this.x = x;
			this.y = y;
			this.radius = radius / 2;
			this.color = color;
			this.velocity = {
				x: Math.random() * 3 - 1,
				y: Math.random() * 3 - 1,
			};
			this.friction = 0.015;
			this.life = 150;
		}
		draw(c) {
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			c.fillStyle = this.color;
			c.fill();
			c.closePath();
		}
		update(c) {
			this.velocity.y -= this.friction;
			this.life -= 1;
			this.y -= this.velocity.y;
			this.x += this.velocity.x;
			this.draw(c);
		}
	}

	/**end Spark**/

	function init() {
		if (FireWorkArray.length < config.number)
			FireWorkArray.push(new FireWork());
	}

	function animate() {
		window.requestAnimationFrame(animate);
		c.fillStyle = `rgba(0,0,0,${config.fill})`;
		c.fillRect(0, 0, canvas.width, canvas.height);

		FireWorkArray.forEach(function (fw, index) {
			fw.update(c);
			fw.life && FireWorkArray.splice(index, 1);
		});
		SparkArray.forEach(function (s, index) {
			s.life <= 0 && SparkArray.splice(index, 1);
			s.update(c);
		});
		init();
	}

	animate();
});
