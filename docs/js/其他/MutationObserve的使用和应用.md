# MutationObserve的使用和应用

## 前言

最近接到一个项目需求，就是把另一个项目嵌入到当前项目中。要求很简单，让人看不出这是嵌入过来的。

本来觉得这也没什么，因为以前也做过一次。

方案无非就是通过`iframe`嵌入，通过`postMessage`进行通信（`ps`:两个项目都是我们自己的，可以修改代码）。

其他的一切都`ok`，就有个一个问题困扰了。

我们当前的项目是一个典型的圣杯布局，头部和底部都要显示内容。

而嵌入的页面的高度是不固定的，如果固定`iframe`的高度，就会出现有的页面过短导致`iframe`出现大片空白，有的页面过长导致`iframe`会出现滚动条，

所以，我需要解决的是如何随时获知嵌入页面的高度。

#### 第一种方案——轮询

我发现只要是听到“随时”两个字，肯定有一个解决方案是轮询，但肯定马上又否决了这个方案。

没办法，降低程序性能的我们不要。

#### 第二种方案——MutationObserve

第二种方案，就要请出我们今天的主角了，`MutationObserve`。

这是个少为人知的`API`，却是被所有浏览器所支持（重点：`ie11`支持，`ie11`以下绕路，我们的项目只要支持`ie11`）。

## 使用

使用`MutationObserve`非常简单。

首先，通过`MutationObserve`构造函数，创建一个实例。

```javascript
var observer = new MutationObserve(function (mutation) {
    mutations.forEach(function(mutation) {
    console.log(mutation);
  });
})
```

构造函数的参数是一个回调函数，返会的参数是一个对象，属性如下

```javascript
type： 如果是属性发生变化,则返回attributes.如果是一个CharacterData节点发生变化,则返回characterData,如果是目标节点的某个子节点发生了变化,则返回childList.
target： 返回此次变化影响到的节点,具体返回那种节点类型是根据type值的不同而不同的,如果type为attributes,则返回发生变化的属性节点所在的元素节点,如果type值为characterData,则返回发生变化的这个characterData节点.如果type为childList,则返回发生变化的子节点的父节点.
addedNodes： 返回被添加的节点
removedNodes： 返回被删除的节点
previousSibling： 返回被添加或被删除的节点的前一个兄弟节点
nextSibling： 返回被添加或被删除的节点的后一个兄弟节点
attributeName： 返回变更属性的本地名称
oldValue： 根据type值的不同,返回的值也会不同.如果type为attributes,则返回该属性变化之前的属性值.如果type为characterData,则返回该节点变化之前的文本数据.如果type为childList,则返回null
```

然后，通过实例的observe方法进行观察目标`dom`

```javascript
Observer.observe(targetNode, options)

// 代码实例
var targetNode = document.body
var options = {
    childList: true,
    attributes: true,
    subtree: true
}
Observer.observe(targetNode, options)
```

`observe`方法接收连个参数

- `targetNode`

  就是你需要观察的`DOM`对象

- `options`

  `options`是一个`MutationObserverInit`的对象，属性如下

  ```javscript
  childList： 设为true以监视目标节点（如果subtree为true，则包含子孙节点）添加或删除新的子节点。默认值为false。
  subtree： 设为true以扩展监视范围到目标节点下的整个子树的所有节点
  attributes： 设为true以观察受监视元素的属性值变更。默认值为false。
  attributeOldValue： 在attributes属性已经设为true的前提下，当监视节点的属性改动时，将此属性设为true 将记录任何有改动的属性的上一个值。
  attributeFilter： 要监视的特定属性名称的数组。如果未包含此属性，则对所有属性的更改都会触发变动通知。无默认值。
  characterData： 设为true以监视指定目标节点或子节点树中节点所包含的字符数据的变化。无默认值。(一种抽象接口,具体可以为文本节点,注释节点,以及处理指令节点)时,也要观察该节点的文本内容是否发生变化
  characterDataOldValue： 在characterData属性已经设为true的前提下,设为true以在文本在受监视节点上发生更改时记录节点文本的先前值
  ```

实例还有两个方法

`disconnect`

终止在观察者对象上设置的节点的变化监听，直到重新调用`observe`方法

`takeRecords`

在回调被触发前返回最后一批更改，就是说当你调用了`disconnect`方法，会返回最后一次的更改，而不直接终止了。

> `MutationsObserve`是异步的，同`Promise`。

## 应用

回到最初的需求，如何随时获知`ifame`嵌入的页面的高度？

上代码

```javascript
var ele = document.documentElement
var oldHeight = null
var observer = new MutationObserve(function (mutation) {
	var newHeight = ele.height
	if (newHeight != oldHeight) {
		oldHeight = newHeight
		// 通过postMessage进行iframe之间的通信
		window.top.postMessage({
			type: 'IframeInnerHeight',
			height: newHeight
		}, '*')
	}
})
var options = {
	childList: true,
	subtree: true,
	attributes: true
}
observer.observe(ele, options)
```

当父级接收到页面的高度就可重新设置`Iframe`的高度，这样两个项目就完美的融合一起了。

## 思考

当我们了解了`MutationObserve`的强大功能时，我们是否可以多想想，它还能做什么？我们能依靠它来做什么？

这里推荐一篇文章，提供三个应用场景

[Mutation Observer 的三个实际应用](https://zcfy.cc/article/three-real-world-uses-for-mutation-observer)