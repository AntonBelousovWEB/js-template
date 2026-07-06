import type { TemplateItemListProps } from './templateItemList.types'
import { SimpleGrid } from '@mantine/core'

export function TemplateItemList({
	items,
	renderItem,
}: TemplateItemListProps) {
	return (
		<SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md" mt="lg">
			{items.map(item => (
				<div key={item.id}>{renderItem(item)}</div>
			))}
		</SimpleGrid>
	)
}
