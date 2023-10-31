import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { routes } from './routes.mjs';
import express from 'express';

const game = express().use(routes);

/** @param {number} expected */
async function assertScoreEquals(expected) {
	const res = await request(game).get('/score').expect(200);
	expect(res.body).toHaveProperty('score', expected);
}

async function start() {
	await request(game).get('/start').expect(200);
}

/** @param {number} pins */
async function roll(pins) {
	await request(game).post('/bowl/' + pins).expect(200);
}

/**
 * @param {number} times
 * @param {number} pins
 */
async function rollMany(times, pins) {
	const promises = [];
	for(let i = 0; i < times; i++) {
		promises.push(roll(pins));
	}
	await Promise.allSettled(promises);
}

// must be the first test to prevent the other tests to start it.
describe('bowl/:pins without start', () => {
	it('should return "please start a new game"', async () => {
		const res = await request(game).post('/bowl/0').expect(500);
		expect(res.body).toHaveProperty('error', 'The game is over, please start a new game.');
	});
});

describe('start', () => {
	beforeEach(start);
	it('should reset score to 0', async () => assertScoreEquals(0));
});

describe('score', () => {
	beforeEach(start);
	it('should return an object with :score', async () => assertScoreEquals(0));
});

describe('bowl/:pins', () => {

	beforeEach(start);

	it('should increment score by the number of pins', async () => {
		await roll(3);
		return assertScoreEquals(3);
	});

	it('should increment score by the number of pins', async () => {
		await roll(7);
		return assertScoreEquals(7);
	});

	it('should return error with a excessive number of pins', async () => {
		const res = await request(game).post('/bowl/77').expect(500);
		expect(res.body).toHaveProperty('error', 'Bad pin number. Must be between 0 and 10.');
	});

	it('should return error with a bad number of pins left', async () => {
		await roll(7);
		const res = await request(game).post('/bowl/7').expect(500);
		expect(res.body).toHaveProperty('error', 'Bad pin number. You have 3 pins left to bowl.');
	});
});

describe('in a game of bowling, ', () => {

	beforeEach(start);

	describe('gutter game', () => {
		it('should return 0', async () => {
			// I roll 20 gutter balls - hey, it can happen.
			rollMany(20, 0);
			return assertScoreEquals(0);
		});
	});

	describe('single pin game', () => {
		it('should return 20', async () => {
			rollMany(20, 1);
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
			roll(6);
			return assertScoreEquals(16);
		});
	});

	describe('one strike game', () => {
		it('should return 28', async () => {
			roll(10); //strike
			roll(6);
			roll(2);
			return assertScoreEquals(26);
		});
	});

	describe('perfect game', () => {
		beforeEach(start);
		it('should return 300 and game over', async () => {
			rollMany(12,10);
			const res = await request(game).get('/score').expect(200);
			expect(res.body).toHaveProperty('score', 300);
			expect(res.body).toHaveProperty('gameover', true);
		});
	});

	describe('one extra ball', () => {
		beforeEach(start);
		it('should return 105', async () => {
			rollMany(20, 5);
			let res = await request(game).get('/score').expect(200);
			expect(res.body).toHaveProperty('score', 100);
			expect(res.body).toHaveProperty('extraGame', true);

			await roll(5);
			res = await request(game).get('/score').expect(200);
			expect(res.body).toHaveProperty('score', 105);
			expect(res.body).toHaveProperty('gameover', true);
		});
		it('should return 110', async () => {
			rollMany(20, 5);
			let res = await request(game).get('/score').expect(200);
			expect(res.body).toHaveProperty('score', 100);
			expect(res.body).toHaveProperty('extraGame', true);

			await roll(10);
			res = await request(game).get('/score').expect(200);
			expect(res.body).toHaveProperty('score', 110);
			expect(res.body).toHaveProperty('gameover', true);
		});
	});
});
