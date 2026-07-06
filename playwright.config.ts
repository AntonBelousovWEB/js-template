import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
	testDir: './e2e/__tests__',
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 1 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: process.env.CI ? 'github' : 'list',
	timeout: 30_000,

	use: {
		baseURL: 'http://localhost:5173',
		trace: 'on-first-retry',
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],

	webServer: {
		command: 'npm run build && npm run preview',
		port: 5173,
		reuseExistingServer: !process.env.CI,
		timeout: 60_000,
	},
})
