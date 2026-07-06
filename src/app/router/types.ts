import type { RouteObject } from 'react-router-dom'

export interface PageModule {
	[key: string]: React.ComponentType | unknown
}

export interface PageConfig {
	path?: string
	index?: boolean
	element?: RouteObject['element']
	[key: string]: unknown
}

export interface PageRoute {
	path: string
	element: RouteObject['element']
	config?: PageConfig
}
