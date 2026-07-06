import type { HttpHandler } from 'msw'
import { templateModuleHandlers } from '@/entities/templateModule/mocks/handlers'

/**
 * Central barrel for all MSW handlers.
 *
 * Each domain/feature module exports its own `xxxHandlers` array.
 * Add the import and spread it below — no merging logic, no giant file.
 *
 * @example
 * import { userHandlers } from '@/entities/user/mocks/handlers'
 * import { catalogHandlers } from '@/features/catalog/mocks/handlers'
 *
 * export const handlers: HttpHandler[] = [
 *   ...templateModuleHandlers,
 *   ...userHandlers,
 *   ...catalogHandlers,
 * ]
 */
export const handlers: HttpHandler[] = [
	...templateModuleHandlers,
]
