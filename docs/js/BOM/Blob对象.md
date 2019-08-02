# Blob对象

`Blob`对象表示一个不可变、原始数据的类文件对象。`blob` 存储着大量的二进制数据。

`Blob` 表示的不一定是`JavaScript`原生格式的数据。`File` 接口基于`Blob`，继承了 `blob` 的功能并将其扩展使其支持用户系统上的文件。

要从其他非`blob`对象和数据构造一个`Blob`，请使用 Blob() 构造函数。要创建包含另一个`blob`数据的子集`blob`，请使用 `slice`()方法。

## 构造函数

```js
var aBlob = new Blob(array, type)
```

### 参数

- `array`

  `array` 是一个由`ArrayBuffer`, `ArrayBufferView`, `Blob`, `DOMString` 等对象构成的 `Array` ，或者其他类似对象的混合体，它将会被放进 `Blob`。`DOMStrings`会被编码为`UTF-8`。

- `type`

  默认值为 `""`，它代表了将会被放入到`blob`中的数组内容的`MIME`类型。

### 返回值

返回一个新的 `Blob` 对象。 `blob`的内容由参数数组中给出的值的串联组成。

### 使用示例

```js
var aFileParts = ['<a id="a"><b id="b">hey!</b></a>']; // 一个包含DOMString的数组
var oMyBlob = new Blob(aFileParts, {type : 'text/html'}); // 得到 blob
```

## 属性

**Blob.size**  `只读`

Blob对象中所包含数据的大小（字节）。

**Blob.type** `只读`

一个字符串，表面改`Blob`对象所包含数据的`MIME`类型。如类型未知，则改值为空字符串。

### 方法

**Blob.slice([start, [end, [contentType]]])**

返回一个新的`Blob`对象，包含了源`Blob`对象中指定范围内的数据。

## 使用示例

### 使用 Blob 创建URL

```js
var typedArray = GetTheTypedArraySomehow();
var blob = new Blob([typedArray], {type: "application/octet-binary"});// 传入一个合适的MIME类型
var url = URL.createObjectURL(blob);
// 会产生一个类似blob:d3958f5c-0777-0845-9dcf-2cb28783acaf 这样的URL字符串
// 你可以像使用一个普通URL那样使用它，比如用在img.src上。
```

### 从 Blob 中提取数据

从`Blob`中读取内容的唯一方法是使用 `FileReader`。以下代码将 `Blob` 的内容作为类型数组读取：

```js
var reader = new FileReader();
reader.addEventListener("loadend", function() {
   // reader.result 包含转化为类型数组的blob
});
reader.readAsArrayBuffer(blob);
```

通过使用 `FileReader` 的其它方法可以把`Blob`读取为字符串或者数据`URL`。