// wepack 《 4.0
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin') // webpack 4.0以下版本的文件分割插件

module.exports = {
  // JavaScript 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        /**
         * Loader 编译的三种方式
         */
        // 给 Loader 传入属性的方式一： querystring
        // use: ['style-loader', 'css-loader?minimize'],
        // 给 Loader 传入属性的方式二： Object
        // use: [
        //   'style-loader',
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       minimize: true
        //     }
        //   }
        // ]
        // 方式三：指定对 ./main.css 这个文件先采用 css-loader 再采用 style-loader 转换:require('style-loader!css-loader?minimize!./main.css');
        // webpack 4.0以下版本的文件分割插件: 使用ExtractTextPlugin的方式
        use: ExtractTextPlugin.extract({
          use: ['css-loader?minimize'],
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      // 从 .js 文件中提取出来的 .css 文件的名称
      filename: `[name]_[contenthash:8].css`
    })
  ]
}
