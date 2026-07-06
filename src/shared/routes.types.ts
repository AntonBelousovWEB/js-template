export const ROUTES = {
	HOME: {
		path: '/',
		label: 'Home',
	},
} as const

export const getRoutes = () => Object.values(ROUTES)

export type Route = (typeof ROUTES)[keyof typeof ROUTES]
