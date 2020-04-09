document.addEventListener("DOMContentLoaded", () => {
	var progressBar = document.querySelectorAll(".progress-bar");
	var button = document.querySelector("button");
	const TIME_TO_RUN = 1000;

	function calculateTime(time, dataCount) {
		return time / dataCount;
	}

	function changeColor(count, lineCount) {
		if (count <= 25) {
			lineCount.style.background = "red";
		} else if (count > 25 && count <= 50) {
			lineCount.style.background = "orange";
		} else if (count > 50 && count <= 75) {
			lineCount.style.background = "blue";
		} else {
			lineCount.style.background = "green";
		}
	}

	button.addEventListener("click", () => {
		progressBar.forEach((item) => {
			let count = 0;
			let label = item.children[0];
			let line = item.children[1];

			let dataCount = label.getAttribute("data-count");
			let lineCount = line.children[0];
			let runTime = calculateTime(TIME_TO_RUN, dataCount);
			let run = setInterval(() => {
				if (count + 1 >= dataCount) {
					clearInterval(run);
				}
				count++;
				label.innerHTML = count + "%";
				lineCount.style.width = count + "%";
				changeColor(count, lineCount);
			}, runTime);
		});
	});
});
