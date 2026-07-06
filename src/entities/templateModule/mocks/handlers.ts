import type { HttpHandler } from 'msw'

/**
 * Example domain-level MSW handlers for templateModule.
 *
 * When real API contracts appear, replace this with actual handlers:
 *
 * @example
 * import { http, HttpResponse } from 'msw'
 *
 * export const templateModuleHandlers: HttpHandler[] = [
 *   http.get('/api/templates', () => HttpResponse.json({ items: [...] })),
 *   http.post('/api/templates/:id/select', () => HttpResponse.json({ ok: true })),
 * ]
 */
export const templateModuleHandlers: HttpHandler[] = []
