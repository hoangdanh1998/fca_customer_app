module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    // .eslintrc.js
    "plugins": ['eslint-plugin-import-helpers'],
    "rules": {
        'no-unused-vars': 1,
        'no-use-before-define': 1,
        'import-helpers/order-imports': [
            'warn',
            { // example configuration
                newlinesBetween: 'always',
                groups: ['/^(assert|async_hooks|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|http2|https|inspector|module|net|os|path|perf_hooks|process|punycode|querystring|readline|repl|stream|string_decoder|timers|tls|trace_events|tty|url|util|v8|vm|zli)/',
                    'sibling',],
                alphabetize: { 'order': 'asc', 'ignoreCase': true },
            },
        ],
        }
}
