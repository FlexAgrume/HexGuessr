const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const cssLoaders = [
    {
        loader: 'css-loader',
        options: { importLoaders: 1 },
    },
    {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: [
                    'postcss-preset-env',
                ],
            },
        },
    },
    'sass-loader',
];

module.exports = (env) => {
    const nodeEnv = env.production;

    const plugins = [
        new MiniCssExtractPlugin({
            filename: nodeEnv ? 'styles.[contenthash].css' : 'styles.css',
            chunkFilename: nodeEnv ? '[id].[contenthash].css' : '[id].css',
        }),
    ];

    return {
        mode: nodeEnv ? 'production' : 'development',
        target: 'browserslist',
        devtool: nodeEnv ? 'source-map' : 'eval-source-map',
        watch: nodeEnv ? false : true,
        entry: './src/index.js',
        output: {
            filename: 'app.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        plugins,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        }
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        ...cssLoaders,
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: "asset/resource",
                    generator: {
                        filename: 'images/[hash][ext][query]'
                    }
                },
                {
                    test: /\.(eot|ttf|woff|woff2)$/i,
                    type: "asset/resource",
                    generator: {
                        filename: 'fonts/[hash][ext][query]'
                    }
                }
            ],
        },
    };
};