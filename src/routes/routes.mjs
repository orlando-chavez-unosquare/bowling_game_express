import express from 'express';
import { Bowling } from 'src/lib/bowling.mjs';

export const routes = express.Router();
let game = new Bowling();

routes.get('/', (req, res) => {
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
				// TODO: Find a way to test an error from express itself or the build process.
				//       This is only for completeness.
				/* c8 ignore next 1 */
				|| 'Unknown error.'
		});
	}
});

routes.get('/score', (_, res) => {
	res.send(game.getScore());
});
