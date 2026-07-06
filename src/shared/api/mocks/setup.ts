import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from './server'

/**
 * Vitest setup for MSW.
 *
 * Import in vitest.config.ts → test.setupFiles:
 *   './src/shared/api/mocks/setup.ts'
 *
 * This starts MSW before all tests, resets handlers between tests,
 * and closes it after all tests finish.
 */
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
