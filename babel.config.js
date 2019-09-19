module.exports = {
    env: {
        production: {
            plugins: [
                '@babel/plugin-syntax-dynamic-import',
            ],
            presets: [
                [
                    '@babel/preset-env',
                    {
                        useBuiltIns: 'entry',
                        corejs: {
                            version: 3,
                            proposals: true,
                        },
                    },
                ],
                [
                    '@babel/preset-react',
                    {
                        useBuiltIns: true,
                    },
                ],
            ],
        },
        development: {
            plugins: [
                '@babel/plugin-syntax-dynamic-import',
            ],
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: false,
                        useBuiltIns: 'entry',
                        corejs: {
                            version: 3,
                            proposals: true,
                        },
                    },
                ],
                [
                    '@babel/preset-react',
                    {
                        useBuiltIns: true,
                    },
                ],
            ],
        },
        test: {
            plugins: [
                '@babel/plugin-syntax-dynamic-import',
            ],
            presets: [
                [
                    '@babel/preset-env',
                    {
                        useBuiltIns: 'entry',
                        corejs: {
                            version: 3,
                            proposals: true,
                        },
                    },
                ],
                [
                    '@babel/preset-react',
                    {
                        useBuiltIns: true,
                    },
                ],
            ],
        },
    },
    ignore: [
        '__storage__',
        'build',
        'docs',
        'externals',
        'node_modules',
    ],
}
