import { reatomComponent } from '@reatom/react'
import { TemplateItemListOptimized } from '@/entities/templateModule/ui/templateItemListOptimized.component'
import { useTemplateCatalogService } from '../templateCatalog.injector'
import { CatalogCard } from './catalogCard.component'

export const CatalogList = reatomComponent(() => {
	const {
		templateModuleStore: { items },
	} = useTemplateCatalogService()

	return (
		<TemplateItemListOptimized>
			{items.data().map(item => (
				<CatalogCard key={item.id} item={item} />
			))}
		</TemplateItemListOptimized>
	)
})
