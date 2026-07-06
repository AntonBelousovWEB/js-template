import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
	// Uncomment when API contracts are defined and MSW handlers are registered:
	// test: {
	// 	setupFiles: ['./src/shared/api/mocks/setup.ts'],
	// },
	plugins: [
		react({
			babel: {
				plugins: [
					['@babel/plugin-proposal-decorators', { version: '2023-11' }],
				],
			},
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})
