# JavaScript的执行机制

在理解`JavaScript`(以下简称`js`)的执行机制之前，先要理解几个概念：

1. js是单线程语言

   为什么要将`js`设计为单线程，原因是js最初是专门为浏览器设计的。

   可以想象一下，如果js是多线程的，那么当你对同一个`dom`进行不同操作时，浏览器会不知道如何执行。

   比如，一个线程你要删除`dom`，另一个线程你要修改`dom`，同时给浏览器下达命令，这时浏览器该如何执行呢？

2. js的代码分为同步代码和异步代码（其实就是`API`）

   首先，`js`为什么需要异步代码？

   如果，`js`没有异步，那么`js`就只能自上而下执行代码，这样就会出现当上一行代码执行时间过长，下面的代码就回被阻塞的情况。比如，上一行代码时去后台请求数据，那么下一行代码就必须等到请求回来后才能执行。

   这样的用户体验可谓是极差。

   所以，`js`是需要异步代码的。

   其次，`JS`的单线程又是如何实现异步的呢？

   是通过的事件循环(`event loop`)，理解了事件循环机制，就理解了`JS`的执行机制。

   

## 事件循环（event loop）机制

### 执行流程图

![event-loop-01](D:\myProject\TD-notes\docs\.vuepress\public\js\EventLoop\event-loop-01.png)



### 执行过程

1. 执行同步任务并将异步任务放入事件队列

   判断`js`是同步任务还是异步任务，同步就进入主线程并马上执行；异步则进入`Event Table`，异步任务在`Event Table`中注册函数，当满足条件后，被推入`Event Queue`（事件队列）中。

   在将异步任务推入`Event Queue`（事件队列）时，`js`会判断任务是宏任务还是微任务，如果是宏任务才推入宏任务队列中；如果是微任务则推入微任务队列中。

2. 执行事件队列中的异步任务

   当主线程中的同步任务全部执行完之后，就会去`Event Queue`（事件队列）中查看是否有可以执行的异步任务。

   如果有微任务，则先执行完所有的微任务；

   如果没有微任务，则判断是否有宏任务，如果有，则将宏任务推入主线程，开始下一个事件循环；如果没有，则代表任务全部执行完了。

### 宏任务和微任务

宏任务（`macro-task`）：`script`（整体代码）、`setTimeout`、`setInterval`、`UI`交互事件、`requestAnimationFrame`

微任务（`micro-task`）：`Promise`、`MutationObserver`

#### 宏任务和微任务的区别

有一段代码来区分

HTML

```html
<body>
  <div class="account">0次</div>
</body>
```

宏任务

```js
const accountDom = document.querySelector('.account')
  let account = 0
  function fn () {
    setTimeout(() => {
      accountDom.innerHTML = ++account + '次'
      fn()
    }, 0)
  }
  fn()
```

微任务

```js
const accountDom = document.querySelector('.account')
  let account = 0
  function fn () {
    Promise.resolve().then(() => {
      accountDom.innerHTML = ++account + '次'
      fn()
    })
  }
  fn()
```

两端代码除了一个用了`setTimeout`，一个用了`Promise`，其他都一样。

但执行结果是：

- 宏任务会渲染`dom`，并依次输出次数
- 微任务不会渲染`dom`

### 执行机制---示例1

#### 代码

```js
console.log('start')
setTimeout(function() {
    console.log('setTimeout');
});
new Promise(function(resolve) {
    console.log('promise');
    resolve();
}).then(function() {
    console.log('then');
});
console.log('end');
```

#### 输出结果

```js
start
promise
end
then
setTimeout
```

#### 解析

这个例子很简单，

进入script主线程，遇到`console.log`，是同步任务，马上执行，输出`start`；

继续执行，遇到`setTimeout`，是异步任务，且是宏任务，推入事件队列中；

继续执行，遇到`new Promise()`，是同步任务，立即执行`new Promise`里的回调函数，遇到`console.log`，立即输出`promise`，在遇到`then`，是异步任务，且是微任务，推入事件队列；

继续执行，遇到`console.log`，立即输出`end`；

这时，同步任务已经全部执行完，开始执行事件队列中的异步队列。

先查看有没有微任务，有一个`then`，执行，输出`then`；

在查看有没有宏任务，有一个`setTimeout`，执行，输出`setTimeout`;

### 执行机制---示例2

```js
console.log('1');
setTimeout(() => {
    console.log('9');
    Promise.resolve().then(() =>  {
        console.log('11');
    });
    new Promise(function(resolve) {
        console.log('10');
        resolve();
    }).then(function() {
        console.log('12')
    });
},5000);
Promise.resolve().then(() =>  {
    console.log('3');
});
new Promise(function(resolve) {
    console.log('2');
    resolve();
}).then(function() {
    console.log('4');
});
setTimeout(() => {
    console.log('5');
    Promise.resolve().then(() =>  {
        console.log('7');
    });
    new Promise(function(resolve) {
        console.log('6');
        resolve();
    }).then(function() {
        console.log('8');
    });
});
```

输出结果就是按照数字大小依次输出。