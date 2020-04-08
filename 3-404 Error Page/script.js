document.addEventListener("DOMContentLoaded", () => {
	let body = document.body;
	const arrayColor = [
		"#ffc370",
		"#fff5f2",
		"#00ffec",
		"#ffcc6f",
		"#49d6ff",
		"#c8d5ff",
	];
	setInterval(() => {
		createStar();
	}, 50);

	const createStar = () => {
		let color = Math.floor(Math.random() * 6);
		let top = Math.floor(Math.random() * screen.height);
		let right = Math.floor(Math.random() * 500);
		let star = document.createElement("div");
		star.classList.add("star");
		star.style.right = right + "px";
		star.style.top = top + "px";
		star.style.background = arrayColor[color];
		body.appendChild(star);

		const loopRun = setInterval(() => {
			if (right >= screen.width) {
				star.remove();
				clearInterval(loopRun);
			}
			runStar();
		}, 10);

		const runStar = () => {
			right += 3;
			star.style.right = right + "px";
		};
	};
});
