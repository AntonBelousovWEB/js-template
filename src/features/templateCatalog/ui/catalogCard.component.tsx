import type { TemplateItem } from '@/entities/templateModule/model/types'
import { TemplateItemCard } from '@/entities/templateModule/ui/templateItemCard.component'
import { useTemplateCatalogService } from '../templateCatalog.injector'

export function CatalogCard({ item }: { item: TemplateItem }) {
	const { templateModuleStore } = useTemplateCatalogService()

	return (
		<TemplateItemCard
			item={item}
			onToggleSelected={templateModuleStore.toggleSelected}
		/>
	)
}
