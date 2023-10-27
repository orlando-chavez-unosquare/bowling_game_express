import { unlinkSync, existsSync } from 'fs';
import { buildSync } from 'esbuild';

const isDev = process.env.NODE_ENV === 'dev';

try {
	const mapFile = './out/index.js.map';
	if (!isDev && existsSync(mapFile)) {
		unlinkSync(mapFile);
	}
	buildSync({
		entryPoints: [ './src/game.mjs' ],
		outfile: './out/game.js',
		target: 'node18.18.2',
		platform: 'node',
		bundle: true,
		treeShaking: true,
		minify: true,
		sourcemap: isDev,
		logLevel: 'info',
	});
}
catch (err) {
	console.error(err);
}
