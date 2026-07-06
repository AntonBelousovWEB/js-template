import { mkdir, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))

const demoPaths = [
	'src/entities/templateModule',
	'src/features/templateCatalog',
]

for (const demoPath of demoPaths) {
	await rm(resolve(root, demoPath), { force: true, recursive: true })
}

const homePageDir = resolve(root, 'src/pages/HomePage')

await mkdir(homePageDir, { recursive: true })
await writeFile(
	resolve(homePageDir, 'home.page.tsx'),
	`import { Container, Stack, Text, Title } from '@mantine/core'

export function HomePage() {
\treturn (
\t\t<Container size="sm" py="xl">
\t\t\t<Stack gap="sm">
\t\t\t\t<Title order={1}>New project</Title>
\t\t\t\t<Text c="dimmed">
\t\t\t\t\tThe starter example has been removed. Begin building your app here.
\t\t\t\t</Text>
\t\t\t</Stack>
\t\t</Container>
\t)
}
`,
)

console.log('Template example removed. Start from src/pages/HomePage/home.page.tsx')
