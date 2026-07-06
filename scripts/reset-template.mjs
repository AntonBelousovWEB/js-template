import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { basename, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const projectName = getProjectName()

const demoPaths = [
	'src/entities/templateModule',
	'src/features/templateCatalog',
	'src/shared/dto/templateItemDto.types.ts',
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
\t\t\t\t<Title order={1}>${toTitle(projectName)}</Title>
\t\t\t\t<Text c="dimmed">
\t\t\t\t\tThe starter example has been removed. Begin building your app here.
\t\t\t\t</Text>
\t\t\t</Stack>
\t\t</Container>
\t)
}
`,
)

await updatePackageJson()
await updatePackageLock()
await writeReadme()
await rm(resolve(root, 'scripts/reset-template.mjs'), { force: true })

console.log(`Template example removed for ${projectName}.`)
console.log('Start from src/pages/HomePage/home.page.tsx')

function getProjectName() {
	const nameIndex = process.argv.indexOf('--name')
	const explicitName = nameIndex >= 0 ? process.argv[nameIndex + 1] : null

	return sanitizePackageName(explicitName || basename(process.cwd()))
}

function sanitizePackageName(value) {
	return value
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9._-]+/g, '-')
		.replace(/^-+|-+$/g, '')
		|| 'new-project'
}

function toTitle(value) {
	return value
		.split(/[-_]/)
		.filter(Boolean)
		.map(part => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ')
}

async function readJson(path) {
	return JSON.parse(await readFile(path, 'utf-8'))
}

async function writeJson(path, value) {
	await writeFile(path, `${JSON.stringify(value, null, '\t')}\n`)
}

async function updatePackageJson() {
	const packageJsonPath = resolve(root, 'package.json')
	const packageJson = await readJson(packageJsonPath)

	packageJson.name = projectName
	delete packageJson.scripts['template:reset']

	await writeJson(packageJsonPath, packageJson)
}

async function updatePackageLock() {
	const packageLockPath = resolve(root, 'package-lock.json')
	const packageLock = await readJson(packageLockPath)

	packageLock.name = projectName
	if (packageLock.packages?.['']) {
		packageLock.packages[''].name = projectName
	}

	await writeJson(packageLockPath, packageLock)
}

async function writeReadme() {
	await writeFile(
		resolve(root, 'README.md'),
		`# ${toTitle(projectName)}

React application created from js-template.

## Scripts

- \`npm run dev\` - SSR dev server.
- \`npm run dev:spa\` - plain Vite SPA mode.
- \`npm run build\` - typecheck, client build, and SSR build.
- \`npm run preview\` - production SSR preview from \`dist\`.
- \`npm run test:run\` - run Vitest once.
- \`npm run lint\` - run ESLint.
`,
	)
}
