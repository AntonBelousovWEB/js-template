import type { Container } from '@needle-di/core'
import type { ComponentProps, ReactNode } from 'react'
import { MantineProvider } from '@mantine/core'
import { RouterProvider } from 'react-router-dom'
import { AppContainerProvider } from './container/container.provider'

export function AppProviders({
	container,
	children,
}: {
	container: Container
	children: ReactNode
}) {
	return (
		<AppContainerProvider container={container}>
			<MantineProvider defaultColorScheme="light">
				{children}
			</MantineProvider>
		</AppContainerProvider>
	)
}

export function App({
	router,
	container,
}: {
	router: ComponentProps<typeof RouterProvider>['router']
	container: Container
}) {
	return (
		<AppProviders container={container}>
			<RouterProvider router={router} />
		</AppProviders>
	)
}
