# FileReader的使用

`FileReader`对象允许`web`应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用File或Blob对象指定要读取得文件或数据。

其中`File`对象可以是来自用户在一个<input>元素上选择文件后返回的`FileList`对象，也可以是来自拖放操作生成的`DataTranfer`对象，还可以是来自一个`HTMLCanvasElement`上执行`mozGetAsFile`()方法后返回结果。

## 语法API

### 构造函数

**FileReader()**

​	返回一个新构造的`FileReader`实例。

### 属性

**FileReader.error**  `只读`

​	一个`DOMException`，表示在读取文件时发生的错误 。

**FileReader.readyState**  `只读`

​	表示`FileReader`状态的数字。取值如下：

| 常量名  | 值   | 描述                 |
| ------- | ---- | -------------------- |
| EMPTY   | 0    | 还没加载任何数据     |
| LOADING | 1    | 数据正在加载         |
| DONE    | 2    | 已完成全部数据的读取 |

**FileReader.result**  `只读`

文件的内容。

> 改属性仅在读取操作完成之后才有效，数据的格式取决于使用哪个方法来启动读取操作。

### 事件处理

**FileReader.onabort**

处理`abort`事件。该事件在读取操作被中断是触发。

**FileReader.onerror**

处理`error`事件。该事件在读取操作发生错误是触发。

**FileReader.onload**

处理`load`事件。该事件在读取操作完成是触发。

**FileFeader.onloadstart**

处理`loadstart`事件。该事件在读取操作开始是触发。

**FileReader.onloadend**

处理`loadend`事件。该事件在读取结束时（要么成功、要么失败）触发。

**FileReader.onprogress**

处理`progress`事件。该事件在读取`Blob`是触发。

### 方法

**FileReader.abort()**

中断读取操作。

在返回时，`readyState`属性为`DONE`。

#### 读取文件内容并输出指定格式

**FileReader.readAsArrayBuffer()**

开始读取指定的`Blob`中的内容，一旦完成，`result`属性中保存的将是被读取文件的`ArrayBuffer`数据对象。

**FileReader.readAsBinaryString()**

开始读取指定的`Blob`中的内容。一旦完成，`result`属性中将包含所读取文件的原始二进制数据。

**FileReader.readAsDataURL()**

开始读取指定的`Blob`中的内容。一旦完成，result属性中将包含一个`data:URL`格式的字符串以表示所读取的文件的内容。

**FileReader.readerAsText()**

开始读取指定的`Blob`中的内容。一旦完成，`result`属性中将包含一个字符串以表示所读取的文件内容。

## 示例

### 读取图片并显示

HTML

```html
<input id="fileElem" type="file" accept="image/*"/ style="display: none">
<label for="fileElem">选择图片</label>
<p id="imgBox">
    暂无图片
</p>
```

JavaScript

```js
const fileElem = document.getElementById('fileElem')
const imgBox = document.getElementById('imgBox')
fileElem.addEventListener('change', handleFile, false)
function handleFile () {
    const fileList = this.files
    const fileReader = new FileReader()
    fileReader.onload = function () {
        const dataURL = this.result
        const img = document.createElement('img')
        img.src = dataURL
        imgBox.appendChild(img)
    }
    fileReader.readAsDataURL(fileList[0])
}
```

