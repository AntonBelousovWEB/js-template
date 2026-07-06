import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import { BaseLayout } from './baseLayout.component'
import { createPageRoutes } from './router/pages.auto'

export function createRootRoutes(): RouteObject[] {
	return [
		{
			element: <BaseLayout />,
			children: createPageRoutes(),
		},
	]
}

export function setupRouter() {
	return createBrowserRouter(createRootRoutes())
}
