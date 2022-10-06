// vue.config.js
const path = require('path')
//path.resolve('./dist')

const vueConfig = {
  publicPath: process.env.NODE_ENV === 'production' ? './dist' : '/', // 基本路径-引用文件的路径
  outputDir: 'dist', // 输出文件目录
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  configureWebpack: config => {
    config.resolve = {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@v': path.resolve(__dirname, './src/views')
      }
    }
  },
  chainWebpack: config => {
    // config.module
    //   .rule('md')
    //   .test(/\.md$/)
    //   .use('vue-loader')
    //   .loader('vue-loader')
    //   .end()
    //   .use('vue-markdown-loader')
    //   .loader('vue-markdown-loader/lib/markdown-compiler')
    //   .options({
    //     raw: true
    //   })

    config.module
      .rule('md')
      .test(/\.md$/)
      .use('html-loader')
      .loader('html-loader')
      .end()
      .use('markdown-loader')
      .loader('markdown-loader')
      .options({
      })
    // config.module
    //   .rule('md')
    //   .test(/\.md$/)
    //   .use('text-loader')
    //   .loader('text-loader')
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  // css相关配置
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {
      css: {}, // 这里的选项会传递给 css-loader
      postcss: {} // 这里的选项会传递给 postcss-loader
    }, // css预设器配置项 详见https://cli.vuejs.org/zh/config/#css-loaderoptions
    modules: false // 启用 CSS modules for all css / pre-processor files.
  },
  // parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: {}, // PWA 插件相关配置 see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  //webpack-dev-server 相关配置
  // devServer: {
  //     // pen: process.platform === 'darwin',
  //     // host: '0.0.0.0', // 允许外部ip访问
  //     port: 8080, // 端口
  //     https: false, // 启用https
  //     overlay: {
  //         warnings: true,
  //         errors: true
  //     }, // 错误、警告在页面弹出
  //     proxy: {
  //         '/py': {
  //             target: 'http://106.15.5.66/',
  //             changeOrigin: true, // 允许websockets跨域
  //             // ws: true,
  //             pathRewrite: {
  //                 '^/py': ''
  //             }
  //         }
  //     } // 代理转发配置，用于调试环境
  // },
  // 第三方插件配置
  pluginOptions: {}
}

module.exports = vueConfig