import { setupServer } from 'msw/node'
import { handlers } from './handlers'

/**
 * MSW server instance for Node.js test environments (Vitest).
 *
 * Setup in vitest via setupFiles or per-test:
 *
 * @example
 * // vitest.config.ts setupFiles
 * import { server } from '@/shared/api/mocks/server'
 * beforeAll(() => server.listen())
 * afterEach(() => server.resetHandlers())
 * afterAll(() => server.close())
 *
 * @example
 * // Per-test override
 * import { http, HttpResponse } from 'msw'
 * import { server } from '@/shared/api/mocks/server'
 *
 * server.use(
 *   http.get('/api/templates', () => HttpResponse.json({ items: [] }))
 * )
 */
export const server = setupServer(...handlers)
