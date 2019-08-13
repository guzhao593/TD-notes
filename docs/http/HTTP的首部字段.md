---
sidebarDepth: 2
---
# HTTP的首部

HTTP协议的请求和响应报文中必定包含HTTP首部。

首部内容为客户端和服务器端分别处理请求和响应提供所需要的信息。

在请求中，HTTP报文首部有方法、URI、HTTP版本、HTTP首部字段等部分组成。

在响应中，HTTP报文首部由HTTP版本、状态码（数字和原因短语）、HTTP首部字段3部分组成。

在报文众多的字段中，HTTP首部字段包含的信息作为丰富。首部字段同时存在于请求和响应报文内，并涵盖HTTP报文相关的内容信息。

## HTTP首部字段

### 首部字段的作用

HTTP首部字段作用是为了传递额外的重要信息。

使用首部字段可以给浏览器和服务器提供报文主体大小、所使用的语言、认证信息等内容。

### 首部字段的结构

HTTP首部字段是由首部字段名和字段值构成的，中间用冒号“：”分隔。

```bash
首部字段：字段值
```

比如：

```bash
Content-Type：text/html
```

另外，字段值对于单个HTTP首部字段可以有多个值，比如：

```bash
Keep-Alive：timeout=15，max=100
```

### 4种HTTP首部字段类型

HTTP首部字段根据实际用途被分为以下4种类型

- 通用首部字段（General Header Field）

  请求报文和响应报文都会用到的首部字段

- 请求首部字段（Request Header Field）

- 响应首部字段（Response Header Field）

- 实体首部字段（Entity Header Field）

###  HTTP/1.1首部字段一览

#### 通用首部字段

| 首部字段名        | 说明                       | 参数值                              |
| ----------------- | -------------------------- | ----------------------------------- |
| Cache-Control     | 控制缓存的行为             |                                     |
| Connection        | 逐跳首部、连接的管理       | 默认值：Keep-Alive，默认持久连接TCP |
| Date              | 创建报文的日期时间         |                                     |
| Pragma            | 报文指令                   |                                     |
| Trailer           | 报文末端的首部一览         |                                     |
| Transfer-Encoding | 指定报文主体的传输编码方式 | chunked，分块传输编码               |
| Upgrade           | 升级为其他协议             |                                     |
| Via               | 代理服务器的相关信息       |                                     |
| Warning           | 错误通知                   |                                     |

#### 请求首部字段

| 首部字段名          | 说明                                          |
| ------------------- | --------------------------------------------- |
| Accept              | 用户代理可处理的媒体类型                      |
| Accept-Charset      | 优先的字符集                                  |
| Accept-Encoding     | 优先的内容编码                                |
| Accept-Language     | 优先的语言                                    |
| Authorization       | Web认证信息                                   |
| Expect              | 期待服务器的特定行为                          |
| From                | 用户的电子邮箱地址                            |
| Host                | 请求资源所在的服务器                          |
| If-Match            | 比较实体标记（ETag）                          |
| If-Modified-Since   | 比较资源的更新时间                            |
| If-None-Match       | 比较实体标记（与If-Match相反）                |
| If-Range            | 资源未更新时发送实体Byte的范围请求            |
| If-Unmodified-Since | 比较资源的更新时间（与If-Modified-Since相反） |
| Max-Forwards        | 最大城市逐跳数                                |
| Proxy-Authorization | 代理服务器要去客户端的认证信息                |
| Range               | 实体的字节范围请求                            |
| Referer             | 对请求中URI的原始获取方                       |
| TE                  | 传输编码的优先级                              |
| User-Agent          | HTTP客户端程序的信息                          |

#### 响应首部字段

| 首部字段名         | 说明                         |
| ------------------ | ---------------------------- |
| Accept-Ranges      | 是否接受字节范围请求         |
| Age                | 推算资源创建经过时间         |
| ETag               | 资源的匹配信息               |
| Location           | 令客户端重定向至指定URI      |
| Proxy-Authenticate | 代理服务器对客户端的认证信息 |
| Retry-After        | 对再次发起请求的时机要求     |
| Server             | HTTP服务器的安装信息         |
| Vary               | 代理服务器缓存的管理信息     |
| WWW-Authenticate   | 服务器对客户端的认证信息     |

#### 实体首部字段

| 首部字段名       | 说明                         |
| ---------------- | ---------------------------- |
| Allow            | 资源科支持的HTTP方法         |
| Content-Encoding | 实体主体适用的编码方式       |
| Content-Language | 实体主体的自然语言           |
| Content-Length   | 实体主体的大小（单位：字节） |
| Content-Location | 替代对应资源的URI            |
| Content-MD5      | 实体主体的报文摘要           |
| Content-Range    | 实体主体的位置范围           |
| Content-Type     | 实体主体的媒体类型           |
| Expries          | 实体主体过期的日期时间       |
| Last-Modified    | 资源的最后修改日期时间       |

### 非HTTP/1.1首部字段

在HTTP协议通信交互中使用到的首部字段，不限于RFC2616中定义的47种首部字段。

还有Cookie、Set-Cookie和Content-Disposition等其他首部字段。

## HTTP/1.1通用首部字段

### Cache-Control

通过指定首部字段Cache-Contro的指令，就能操作缓存的工作机制。

#####  缓存请求指令

| 指令             | 参数   | 说明                         |
| ---------------- | ------ | ---------------------------- |
| no-cache         | 无     | 强制向源服务器再次验证       |
| no-store         | 无     | 不缓存请求或响应的任何内容   |
| max-age=[秒]     | 必需   | 响应的最大Age值              |
| max-stale(=[秒]) | 可省略 | 接收已过期的响应             |
| min-fresh=[秒]   | 必需   | 期望在指定时间内的响应仍有效 |
| no-transform     | 无     | 代理不可更改媒体类型         |
| only-if-cached   | 无     | 从缓存获取资源               |
| cache-extension  | 无     | 新指令标记（token）          |

##### 缓存响应指令

| 指令            | 参数   | 说明                                           |
| --------------- | ------ | ---------------------------------------------- |
| public          | 无     | 可向任意方提供响应的缓存                       |
| private         | 可省略 | 仅向特定的用户响应                             |
| no-cache        | 可省略 | 缓存前必须先确认其有效性                       |
| no-store        | 无     | 不缓存请求或响应的任何内容                     |
| no-transform    | 无     | 代理不可更改媒体类型                           |
| must-revalidate | 无     | 要求中间缓存服务器对缓存的响应有效性在进行确认 |
| max-age=[秒]    | 必需   | 响应的最大Age值                                |
| s-maxage=[秒]   | 必需   | 公共缓存服务器响应的最大Age值                  |
| cache-extension | -      | 新指令标记（token）                            |

##### no-cache

使用no-cache指令的目的是为了防止从缓存中返回过期的资源。

客户端：发送的请求中如果包含no-cache指令，则表示客户端将不会接受缓存过的指令。于是，中间的缓存服务器必须把客户端请求转发给源服务器。

服务器：返回的响应中如果包含no-cache指令，那么缓存服务器不能对资源进行缓存。源服务器以后也将不再缓存服务器请求中提出的资源有效性进行确认，且禁止其对响应资源进行缓存操作。

```bash
Cache-Control: no-cache=Laction
```

由服务器返回的响应中，若报文首部字段Cache-Control中对no-cache字段名具体指导参数，那么客户端在接收到这个被指定参数值的首部字段对应的响应报文后，就不能使用缓存。换言之，无参数的首部字段客户端是可以使用缓存的。

>  只有在响应指令中才能指定该参数

##### no-store

当使用no-store指令时，暗示请求或响应中包含机密信息。

从字面上很容易把no-cache误解成为不缓存，但事实上no-cache代表不缓存过期的资源，缓存会向源服务器进行有效性确认后处理资源。

no-store才是真正的不进行缓存，因此，该指令规定缓存不能再本地存储请求或响应的任一部分

##### max-age

客户端：发送的请求中包含max-age指令时，如果判定缓存资源的缓存时间数值比指定时间的数值更小，那么客户端就接收缓存的资源。另外，当max-age=0时，那么缓存服务器通常需要将请求转发给源服务器。

服务器：响应中包含max-age指令时，如果判定缓存资源的缓存时间数值比指定时间的数值更小，缓存服务器将不对资源的有效性进行确认，max-age数值表示资源保存为缓存的最长时间。

> 缓存服务器遇到同时存在Expires首部字段的情况时，会有效处理max-age指令，而忽略Expires首部字段。

## HTTP/1.1请求首部字段

### Accept

Accept首部字段可通知服务器，用户代理能够处理的媒体类型及媒体类型的相对优先级。

可使用type/subtype这种新式，一次指定多种媒体类型。

比如：

```bash
Accept: text/html,application/xml
```

可以通过使用q=来额外表示权重值，用分号（；）进行分隔。权重值得范围是0~1（可精确到小数点后3位）。不指定权重值时，默认是权重为1.0

示例

```bash
Accept：text/html;q=0.2,text/plain
```

以上会优先返回text/plain类型。

### Accept-Encoding

Accept-Encoding首部字段用来告知服务器用户代理支持的内容编码及内容编码的优先级顺序。

主要有以下四种编码值：

- gzip

  由文件压缩程序gzip生成的编码格式。

- compress

  由UNIX文件压缩程序compress生成的编码格式

- deflate

  组合使用zilb格式及由deflate压缩算法生成的编码格式

- identify

  不执行压缩或不好变化的默认编码格式。

### If-Match

形如If-xxx这种样式的请求首部字段，都可称为条件请求。服务器接收到附带条件的请求后，只有判断指定条件为真是，才会执行请求。

首部字段If-Match会告知服务器匹配资源所用的实体标记（ETag）值，这时的服务器无法使用弱ETag值。

服务器会对比If-Match的字段值和资源的ETag值，当两者一致时，才会执行请求，反之，则会返回状态码412 Precodition Failed的响应。

还可以使用星号（*）指定If-Match的字段值，这样服务器就会忽略ETag的值，只要资源存在就处理请求。

### If-None-Match

跟If-Match相反。

### If-Modified-Since

告知服务器若If-Modified-Since字段值早于资源的更新时间，则希望能处理该请求。而在指定If-Modified-Since字段值得日期之后，如果请求的资源都没有更新过，则返回状态码304 Not Modified的响应。

If-Modified-Since的值可以通过响应首部字段Last-Modified来确定。

### If-Unmodified-Since

与If-Modified-Since相反

### If-Range

告知服务器若指定的If-Range字段值（ETag或时间）和请求资源的ETag或时间一致时，则作为范围请求处理。反之，则返回全体资源。

如果不使用If-Range发送范围请求，服务器的资源如果更新了，那客户持有资源中的一部分也会随之无效，当然，范围请求作为前提是无效的，这时，服务器会返回状态码412作为响应，其目的是告诉客户端再次发送请求。

相对使用If-Range，就需要花费两倍的功夫。

### Range

格式

```bash
Range：bytes=5001-10000
```

对于只需要获取部分资源的范围请求，包含首部字段Range即可告知服务器资源的指定范围。

接收到附带Range首部字段请求的服务器，会在处理请求之后返回状态码为206 Patial Content的响应。

无法处理范围请求时，则会返回状态码200 ok的响应及全部资源

## HTTP/1.1响应首部字段

### Accept-Ranges

首部字段Accept-Ranges是用来告知客户端是否能处理范围请求。

值有两种

- bytes

  可处理范围请求

- none

  不可处理范围请求

### Age

告知客户端，源服务器在多久前创建了响应。字段值的单位为秒。

若创建该响应的服务器是缓存服务器，Age值是指缓存后的响应再次发起认证到认证完成的时间值。

### ETag

告知客户端实体标识。

它是一种可将资源以字符串形式做唯一性标识的方式。服务器会为每份资源分配对应的ETag值。

当资源更新时，ETag值也需要更新。

资源被缓存时，就会被分配唯一性标识。

#### 强ETag值和弱ETag值

##### 强ETag值

不论实体发生多么细微的变化都会改变其值。

```bash
ETag: "23232323"
```



##### 弱ETag

弱ETag值只用于提示资源是否相同。只要资源发生了根本改变，才会改变ETag值。这时会在字段值最开始处附加w/。

```bash
ETag: W/"23232323"
```

### Location

使用首部字段Location可以将响应接收方引导至某个与请求URI位置不同的资源。

基本上，该字段会配合3XX：Redirection的响应，提供重定向的URI。

## HTTP/1.1实体首部字段

### Allow

用于通知客户端能够支持Request-URI指定资源的所有HTTP方法。

当服务器接收到不支持的HTTP方法是，会返回状态码405 Method Not Allowed。与此同时，还会把所有支持的HTTP方法写入首部字段Allow后返回。

### Content-Encoding

告知客户端服务器对实体的主体部分选用的内容编码方式。

主要要以下4种：

- gzip
- compress
- deflate
- identify

### Content-Length

表明实体主体部分的大小。

对实体主体进行内容编码传输时，不能再使用Content-Length首部字段。

### Content-Range

针对范围请求，返回响应时的首部字段Content-Range，能告知客户端作为响应返回的实体的哪个部分符合范围请求。

字段值以字节为单位，表示当前发送部分及整个实体大小

示例

```bash
Content-Range: bytes 5001-10000/20000
```

### Content-Type

说明了实体主体内对象的媒体类型。

### Expires

首部字段Expires会将资源失效的日期告知客户端。缓存服务器在接收到含有首部字段Expires的响应后，会以缓存来应答请求，在Expires字段值指定的时间之前，响应的副本会一直被保存。当超过指定的时间后，缓存服务器在请求发送过来时，会转向源服务器请求资源。

### Last-Modified

指明资源最后修改的时间。

## 为Cookie服务的首部字段

### Set-Cookie

由服务器端发起的响应首部字段，客户端在接到指令后，会将Set-Cookie字段的值写入Cookie中。

### Cookie

如果客户端的Cookie中有值，则会在每一次发起请求时，自动带上Cookie字段。

### Cookie的字段值属性

| 属性         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| NAME=VALUE   | 赋予Cookie的名称和其值（必需项）                             |
| expires=DATE | Cookie的有效期（如果不写，则默认为浏览器关闭前）             |
| path=PATH    | 将服务器上的文件目录作为Cookie的适用对象（默认为文档所在的文件目录） |
| domain=域名  | 作为Cookie适用对象的域名（默认为当前域名）                   |
| Secure       | 仅在HTTPS安全通信时才会放手Cookie                            |
| HttpOnly     | 加以限制，使Cookie不能被JavaScript脚本访问                   |

