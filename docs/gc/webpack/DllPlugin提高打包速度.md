---
sidebarDepth: 2
---

# 性能优化之DllPlugin提高打包速度

## **DllPlugin** 是什么？

 在使用`webpack`进行打包时候，对于依赖的第三方库，比如`vue`，`vuex`等这些不会修改的依赖，我们可以让它和我们自己编写的代码分开打包，这样做的好处是每次更改我本地代码的文件的时候，`webpack`只需要打包我项目本身的文件代码，而不会再去编译第三方库，那么第三方库在第一次打包的时候只打包一次，以后只要我们不升级第三方包的时候，那么`webpack`就不会对这些库去打包，这样的可以快速的提高打包的速度。

因此为了解决这个问题，`DllPlugin` 和 `DllReferencePlugin`插件就产生了。（`webpack 4`已经将这两个插件内置）

**DLLPlugin** 这个插件是在一个额外独立的`webpack`设置中创建一个只有`dll`的`bundle`，也就是说我们在webpack配置目录下除了有`webpack.config.js`，还会新建一个`webpack.dll.config.js`文件。

`webpack.dll.config.js`作用是把所有的第三方库依赖打包到一个bundle的dll文件里面，还会生成一个名为 `manifest.json`文件。
该`manifest.json`的作用是用来让 `DllReferencePlugin` 映射到相关的依赖上去的。

**DllReferencePlugin** 这个插件是在`webpack.config.js`中使用的，该插件的作用是把刚刚在`webpack.dll.config.js`中打包生成的`dll`文件引用到需要的预编译的依赖上来。就是说在`webpack.dll.config.js`中打包后比如会生成 `vendor.dll.js`文件和`vendor-manifest.json`文件，`vendor.dll.js`文件包含所有的第三方库文件，`vendor-manifest.json`文件会包含所有库代码的一个索引，当在使用`webpack.config.js`文件打包`DllReferencePlugin`插件的时候，会使用该`DllReferencePlugin`插件读取`vendor-manifest.json`文件，看看是否有该第三方库。`vendor-manifest.json`文件就是有一个第三方库的一个映射而已。

## DllPlugin的作用？

`DllPlugin`和`DllReferencePlugin`提供分离包的方式可以大大提高构建时间性能。

主要思想在于，将一些不做修改的依赖文件，提前打包，这样我们开发代码发布的时候就不需要再对这部分代码进行打包。从而节省了打包时间。

## 配置DllPlugin

### 第一步，在`webpack`配置文件夹中添加`webpack.dll.config.js`文件

### 第二步，配置`webpack.dll.config.js`

**DllPlugin 插件有三个配置项参数如下：**
**context(可选)：** `manifest`文件中请求的上下文，默认为该`webpack`文件上下文。
**name:** 公开的`dll`函数的名称，和 `output.library`保持一致。
**path:** `manifest.json` 生成文件的位置和文件名称。

`webpack.dll.config.js`

```js
const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: {
    vendor: [
    'vue/dist/vue.esm.js',
    'vue-router',
    'vuex',
    'babel-polyfill' 
    ]
     //提前打包一些基本不怎么修改的文件
  },
  output: {
    path: path.join(__dirname, '../static/js'), //放在项目的static/js目录下面
    filename: '[name].dll.js', //打包文件的名字
    library: '[name]_library' //可选 暴露出的全局变量名
    // vendor.dll.js中暴露出的全局变量名。
    // 主要是给DllPlugin中的name使用，
    // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'), 
      //生成清单文件，放在当前build文件下面，这个看你自己想放哪里了。
      name: '[name]_library'
    }),  
    //压缩 只是为了包更小一点 
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console:true,
        drop_debugger:true
      },
      output:{
        // 去掉注释内容
        comments: false,
      },
      sourceMap: true
    })
  ]
};
```

### 第三步，配置`webpack.config.js`

**DllReferencePlugin项的参数有如下：**

**context:** manifest文件中请求的上下文。
**manifest:** 编译时的一个用于加载的`JSON`的manifest的绝对路径。
**context:** 请求到模块id的映射(默认值为 `manifest.content)`
**name:** `dll`暴露的地方的名称(默认值为`manifest.name`)
**scope:** `dll`中内容的前缀。
**sourceType:** `dll`是如何暴露的`libraryTarget`。

`webpack.config.js` 

```js
const path = require('path');
const webpack = require('webpack');
// 引入打包html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口文件
  entry: {
    main: './js/main.js'
  },
  output: {
    filename: '[name].js',
    // 将输出的文件都放在dist目录下
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]'
        }
      },
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'), // 排除文件
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    // new ClearWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './index.html' // 模版文件
    }),
    // 告诉webpack使用了哪些第三方库代码
    new webpack.DllReferencePlugin({
      manifest: require('./dist/vendor.manifest.json')
    })
  ]
};
```

### 第四部，将`vendor.dll.js`文件加入`index.html`中

有两种方法：

- 手动加入

  直接在`index.html`文件中加入

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Title</title>
  <link href="main.css" rel="stylesheet"></head>
  <body>
    <div id="app">22222</div>
    <div class="test1">12aaa</div>
    <div class='test2'>vvvvv</div>
  <script type="text/javascript" src="/static/js/verdor.dll.js"></script>
  </html>
  ```

- 通过插件加入

  安装`add-asset-html-webpack-plugin`插件

  ```bash
  npm i -D add-asset-html-webpack-plugin
  ```

  在`webpack.config.js`中加入以下代码

  ```js
   const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
      //这个主要是将生成的vendor.dll.js文件加上hash值插入到页面中。
      new AddAssetHtmlPlugin([{
        filepath: path.resolve(__dirname,'../dist/static/js/vendor.dll.js'),
        outputPath: utils.assetsPath('js'),
        publicPath: path.posix.join(config.build.assetsPublicPath, 'static/js'),
        includeSourcemap: false,
        hash: true,
      }]),
  ```

### 第五步，`package.json`中加入`npm run dll`命令

```json
{
    "scripts": {
        "dll"："webpack --config build/webpack.dll.config.js"
    }
}
```

:::tip

在执行`npm run build`之前，要确保是否存在`verdor.dll.js`文件。

如果没有，则要先执行`npm run dll`命令

:::