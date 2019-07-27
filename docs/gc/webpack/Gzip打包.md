---
sidebarDepth: 2
---

# 性能优化之Gzip打包

## 什么是GZIP ？

`gzip`是`GNUzip`的缩写，它是一个`GNU`自由软件的文件压缩程序。它是`Jean-loupGailly`和`MarkAdler`一起开发的。

### 压缩原理

`Gzip` 压缩背后的原理，是在一个文本文件中找出一些重复出现的字符串、临时替换它们，从而使整个文件变小。

根据这个原理，文件中代码的重复率越高，那么压缩的效率就越高，使用 `Gzip` 的收益也就越大。反之亦然。

### 文件格式

```bash
[filename].gz
```

### Gzip 的优点

减少文件大小。`gzip`压缩比率在3到10倍左右，可以大大节省服务器的网络带宽。

**减少文件大小有两个明显的好处：**

1. 是可以减少存储空间

2. 是通过网络传输文件时，可以减少传输的时间

对于带宽较低的服务器是一种利好，开启后可以加快我们网站的打开速度，原理是经过服务器压缩，客户端浏览器快速解压的原理，可以大大减少了网站的流量。

### Gzip 的缺点

1. 开启`gzip`后会额外的增加很多`cpu`的开销，会对服务器产生一起压力，同时，客户端解压也需要`cpu`开销（不过客户端还好），这也是不建议把压缩率设置太高的原因。
2. 对图片的压缩支持不太好，会出现体积变大或图片失真的问题。

## 如何开启Gzip？

### 两个先行条件

要开启`Gzip`，需要先满足两个条件：

- 服务器支持并开启`Gzip`压缩服务

  目前大多数的服务器都支持`Gzip`压缩服务，比如`Nginx`、`IIS`、`Apache`、`tomcat`等，只不过设置不同而已。

- 客户端（浏览器）支持`Gzip`解压服务

  目前主流的浏览器都支持`Gzip`解压服务。

### 判断是否已开启Gzip服务？

通过查看`HTTP`请求来判断：

如果服务器开启了`Gzip`压缩服务，`HTTP`的响应头就会出现：

```bash
Content-Encoding: gzip
```

如果客户端支持Gzip解压服务，`HTTP`的响应头就会出现：

```bash
Accept-Encoding：gzip
```

### Nginx中开启Gzip

#### 配置属性

- **gzip on;**
  `on`为启用，`off`为关闭

- **gzip_min_length 1k;**
   设置允许压缩的页面最小字节数，页面字节数从`header`头中的`Content-Length`中进行获取。默认值是0，不管页面多大都压缩。建议设置成大于1k的字节数，小于1k可能会越压越大。

- **gzip_buffers 4 16k;**
  获取多少内存用于缓存压缩结果，`4 16k`表示以`16k*4`为单位获得，默认 4 8k

- **gzip_proxied any;**
  `nginx`做为反向代理时启用

  `off`(关闭所有代理结果的数据的压缩),

  `expired(`启用压缩,如果`header`头中包括"`Expires`"头信息),

  `no-cache`(启用压缩,`header`头中包含"`Cache-Control:no-cache`"),

  `no-store`(启用压缩,`header`头中包含"`Cache-Control:no-store`"),

  `private`(启用压缩,`header`头中包含"`Cache-Control:private`"),

  `no_last_modefied`(启用压缩,`header`头中不包含"`Last-Modified`"),

  `no_etag`(启用压缩,如果`header`头中不包含"Etag"头信息),

  `auth`(启用压缩,如果`header`头中包含"`Authorization`"头信息)

- **gzip_comp_level 3;**
  压缩比（1~9），越小压缩效果越差，但是越大处理越慢，所以一般取中间值;

- **gzip_types text/plain application/x-javascript text/css text/javascript;**
  对特定的`MIME`类型生效,其中`text/html`被系统强制启用

- **gzip_http_version 1.1**
  识别http协议的版本,早起浏览器可能不支持gzip自解压,用户会看到乱码，默认1.1

- **gzip_vary on**
  启用应答头`Vary: Accept-Encoding`，一般不需要设置

- **gzip_disable msie6**
  (`IE5.5`和`IE6 SP1`使用`msie6`参数来禁止`gzip`压缩 )指定哪些不需要`gzip`压缩的浏览器(将和`User-Agents`进行匹配),依赖于`PCRE`库

- **gzip_static on;**

  `nginx` 会优先匹配 `gzip` 文件来返回，如果没有就寻找相应资源进行 `gzip` 压缩再返回。

#### `nginx.conf`常用配置

```nginx
gzip on;
gzip_min_length 10k;
 // 设置大于10k起才压缩
gzip_buffers 4 16k;
gzip_comp_level 3;
 // 3到5
gzip_types text/css text/javascript;
 // 只对js，css文件进行压缩
```

### Webpack开启Gzip打包

`Webpack`的`Gzip`打包是通过插件`compression-webpack-plugin`来生成`.gz`文件。

#### 配置流程

首先，安装`compression-webpack-plugin`:

```bash
npm i -D compression-webpack-plugin
```

然后，在`webpack`配置文件中加入以下配置：

```js
// 最好是先判断以下环境变量是否是生产环境的打包
const CompressionWebpackPlugin = require('compression-wepback-plugin')
if (process.env.NODE_ENV === 'production') {
    webpackConfig.plugins.push(
    	new CompressionWepbackPlugin({
            fllename: '[path].gz[query]',
            // 目标资源名称。 [file] 会被替换成原始资源。[path] 会被替换成原始资源的路径， [query] 会被替换成查询字符串。默认值是 "[path].gz[query]"。
            algorithm: 'gzip',
            // 算法，默认'gzip'
            test: '\\.(js|css))$',
            // 所有匹配该正则的资源都会被处理。默认值是全部资源。
            // 这里只匹配了js、css文件
            threshold: 10240,
          	//只有大小大于该值的资源会被处理。单位是 bytes。默认值是 0。
            minRatio: 0.8
            // 只有压缩率小于这个值的资源才会被处理。默认值是 0.8。
        })
    )
}
```

最后，在`nginx`配置开启`gzip`压缩

在上面的`nginx`常用配置中，添加`gzip_static on;`，这样`nginx` 会优先匹配 `gzip` 文件来返回，如果没有就寻找相应资源进行 `gzip` 压缩再返回。

修改后的nginx配置如下：

```nginx
gzip on;
gzip_min_length 10k;
gzip_buffers 4 16k;
gzip_comp_level 3;
gzip_types text/css text/javascript;
gzip_static on;
// `nginx` 会优先匹配 `gzip` 文件来返回，如果没有就寻找相应资源进行 `gzip` 压缩再返回。
```

#### 优点

减少了服务器压缩文件的压力

#### 缺点

增加了打包时间

#### 总结

相比于用服务器每次请求都要压缩的方式，这种牺牲一点打包时间的方式更加值得推荐使用。