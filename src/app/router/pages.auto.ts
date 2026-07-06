import type { RouteObject } from 'react-router-dom'
import type { PageModule, PageRoute } from './types'
import React from 'react'
import { pageRouteOverrides } from './pages.config'

const pageModules = import.meta.glob<PageModule>('../../pages/**/*.page.tsx', {
	eager: true,
})

function getPageComponent(module: PageModule): React.ComponentType | null {
	if (module.default && typeof module.default === 'function') {
		return module.default as React.ComponentType
	}

	const pageExport = Object.values(module).find(
		(exp): exp is React.ComponentType => {
			if (typeof exp !== 'function')
				return false
			const name = (exp as { name?: string }).name
			return Boolean(name?.endsWith('Page'))
		},
	)

	return pageExport || null
}

function extractPageName(filePath: string): string {
	const match = filePath.match(/\/(\w+Page)\//)
	return match?.[1] || ''
}

function toKebabCase(str: string): string {
	return str
		.replace(/([A-Z])/g, '-$1')
		.toLowerCase()
		.replace(/^-/, '')
}

function resolveRoutePath(pageName: string): string {
	const override = pageRouteOverrides[pageName]
	if (override?.path)
		return override.path
	if (override?.index)
		return '/'
	return `/${toKebabCase(pageName)}`
}

export function getAutoPages(): PageRoute[] {
	const pages: PageRoute[] = []

	for (const [filePath, module] of Object.entries(pageModules)) {
		const pageName = extractPageName(filePath)
		const component = getPageComponent(module)

		if (!component || !pageName)
			continue

		const override = pageRouteOverrides[pageName] ?? {}
		const isIndex = Boolean(override.index)

		pages.push({
			path: isIndex ? '/' : resolveRoutePath(pageName),
			element: React.createElement(component),
			config: { ...override, index: isIndex },
		})
	}

	return pages
}

export function createPageRoutes(): RouteObject[] {
	return getAutoPages().map(({ path, element, config }) => ({
		...(config?.index ? { index: true } : { path }),
		element,
		...config,
	}))
}
