import type { RenderResult } from './entry-server.types'
import { renderToString } from 'react-dom/server'
import {
	createStaticHandler,
	createStaticRouter,
	StaticRouterProvider,
} from 'react-router-dom/server'
import { AppProviders } from './app/app.component'
import { createAppContainer } from './app/container/container'
import { createRootRoutes } from './app/setupRouter'

function createRequest(url: string) {
	return new Request(`http://localhost${url}`)
}

export async function render(url: string): Promise<RenderResult | Response> {
	const routes = createRootRoutes()
	const handler = createStaticHandler(routes)
	const context = await handler.query(createRequest(url))

	if (context instanceof Response) {
		return context
	}

	const router = createStaticRouter(handler.dataRoutes, context)
	const container = createAppContainer()

	return {
		html: renderToString(
			<AppProviders container={container}>
				<StaticRouterProvider router={router} context={context} />
			</AppProviders>,
		),
		statusCode: context.statusCode,
		headers: {},
	}
}
