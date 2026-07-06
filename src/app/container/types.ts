import type { Container } from '@needle-di/core'

export type ProviderFn = (container: Container) => void

export interface ProviderModule {
	provider?: ProviderFn
	[key: string]: unknown
}
