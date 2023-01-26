const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const path = require( "path" );

const devMode = process.env.NODE_ENV !== "production";

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
                test: /\.(sa|sc|c)ss$/i, // 正規表現でまとめるとよい
                use: [
                    // オブジェクトにする必要がある
                    {
                        loader: MiniCssExtractPlugin.loader, // cssを別ファイルにする
                    },
                    {
                        loader: "css-loader",
                        options: {
                            // url: false,  // false : 画像などのurlは、cssに書いたままが出力される
                            // 特定の画像のみフィルタリングも可能
                            url: {
                                filter: ( url, resourcePath ) => {
                                    // `cat.png`のURLを処理しない
                                    if ( url.includes( "cat.jpg" ) ) {
                                        return false;
                                    }
                                    console.log( url )
                                    return true;
                                },
                            },
                            import: {
                                filter: ( url, media, resourcePath ) => {
                                    // resourcePath-cssファイルへのパス

                                    // `style.css`インポートを処理しません
                                    if ( url.includes( "style.css" ) ) {
                                        return false;
                                    }

                                    return true;
                                },
                            },
                            // module: false
                        },
                    },
                    "sass-loader" ]
                // buildが本番なら、cssをjsから抜き出すならこうする
                //  use: [
                //      devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                //     "css-loader",
                //     "sass-loader" ]

            },
            // {
            //     // scssをモジュールとして扱うために、css用のローダー
            //     test: /\.scss$/,
            //     use: [ "style-loader", "css-loader", "sass-loader" ]
            // },
            {
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
        } ),
        new MiniCssExtractPlugin( {
            filename: "style.css" // 出力する名前を入れないとエラー出る
        } )

    ],
};

// css-loaderドキュメント
// https://runebook.dev/ja/docs/webpack/loaders/css-loader
