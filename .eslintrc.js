module.exports = {
    env: {
        node: true,
        browser: true,
        es2021: true
    },
    extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.eslint.json'
    },
    plugins: ['react', '@typescript-eslint', 'promise', 'unicorn'],
    rules: {
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'warn',
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/lines-between-class-members': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/require-await': 'off',

        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        'react/function-component-definition': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/no-array-index-key': 'off',
        'react/static-property-placement': ['error', 'static public field'],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'import/no-cycle': 'warn',

        'array-callback-return': ['error', { allowImplicit: true }],
        'no-useless-return': 'off',
        'no-promise-executor-return': 'off',
        'no-await-in-loop': 'off',
        'import/no-unresolved': 'error',
        camelcase: 'off',
        'no-underscore-dangle': 'off',
        'no-bitwise': 'off',
        'no-constant-condition': 'off',
        'no-prototype-builtins': 'off',
        'linebreak-style': 'off',
        'comma-dangle': ['error', 'never'],
        indent: 'off',
        'arrow-parens': ['error', 'as-needed'],
        'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
        curly: 'off',
        'nonblock-statement-body-position': 'off',
        'no-restricted-syntax': 'off',
        'no-continue': 'off',
        'class-methods-use-this': 'off',
        'object-curly-newline': 'off',
        'prefer-destructuring': ['error', { object: true, array: false }],
        'max-classes-per-file': 'off',
        'default-case': 'off',
        'no-param-reassign': 'off',
        'no-plusplus': 'off',
        'consistent-return': 'off',
        'guard-for-in': 'off',
        'unicorn/prefer-module': 'off',
        'unicorn/no-null': 'off',
        'unicorn/no-process-exit': 'off',
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/filename-case': 'off',
        'unicorn/prefer-ternary': 'off',
        'unicorn/consistent-function-scoping': 'off',
        'unicorn/catch-error-name': 'off',
        'unicorn/no-static-only-class': 'off',
        'unicorn/prefer-spread': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/prefer-math-trunc': 'off',
        'unicorn/prefer-object-from-entries': 'off',
        'unicorn/consistent-destructuring': 'off',
        'unicorn/no-for-loop': 'off',
        'unicorn/no-array-for-each': 'off',
        'unicorn/empty-brace-spaces': 'off',
        'unicorn/prefer-query-selector': 'off',
        'unicorn/prefer-dom-node-append': 'off',
        'unicorn/prefer-dom-node-remove': 'off',
        'unicorn/prefer-string-slice': 'off',
        'unicorn/no-array-callback-reference': 'off',
        'sonarjs/no-duplicate-string': 'off',
        'sonarjs/cognitive-complexity': 'off',
        'sonarjs/no-nested-template-literals': 'off'
    },
    settings: {
        react: {
            version: 'detect'
        },
        'import/resolver': {
            node: {
                paths: ['src', 'components'],
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    }
};
