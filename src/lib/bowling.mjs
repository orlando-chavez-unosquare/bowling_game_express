const MAX_PINS = 10;
const BONUS_POS = 2;
const LAST_FRAME = 9;
const MAX_SCORE = 300;

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
		this.#currMaxPins = MAX_PINS;
		this.#gameOver = false;
		this.#extraGame = false;
		this.#extraGameBalls = [];
		this.#maxExtraBalls = 0;
		this.#board = [];
		for (let i = 0; i <= LAST_FRAME; i++) {
			this.#board.push([0, 0, 0])
		}
		return {
			msg: "It's Time to Bowl! 🎳",
			score: 0,
			board: this.#board,
		}
	}

	/** @param {number} pins */
	#checkBonuses(pins) {
		for (const frame of this.#board) {
			if (frame[BONUS_POS] !== 0) {
				frame[BONUS_POS] -= 1;
				this.#score += pins;
			}
		}
	}

	/** @param {number} pins */
	#playExtraGame(pins) {

		this.#checkBonuses(pins);

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
			this.#currMaxPins = MAX_PINS;
		}

		if (frameDone) {
			this.#extraGame = false;
			this.#gameOver = true;
			if (this.#score === MAX_SCORE) msg = 'Perfect Game!';
		}

		return {
			score: this.#score,
			board: this.#board,
			gameover: this.#gameOver,
			message: msg,
			extraGame: this.#extraGameBalls,
		};
	}

	/** @param {number} maxBalls */
	#checkExtraGame(maxBalls) {
		if (this.#currFrame === LAST_FRAME) {
			this.#extraGame = true;
			this.#maxExtraBalls = maxBalls;
		}
	}

	#checkGameOver() {
		if (this.#currFrame > LAST_FRAME && !this.#extraGame) {
			this.#gameOver = true;
		}
	}

	/** @param {number} pins */
	#playNormalGame(pins) {
		this.#checkBonuses(pins);

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
			this.#checkExtraGame(1);
		}
		else if (allPinsDown && !frameDone) {
			msg = 'Strike!';
			this.#checkExtraGame(2);
			frame[BONUS_POS] = 2;
			// skip next ball
			frame[this.#currBall] = 0;
			this.#currBall++;
		}

		if (this.#currBall > 1) { // if time to play next frame
			this.#currMaxPins = MAX_PINS;
			this.#currBall = 0;
			this.#currFrame++;
			this.#checkGameOver();
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
		if (pins < 0 || pins > MAX_PINS) {
			throw new Error(`Bad pin number. Must be between 0 and ${MAX_PINS}.`);
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
