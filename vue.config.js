const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    port: 9000
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'production') { 
      config
        .plugin('uglify')
        .tap(([options]) =>{
          // 去除 console.log
          return [Object.assign(options, {
            uglifyOptions: { compress: {
              drop_console : true,
              pure_funcs: ['console.log']
            }}
          })]
        })
    }
  }
}