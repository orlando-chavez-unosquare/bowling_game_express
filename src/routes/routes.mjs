import express from 'express';
import { Bowling } from 'src/lib/bowling.mjs';

export const routes = express.Router();

const game = new Bowling();

routes.get('/', (_, res) => {
	res.send({ game: 'Bowling' });
});

routes.get('/start', (_, res) => {
	res.send(game.start());
});

routes.post('/bowl/:pins', (req, res) => {
	try {
		const { pins } = req.params;
		const result = game.bowl(+pins);
		res.send(result);
	}
	catch (err) {
		res.status(500).send({
			error: err.message
				/* c8 ignore next 1 */
				|| 'Unknown error.'
		});
	}
});

routes.get('/score', (_, res) => {
	res.send(game.getScore());
});
