import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'node',
		coverage: {
			reporter: [ 'lcov', 'text', 'text-summary' ],
			reportsDirectory: '.coverage'
		},
		exclude: [
			'node_modules/**'
		]
	}
});