import { Alert, Box, Loader, Stack, Text } from '@mantine/core'
import { reatomComponent } from '@reatom/react'
import { useTemplateCatalogService } from './templateCatalog.injector'
import { CatalogInput } from './ui/catalogInput.component'
import { CatalogList } from './ui/catalogList.component'

export const TemplateCatalogEntry = reatomComponent(() => {
	const {
		templateModuleStore: { items },
	} = useTemplateCatalogService()

	return (
		<Stack gap="md">
			<CatalogInput />

			{!items.ready() && (
				<Box ta="center" py="lg">
					<Loader />
				</Box>
			)}

			{items.data().length > 0 && items.ready() && <CatalogList />}

			{items.data().length === 0 && items.ready() && (
				<Alert color="gray" variant="light">
					<Text size="sm">
						No template blocks found. Try another search query.
					</Text>
				</Alert>
			)}
		</Stack>
	)
})
