# URL.createObjectURL和URL.revokeObjectURL的使用和案例

## URL.createObjectURL()

`URL.createObjectURL()`静态方法会创建一个`DOMString`，其中包含一个表示参数这给出的对象的`URL`。

这个`URL`的生命周期和创建它的窗口中的`document`绑定。

这个`URL`对象表示指定的`File`对象和`Blob`对象。

### 语法

```js
objectURL = URL.createObjectURL(object)
```

#### 参数

##### `Object`

用于创建 `URL` 的 `File` 对象、`Blob` 对象。

#### 返回值

一个`DOMString`。

## URL.revokeObjectURL

`URL.revokeObjectURL()`静态方法用来释放一个之前已经存在的、通过调用`URL.createObjectURL()`创建的`URL`对象。

当你结束使用某个`URL`对象之后，应该通过调用这个方法来浏览器知道不用在内存中继续保留对这个文件的引用。

### 语法

```js
window.URL.revokeObjectURL(objectURL)
```

#### 参数

##### `objectURL`

一个`DOMString`，表示通过`URL.createObjectURL()`方法创建的`URL`对象。

#### 返回值

`undifined`



>注：通过`URL.createObjectURL()`方法创建的URL对象，在不需要的时候一定要通过`URL.revokeObjectURL()`来释放。