// Inspired by: http://neontapir.github.io/coding/professional/2014/01/15/bowling-game-kata-express-node-js/
import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app as game } from './game.mjs';

/** @param {number} expected */
async function assertScoreEquals(expected) {
	const res = await request(game).get('/score').expect(200);
	expect(res.body).toHaveProperty('score', expected);
}
/*
describe('root', () => {
	it('should return', async () => {
		await request(game).get('/').expect(200);
	});
});

describe('start', () => {
	beforeEach(async () => {
		await request(game).get('/start').expect(200);
	});

	it('should reset score to 0', async () => {
		return assertScoreEquals(0);
	});
});
*/
describe('score', () => {
	it('should return an object with :score', async () => {
		return assertScoreEquals(0);
	});
});
/*
describe('bowl/:pins', () => {
	beforeEach(async () => {
		await request(game).get('/start').expect(200);
	});

	it('should increment score by the number of pins', async () => {
		await request(game).get('/bowl/3').expect(200);
		return assertScoreEquals(3);
	});

	it('should increment score by the number of pins', async () => {
		await request(game).get('/bowl/7').expect(200);
		return assertScoreEquals(7);
	});
});
*/
// Helper functions
/** @param {number} pins */
/*function roll(pins) {
	request(game).post('/bowl/' + pins).end();
}*/

/**
 * @param {number} times
 * @param {number} pins
 */
/*function rollMany(times, pins) {
	for(let i = 0; i < times; i++) {
		roll(pins);
	}
}*/
/*
describe('in a game of bowling, ', () => {
	beforeEach(async () => {
		await request(game).get('/start').expect(200);
	});

	describe('gutter game', () => {
		it('should return 0', async () => {
			// I roll 20 gutter balls - hey, it can happen.
			rollMany(20,0);
			return assertScoreEquals(0);
		});
	});

	describe('single pin game', () => {
		it('should return 20', async () => {
			rollMany(20,1);
			return assertScoreEquals(20);
		});
	});

	describe('partial game, no closed frame', function() {
		it('should return 16', async () => {
			roll(4);
			roll(2); // This frame is 6
			roll(3);
			roll(5); // This frame is 8
			return assertScoreEquals(6 + 8);
		});
	});

	describe('one spare game', () => {
		it('should return 16', async () => {
			roll(4);
			roll(6); //spare
			roll(3);
			// rollMany(17,0);
			return assertScoreEquals(16);
		});
	});

	describe('one strike game', () => {
		it('should return 28', async () => {
			roll(10); //strike
			roll(6);
			roll(2);
			// rollMany(17,0);
			return assertScoreEquals(26);
		});
	});

	describe('perfect game', () => {
		it('should return 300', async () => {
			rollMany(12,10);
			return assertScoreEquals(300);
		});
	});
});
*/
