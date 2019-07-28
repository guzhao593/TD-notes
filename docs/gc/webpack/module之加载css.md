---
sidebarDepth: 2
---

# module之加载css

## 编译css文件

为了从 `JavaScript` 模块中 `import` 一个 `CSS` 文件，你需要在 `module` 配置中 安装并添加 `style-loader` 和 `css-loader`：

```bash
npm install --save-dev style-loader css-loader
```

`webpack.config.js`

```js
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'
+         ]
+       }
+     ]
+   }
  };
```

## 编译sass

首先安装`sass-loader`插件：

```bash
npm i -D sass-loader
```

`webpack.config.js`

```js
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
   module: {
     rules: [
       {
+        test: /\.(css|scss)$/,
         use: [
          'style-loader',
          'css-loader',
+      	  'sass-loader'
         ]
       }
     ]
   }
 };
```

## 加入postcss插件

首先，安装`postcss-loader`

```bash
npm i -D postcss-loader
```

其次，根据需求安装`postcss`插件

例如，自动添加`css`前缀

```bash
npm i -D autoprefixer
```

`webpack.config.js`

```js
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
   module: {
     rules: [
       {
        test: /\.(css|scss)$/,
         use: [
          'style-loader',
          'css-loader',
+          {
+              loader: 'postcss-loader',
+              options: {
+                ident: 'postcss',
+                plugins: [
+                  'autoprefixer'
+                ]
+              }
+          },
           // 注意：postcss-loader一定要在css-loader之后，预处理器之前
       	  'sass-loader'
         ]
       }
     ]
   }
 };
```

## 提取css文件

当项目越来越大的时候，`css`文件也会越来越多，这时候就需要将`css`提取出来。

### mini-css-extract-plugin

首先，安装插件

```bash
npm i -D mini-css-extract-plugin
```

其次，配置`webpack`

`webpack.config.js`

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      // 类似 webpackOptions.output里面的配置 可以忽略
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // 替换掉sass-loader
            // 而且最新版本支持HMR，所以不需要再区分环境
            options: {
              // 这里可以指定一个 publicPath
              // 默认使用 webpackOptions.output中的publicPath
              publicPath: './'
            },
          },
          'css-loader',
        ]
      }
    ]
  }
}
```

#### 高级配置

将所有的`CSS`提取到一个文件中

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    // 使用 optimization.splitChunks.cacheGroups 将css提取到一个CSS中
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  }
}
```