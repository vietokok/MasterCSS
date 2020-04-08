document.addEventListener("DOMContentLoaded", () => {
	var button = document.querySelector("button");
	var hover = true;
	const myFunction = (event) => {
		let ripple = document.createElement("div");
		ripple.classList.add("ripple");
		let x, y;
		x = event.clientX - button.offsetLeft;
		y = event.clientY - button.offsetTop;
		ripple.style.left = x + "px";
		ripple.style.top = y + "px";
		button.appendChild(ripple);
	};

	button.addEventListener("click", (event) => {
		myFunction(event);
	});

	button.addEventListener("mousemove", (event) => {
		if (hover) {
			hover = false;
			myFunction(event);
			setTimeout(() => {
				hover = true;
			}, 100);
		}
	});
});
