import type { ProviderFn, ProviderModule } from './types'
import { Container } from '@needle-di/core'

const providerModules = import.meta.glob<ProviderModule>([
	'../../entities/**/*.provider.ts',
	'../../features/**/*.provider.ts',
	'../../shared/**/*.provider.ts',
], {
	eager: true,
})

function isProviderFn(fn: unknown): fn is ProviderFn {
	return typeof fn === 'function' && fn.length === 1
}

export function createAppContainer() {
	const container = new Container()

	Object.entries(providerModules).forEach(([modulePath, module]) => {
		if ('provider' in module && isProviderFn(module.provider)) {
			module.provider(container)
		}
		else {
			console.log(`[DI] Skipped invalid provider module: ${modulePath}`)
		}
	})

	return container
}
