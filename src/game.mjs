import express from 'express';
import { routes } from './routes/routes.mjs';

export const app = express(); // exports app for testing framework

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(routes);

app.listen(PORT, HOST, () => {
	console.log(`Listening on http://${HOST}:${PORT}`);
});
