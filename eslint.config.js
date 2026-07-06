import antfu from '@antfu/eslint-config'
import testStructure from './eslint-plugin-test-structure.js'

export default antfu(
	{
		react: true,
		typescript: true,
		stylistic: {
			indent: 'tab',
			quotes: 'single',
			semi: false,
		},
		formatters: {
			html: true,
			css: true,
		},
		rules: {
			'no-console': ['error', { allow: ['log', 'error'] }],

			'no-restricted-syntax': [
				'error',
				{
					selector: 'TSTypeAliasDeclaration',
					message:
						'❌ Type aliases запрещены в основном коде — держите их только в *.types.ts / types.tsx',
				},
				{
					selector: 'TSInterfaceDeclaration',
					message:
						'❌ Interfaces запрещены в основном коде — держите их только в *.types.ts / types.tsx',
				},
			],
		},
	},
	{
		files: [
			'**/*.types.ts',
			'**/*.types.tsx',
			'**/types.ts',
			'**/types.tsx',
			'**/*.dto.types.ts',
			'**/*.dto.types.tsx',
			'**/routes.types.ts',
			'**/routes.types.tsx',
		],
		rules: {
			'no-restricted-syntax': 'off',
		},
	},
	{
		plugins: {
			'test-structure': testStructure,
		},
		files: ['**/*.test.ts', '**/*.test.tsx'],
		rules: {
			'test-structure/enforce-structure': 'error',
		},
	},
)
