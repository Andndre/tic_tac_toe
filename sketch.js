let board;
let isOnWinningScreen;
let current;
let players;

function setup() {
	createCanvas(400, 400);
	players = ["X", "O"];
	current = players[0];
	isOnWinningScreen = false;
	board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];

	noLoop();
}

async function draw() {
	console.log("draw");
	if (isOnWinningScreen) {
		background(50);
	} else {
		background(255);
	}

	let w = width / 3;
	let h = height / 3;
	strokeWeight(4);

	line(0, 0, w * 3, 0);
	line(0, h * 3, w * 3, h * 3);
	line(w * 3, h * 3, w * 3, 0);
	line(0, 0, 0, h * 3);

	line(w, 0, w, height);
	line(w * 2, 0, w * 2, height);
	line(0, h, width, h);
	line(0, h * 2, width, h * 2);

	if (isOnWinningScreen) stroke(255);
	else stroke(0);

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			let x = w * j + w / 2;
			let y = h * i + h / 2;

			let spot = board[i][j];

			if (spot == players[0]) {
				let xr = w / 4;
				line(x - xr, y - xr, x + xr, y + xr);
				line(x - xr, y + xr, x + xr, y - xr);
			} else if (spot == players[1]) {
				noFill();
				ellipse(x, y, w / 1.7);
			}
		}
	}

	if (!isOnWinningScreen) {
		let winner = checkForWinner();
		if (winner != "") {
			resetGame(winner);
		} else {
			let isTied = true;
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					if (board[i][j] == "") {
						isTied = false;
						break;
					}
				}
			}
			if (isTied) {
				resetGame("");
			}
		}
	}
}

function mousePressed() {
	if (isOnWinningScreen) return;

	let y = -1;
	let x = -1;

	let w = width / 3;
	let h = height / 3;

	if (mouseY <= h) {
		y = 0;
		if (mouseX <= w) {
			x = 0;
		} else if (mouseX <= w * 2) {
			x = 1;
		} else if (mouseX <= w * 3) {
			x = 2;
		}
	} else if (mouseY <= h * 2) {
		y = 1;
		if (mouseX <= w) {
			x = 0;
		} else if (mouseX <= w * 2) {
			x = 1;
		} else if (mouseX <= w * 3) {
			x = 2;
		}
	} else if (mouseY <= h * 3) {
		y = 2;
		if (mouseX <= w) {
			x = 0;
		} else if (mouseX <= w * 2) {
			x = 1;
		} else if (mouseX <= w * 3) {
			x = 2;
		}
	}

	if (y != -1 && x != -1 && board[y][x] == "") {
		board[y][x] = current;
		switchPlayer();
	}
	draw();
}

function switchPlayer() {
	current = current == "X" ? "O" : "X";
}

async function resetGame(winner) {
	loop();
	isOnWinningScreen = true;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			await sleep(100);
			board[i][j] = winner;
		}
	}
	await sleep(1000);
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			board[i][j] = "";
		}
	}
	current = "X";
	isOnWinningScreen = false;
	noLoop();
	draw();
}

function checkForWinner() {
	let winner = "";

	// horizontal
	for (let i = 0; i < 3; i++) {
		let curr = board[i][0];
		if (curr != "") {
			if (curr == board[i][1] && curr == board[i][2]) {
				winner = curr;
			}
		}
	}

	// vertical
	if (winner == "") {
		for (let i = 0; i < 3; i++) {
			let curr = board[0][i];
			if (curr != "") {
				if (curr == board[1][i] && curr == board[2][i]) {
					winner = curr;
				}
			}
		}
	}

	// diagonal
	if (winner == "") {
		let curr = board[0][0];
		if (curr == board[1][1] && curr == board[2][2]) {
			winner = curr;
		}
		curr = board[0][2];
		if (curr == board[1][1] && curr == board[2][0]) {
			winner = curr;
		}
	}

	return winner;
}

function sleep(millisecondsDuration) {
	return new Promise((resolve) => {
		setTimeout(resolve, millisecondsDuration);
	});
}
