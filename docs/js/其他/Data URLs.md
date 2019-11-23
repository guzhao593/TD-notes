## Data URLs

Data URLs，前缀为`data:`协议的URL，其允许内容创建者向文档中嵌入小文件。

### 语法

Data URLs由四个部分组成：前缀（`data:`）、指示数据类型的MIME类型、如果非文本为可选的`base64`标记、数据本身：

```js
data:[<mediatype>][;base64],<data>
```

`mediatype `是个 MIME 类型的字符串，例如 "`image/jpeg`" 表示 JPEG 图像文件。如果被省略，则默认值为 `text/plain;charset=US-ASCII`

如果数据是文本类型，你可以直接将文本嵌入 (根据文档类型，使用合适的实体字符或转义字符)。

如果是二进制数据，你可以将数据进行base64编码之后再进行嵌入。

## base64 编码

**Base64**是一组类似的[二进制文本编码](https://en.wikipedia.org/wiki/Binary-to-text_encoding)方案，通过将其转换为基数-64表示，以ASCII字符串格式表示二进制数据。术语  *Base64*源自特定的[MIME内容传输编码](https://en.wikipedia.org/wiki/MIME#Content-Transfer-Encoding)。

当需要编码需要存储和通过旨在处理文本数据的媒体传输的二进制数据时，通常使用Base64编码方案。这是为了确保数据在运输过程中保持完好无需修改。Base64通常用于许多应用程序，包括通过[MIME](https://en.wikipedia.org/wiki/MIME)发送电子邮件，以及以[XML格式](https://developer.mozilla.org/en-US/docs/XML)存储复杂数据。

在JavaScript中，分别有两个函数用于解码和编码*base64*字符串：

- `atob()`
- `btoa()`

该`atob()`函数解码使用base-64编码编码的数据字符串。

相反，该`btoa()`函数从二进制数据的“字符串”创建base-64编码的ASCII字符串。

无论`atob()`和`btoa()`工作的字符串。如果您想继续工作[`ArrayBuffers`](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBuffer)，请阅读[本段](https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#Solution_5_–_rewrite_the_DOMs_atob()_and_btoa()_using_JavaScript's_TypedArrays_and_UTF-8)。

#### 编码大小增加

每个Base64数字代表6位数据。因此，输入字符串/二进制文件的三个8位字节（3×8位= 24位）可以由四个6位Base64数字（4×6 = 24位）表示。

这意味着字符串或文件的Base64版本最多可达其源的133％（增加约33％）。如果编码数据很小，则增加可能更大。例如，串`"a"`与`length === 1`被编码为`"YQ=="`与`length === 4`-增加了300％。