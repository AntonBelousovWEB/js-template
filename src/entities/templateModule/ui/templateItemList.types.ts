import type { ComponentProps, ReactNode } from 'react'
import type { TemplateItem } from '../model/types'

export type TemplateItemListProps = {
	items: TemplateItem[]
	renderItem: (item: TemplateItem) => ReactNode
} & ComponentProps<'div'>
