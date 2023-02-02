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
                            modules: {
                                // auto : 読ませたいcssファイルを選べる。
                                // resourcePathにはcssファイルの絶対パスが入っている 一致するものはtrue
                                auto: ( resourcePath ) => resourcePath.endsWith( ".css" ),

                                // cssファアイルに記述されているcssをhash化する方法を選べる 
                                // local = .hoge と、: local{.hugaa { color: green; }}をhash化
                                // global = :local{.hugaa { color: green; }}だけをhash化 globalの方が話かかりやすい気がする
                                mode: 'global',
                                getLocalIdent: ( context, localIdentName, localName, options ) => {
                                    console.log( 333333 )
                                    console.log( context )
                                    console.log( 44444444 )
                                    console.log( localIdentName ) // デフオルトでは [hash:base64]
                                    console.log( 55555 )
                                    console.log( localName ) // :localに指定されている(スコープされている)名前が入る
                                    console.log( 6666666 )
                                    console.log( options )

                                    if ( localName === 'aoi' ) { // 特定のclass名をカスタマイズ
                                        return "kuroi"
                                    }

                                    return "whatever_random_class_name";
                                },
                                // localIdentHashFunction: "md4",
                                localIdentHashDigest: "base64",
                                localIdentHashDigestLength: 5, // hash値の長さ
                                hashStrategy: "minimal-subset", //ハッシュから識別子名を省略できるか自動検出
                            },
                            // url: false,  // false : 画像などのurlは、cssに書いたままが出力される
                            // 特定の画像のみフィルタリングも可能
                            url: {
                                filter: ( url, resourcePath ) => {
                                    // `cat.png`のURLを処理しない
                                    if ( url.includes( "cat.jpg" ) ) {
                                        return false;
                                    }
                                    console.log( 000000000 )
                                    console.log( url )
                                    return true;
                                },
                            },
                            import: {
                                filter: ( url, media, resourcePath ) => {
                                    // resourcePath-cssファイルへのパス

                                    // `style.css`インポートを処理しません
                                    // if ( url.includes( "kuma.css" ) ) {
                                    //     return false;
                                    // }
                                    console.log( 111111 )
                                    console.log( url ) // @import されたものが入っている
                                    console.log( 2222222 )
                                    console.log( resourcePath )// scssのファイルの絶対パスが入っている
                                    return true;
                                },
                            },

                        },
                    },
                    "sass-loader" ],
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
