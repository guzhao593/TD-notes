# Charles--01--安装和使用

## 前言

`Charles`是一款代理服务器，通过过将自己设置成系统（电脑或者浏览器）的网络访问代理服务器，然后截取请求和请求结果达到分析抓包的目的。其功能与Fiddler非常相似，个人觉得`Charles`更简洁。

## 安装和破解

### 安装

进入官网下载地址：http://www.charlesproxy.com/，点击链接下载30天免费试用版本。

PS：`Charles` 是收费软件，可以免费试用 30 天。试用期过后，未付费的用户仍然可以继续使用，但是每次使用时间不能超过 30 分钟，并且启动时将会有 10 秒种的延时。因此，该付费方案对广大用户还是相当友好的，即使你长期不付费，也能使用完整的软件功能。只是当你需要长时间进行封包调试时，会因为 `Charles` 强制关闭而遇到影响。

### 破解

1. 打开`Charles`应用，在工作栏`Help`下，点击`Rejistered to`

2. 输入以下：

   `Registered Name`: `https://zhile.io`
   `License Key`: `48891cf209c6d32bf4`

3. 重启应用就`OK`了

## 使用

### 连接

#### 1. 电脑端连接

由于`charles`会自动配置浏览器和工具的代理设置，所以说打开工具直接就已经是抓包状态了。直接打开网页就可以了。

 注意：

1. `Charles`支持抓去`http`、`https`协议的请求，不支持`socket`。

2. 防火墙关掉

#### 2.手机端连接

使手机和电脑在一个局域网内，不一定非要是一个`ip`段，只要是同一个路由器下就可以了。

1. 首先获取当前电脑的`ip`地址。

   获取当前电脑的`ip`地址的方法有很多，这里使用`Charlse`自带的获取`ip`地址功能。

   ![1568456137009](C:\Users\guzhao593\AppData\Roaming\Typora\typora-user-images\1568456137009.png)

   ![1568456176633](C:\Users\guzhao593\AppData\Roaming\Typora\typora-user-images\1568456176633.png)

2. 然后在手机端的`wifi`代理设置那里去进行相关的配置设置。

   这里的代理服务器地址填写为电脑的`ip`地址，然后端口这里写`8888`（这个是`charles`的默认设置），如果自己修改了就写成自己所修改的端口就可以了。

   ![1568456728537](C:\Users\guzhao593\AppData\Roaming\Typora\typora-user-images\1568456728537.png)

   配置完成，会看到一个`charles`与手机端的连接提示弹窗，选择`allow`即可。

   ![1568456836442](C:\Users\guzhao593\AppData\Roaming\Typora\typora-user-images\1568456836442.png)

3. 手机端抓包https

上述1、2步骤，只针对`http`请求。由于`https`协议的特殊性，所以要求电脑端和手机端都需要安装下证书，否则会看到返回的数据都是乱码。

a.电脑端证书下载

![img](https://upload-images.jianshu.io/upload_images/5337737-895a3736db7ce118.png?imageMogr2/auto-orient/strip|imageView2/2/w/507/format/webp)

b. 手机端证书下载

在设备上打开这个网址 http://www.charlesproxy.com/getssl（用手机浏览器打开时有可能不会自动下载，可以改为用PC端浏览器打开） 安装 `Charles SSL` 证书。

注意，同一个手机对应不同电脑上的`Charles`都要分别下载证书进行认证，因为手机的证书是和电脑端的`Charles`一一配对的。

![img](https://upload-images.jianshu.io/upload_images/5337737-c17b7752efa93560.png?imageMogr2/auto-orient/strip|imageView2/2/w/554/format/webp)

**PS：ios手机，需要信任该证书**

C.相关配置

选择`Proxy` | `Proxy Settings`，弹出proxy设置选项卡，勾选`Enable SSL Proxying`，在Location部份选择`add`，按如下图添加，抓取任意站点、`443`端口的数据。

![img](https://upload-images.jianshu.io/upload_images/5337737-3d24f9bb09357d63.png?imageMogr2/auto-orient/strip|imageView2/2/w/442/format/webp)



## 问题

### 如何捕获本地`localhost`数据

#### 产生原因

`Charles`有个让人头疼的问题，就是不能直接捕获`localhost`或`127.0.0.1`的`http`请求。

#### 解决方法

将`localhost`或`127.0.0.1`替换为`localhost.charlesproxy.com`

例如：

```js
http://localhost:8080  或 http://127.0.0.1:8080
替换为
http://localhost.charlesproxy.com:8080
```

> 注：端口号记得要一样