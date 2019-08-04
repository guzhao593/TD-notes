---
sidebarDepth: 2
---
# File对象的使用和示例

文件（`File`）接口提供有关文件的信息，并允许网页中的JavaScript访问其内容。

通常情况下，File对象是来自用户在一个`<inpug>`元素上选择文件后返回的`FileList`对象，也可以是来自由拖放操作生成的 `DataTransfer` 对象，或者来自 `HTMLCanvasElement` 上的 `mozGetAsFile`() `API`。

`File` 对象是特殊类型的 `Blob`，且可以用在任意的 `Blob` 类型的 `context` 中。比如说， `FileReader`，`URL.createObjectURL()`， `createImageBitmap()`，及 `XMLHttpRequest.send()` 都能处理 `Blob` 和 `File`。

## 语法Api

### 构造函数

#### 语法

```js
const file = new File(bits, name[, options])
```

#### 参数

##### bits

`ArrayBuffer`，`ArrayBufferView`，`Blob`，或者 `DOMString` 对象的 `Array` — 或者任何这些对象的组合。这是 `UTF-8` 编码的文件内容。

##### name

`USVString`，表示文件名称，或者文件路径。

##### options `可选`

选项对象，包含文件的可选属性。可用的选项如下：

- `type`: `DOMString`，表示将要放到文件中的内容的 `MIME` 类型。默认值为 "" 。
- `lastModified`: 数值，表示文件最后修改时间的 `Unix` 时间戳（毫秒）。默认值为 `Date.now()`。

#### 示例

```js
var file = new File(["foo"], "foo.txt", {
  type: "text/plain",
});
```

### 属性

`File` 接口也继承了 `Blob` 接口的属性：

File.lastModified  `只读`

返回当前 `File` 对象所引用文件最后修改时间，自 `UNIX` 时间起始值`（1970年1月1日 00:00:00 UTC）`以来的毫秒数。

File.lastModifiedDate `只读`

返回当前 `File` 对象所引用文件最后修改时间的 `Date` 对象。

File.name `只读`

返回当前 `File` 对象所引用文件的名字。

File.size `只读`

返回文件的大小。

File.type `只读`

返回文件的 多用途互联网邮件扩展类型（`MIME Type`）

### 方法

`File` 接口没有定义任何方法，但是它从 `Blob` 接口继承了以下方法：

Blob.slice([start[, end[, contentType]]])
返回一个新的 `Blob` 对象，它包含有源 `Blob` 对象中指定范围内的数据。