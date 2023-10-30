export class Bowling {

	#score = 0;

	#currFrame = 0;
	#currBall = 0;
	#currMaxPins = 10;
	#gameOver = true;

	/** @type {number[]} */
	#extraGameBalls = [];
	#extraGame = false;
	#maxExtraBalls = 0;

	/**
	 * Array of 10 elements (frame).
	 * Each element (frame) is an array of 3 elements [ball 1, ball 2, bonus balls].
	 * @type {number[][]}
	 */
	#board = [];

	start() {
		this.#score = 0;
		this.#currFrame = 0;
		this.#currBall = 0;
		this.#currMaxPins = 10;
		this.#board = [];
		this.#gameOver = false;
		this.#extraGame = false;
		this.#extraGameBalls = [];
		this.#maxExtraBalls = 0;
		for (let i = 0; i < 10; i++) {
			this.#board.push([0, 0, 0])
		}
		return {
			msg: "It's Time to Bowl! 🎳",
			score: 0,
			board: this.#board,
		}
	}

	/** @param {number} pins */
	#checkBonus(pins) {
		for (const frame of this.#board) {
			if (frame[2] !== 0) {
				frame[2] -= 1;
				this.#score += pins;
			}
		}
	}

	/** @param {number} pins */
	#playExtraGame(pins) {

		this.#checkBonus(pins);

		let msg = 'OK!';

		this.#extraGameBalls.push(pins);
		this.#currMaxPins -= pins;

		const allPinsDown = this.#currMaxPins === 0;
		const frameDone = this.#extraGameBalls.length >= this.#maxExtraBalls;

		if (this.#maxExtraBalls === 1) {
			this.#score += pins;
			msg = 'OK!';
		}
		else if (allPinsDown && frameDone) {
			msg = 'Spare!';
		}
		else if (allPinsDown && !frameDone) {
			msg = 'Strike!';
			this.#currMaxPins = 10;
		}

		if (frameDone) {
			this.#extraGame = false;
			this.#gameOver = true;
			if (this.#score === 300) {
				msg = 'Perfect Game!';
			}
		}

		return {
			score: this.#score,
			board: this.#board,
			gameover: this.#gameOver,
			message: msg,
			extraGame: this.#extraGameBalls,
		};
	}

	/** @param {number} pins */
	#playNormalGame(pins) {
		this.#checkBonus(pins);

		let msg = 'OK!';

		this.#score += pins;
		const frame = /** @type {number[]} */(this.#board[this.#currFrame])
		frame[this.#currBall] += pins;
		this.#currBall++;
		this.#currMaxPins -= pins;

		const allPinsDown = this.#currMaxPins === 0;
		const frameDone = this.#currBall > 1;

		if (allPinsDown && frameDone) {
			msg = 'Spare!';
			if (this.#currFrame === 9) {
				this.#extraGame = true;
				this.#maxExtraBalls = 1;
			}
		}
		else if (allPinsDown && !frameDone) {
			msg = 'Strike!';
			if (this.#currFrame === 9) {
				this.#extraGame = true;
				this.#maxExtraBalls = 2;
			}
			frame[this.#currBall] = 0;
			this.#currBall++;
			frame[2] = 2;
		}

		if (this.#currBall > 1) {
			this.#currMaxPins = 10;
			this.#currBall = 0;
			this.#currFrame++;

			if (this.#currFrame === 10 && !this.#extraGame) {
				this.#gameOver = true;
			}
		}

		return {
			score: this.#score,
			board: this.#board,
			gameover: this.#gameOver,
			message: msg,
			extraGame: this.#extraGame
		};
	}

	/** @param {number} pins */
	bowl(pins) {
		if (this.#gameOver) {
			throw new Error('The game is over, please start a new game.');
		}
		if (pins < 0 || pins > 10) {
			throw new Error('Bad pin number. Must be between 0 and 10.');
		}
		if (pins > this.#currMaxPins) {
			throw new Error(`Bad pin number. You have ${this.#currMaxPins} pins left to bowl.`);
		}

		if (this.#extraGame) {
			return this.#playExtraGame(pins);
		}
		return this.#playNormalGame(pins);
	}

	getScore() {
		return {
			score: this.#score,
			board: this.#board,
			gameover: this.#gameOver,
			extraGame: this.#extraGame,
		};
	}
}
