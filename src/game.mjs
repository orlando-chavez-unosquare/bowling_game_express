import express from 'express';
export const app = express(); // exports app for testing framework

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
	console.log(`Listening on http://${HOST}:${PORT}`);
});

let score = 0;

app.get('/score', (req, res) => {
	res.send({ score: score });
});
