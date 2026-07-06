import type { Context } from 'react'
import { createContext, use } from 'react'

export function useStrictContext<T>(context: Context<T | null>): T {
	const value = use(context)

	if (value === null) {
		throw new Error('Empty context value')
	}

	return value
}

export const createStrictContext = <T>() => createContext<T | null>(null)

export function createDi<T>() {
	const injector = createStrictContext<T>()
	const useDi = () => useStrictContext(injector)

	return { Injector: injector.Provider, useDi }
}
