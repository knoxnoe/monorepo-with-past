// vue.config.js
// const path = require('path')

module.exports = {
    // css: {
    //     loaderOptions: {
    //       stylus: {
    //         import: path.resolve(__dirname, '../src/styles/global.styl')
    //       },
    //     }
    // },
    // chainWebpack: config => {
    //     const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    //     types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
    // },
    // devServer: {
    //   proxy:{
    //     '/api': {
    //     target: 'http://editme.top:8000',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
}

// function addStyleResource (rule) {
//   rule.use('style-resource')
//     .loader('style-resources-loader')
//     .options({
//       patterns: [
//         path.resolve(__dirname, './src/styles/base.styl'),
//       ],
//     })
// }