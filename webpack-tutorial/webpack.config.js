const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
    // エントリーポイント変更
    entry: "./source/index.js",


    // ファイルの出力場所
    output: {
        path: `${ __dirname }/dist`,
        filename: "main.js"
    },

    plugins: [
        new HtmlWebpackPlugin( { template: './source/index.html' } ),
    ],
};
