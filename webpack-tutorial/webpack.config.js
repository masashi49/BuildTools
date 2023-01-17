const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const path = require( "path" );

module.exports = {
    // エントリーポイント変更
    entry: "./source/index.js",

    // ファイルの出力場所
    output: {
        // __dirnameはルートパスがかえる
        //path.resolve()は絶対パスを返す ので、OSによる挙動の違いを予防する
        path: `${ __dirname }/dist`, // ルートディレクトリ/dist をみてね
        // path: path.resolve(__dirname,"build")でも同じ。

        filename: "[name].js", //の名前で出力してね
    },


    mode: "development", // 開発モード

    devServer: {
        static: "dist",
        open: true // 自動的にブラウザが立ち上がる
    },

    module: {
        rules: [
            {
                // cssをモジュールとして扱うために、css用のローダー
                test: /\.css$/,
                //use: [ "css-loader", "style-loader" ] // この並び順じゃないと動かない！ローダーは上から、左からロードされる。
                use: [ {
                    loader: "style-loader",
                    options: { injectType: "lazySingletonStyleTag" },
                }, "css-loader",
                    "sass-loader" ]
                ,
            },
            {
                // scssをモジュールとして扱うために、css用のローダー
                test: /\.scss$/,
                use: [ "style-loader", "css-loader", "sass-loader" ]
            }, {
                //最新のjs用のローダー 
                // babelはjsコンパイラおよびトランスパイラ
                test: /\.js$/,
                use: [ "babel-loader" ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'initial',
        }
    },
    plugins: [
        new HtmlWebpackPlugin( {
            template: path.resolve( __dirname, "source", "index.html" )
        } ) ],
};
