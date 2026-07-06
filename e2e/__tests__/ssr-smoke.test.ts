import { expect, test } from '@playwright/test'

test.describe('SSR / hydration smoke', () => {
	test('home page renders server-side HTML', async ({ page }) => {
		await page.route('**/*.{js,mjs}', route => route.abort())

		await page.goto('/')

		await expect(page.locator('h1')).toContainText('Frontend starter')

		await expect(page.locator('text=SSR')).toBeVisible()
		await expect(page.locator('text=DI')).toBeVisible()
	})

	test('home page hydrates without console errors', async ({ page }) => {
		const errors: string[] = []
		page.on('pageerror', error => errors.push(error.message))

		await page.goto('/')

		await expect(page.locator('text=SSR-ready app shell')).toBeVisible({
			timeout: 10_000,
		})

		expect(errors.filter(m => !m.includes('ResizeObserver'))).toEqual([])
	})

	test('selection toggles after hydration', async ({ page }) => {
		await page.goto('/')

		await expect(page.locator('text=SSR-ready app shell')).toBeVisible({
			timeout: 10_000,
		})

		await expect(
			page.getByText('Nothing selected yet'),
		).toBeVisible()

		await page.locator('button:has-text("Select example")').first().click()

		await expect(
			page.getByText('Nothing selected yet'),
		).not.toBeVisible()
		await expect(
			page.getByText('SSR-ready app shell'),
		).toBeVisible()

		await expect(
			page.locator('button:has-text("Selected")'),
		).toBeVisible()
	})
})
