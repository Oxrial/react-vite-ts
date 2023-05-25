module.exports = {
    env: { browser: true, es2021: true, node: true },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module', parser: '@typescript-eslint/parser' },
    plugins: ['react-refresh', 'react-hooks', '@typescript-eslint', 'prettier'],
    rules: {
        'react-refresh/only-export-components': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-debugger': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_'
            }
        ],
        'no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_'
            }
        ],
        // 检查hook规则
        'react-hooks/rules-of-hooks': 'error',
        // 检查effect依赖
        'react-hooks/exhaustive-deps': 'warn',
        'prettier/prettier': [
            'warn',
            {
                endOfLine: 'auto',
                tabWidth: 4
            }
        ]
    }
}
