import path from 'node:path'
import process from 'node:process'

function isTestFile(filePath) {
	return /\.test\.(?:ts|tsx|js|jsx)$/.test(filePath)
}

function isInTestsDir(filePath) {
	return filePath.includes('/__tests__/') || filePath.includes('\\__tests__\\')
}

export default {
	rules: {
		'enforce-structure': {
			meta: {
				type: 'problem',
				docs: {
					description:
						'Enforce test files to be in __tests__ folder with matching structure and naming',
				},
			},
			create(context) {
				const filename = context.getFilename()
				const projectRoot = process.cwd()
				const relativePath = path.relative(projectRoot, filename)

				if (!isTestFile(filename))
					return {}

				if (!isInTestsDir(filename)) {
					context.report({
						node: context.getSourceCode().ast,
						message:
							'❌ Test files must be in __tests__ folder. Example: src/module/__tests__/file.test.ts',
					})
					return {}
				}

				const srcIndex = relativePath.indexOf('src/')
				if (srcIndex === -1)
					return {}

				const pathInSrc = relativePath.slice(srcIndex + 4)
				const testDir = path.dirname(pathInSrc).replace(/\\/g, '/')
				const testFileName = path.basename(pathInSrc)

				if (!testDir.endsWith('__tests__')) {
					context.report({
						node: context.getSourceCode().ast,
						message: `❌ Test file must be directly in __tests__ folder. Current path: ${testDir}`,
					})
					return {}
				}

				const testBaseName = testFileName.replace(/\.test\.(ts|tsx|js|jsx)$/, '')
				const testExt = path.extname(testFileName)

				if (!testBaseName) {
					context.report({
						node: context.getSourceCode().ast,
						message: `❌ Test file name must follow pattern: <source-name>.test${testExt}. Current: ${testFileName}`,
					})
					return {}
				}

				if (testFileName !== `${testBaseName}.test${testExt}`) {
					context.report({
						node: context.getSourceCode().ast,
						message: `❌ Test file name must exactly match source file name + .test. Test: ${testFileName}, Expected: ${testBaseName}.test${testExt}`,
					})
				}

				return {}
			},
		},
	},
}
