// Inspired by: http://neontapir.github.io/coding/professional/2014/01/15/bowling-game-kata-express-node-js/
import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app as game } from './game.mjs';

describe('root', () => {
	it('should return', async () => {
		await request(game).get('/').expect(200);
	});
});
