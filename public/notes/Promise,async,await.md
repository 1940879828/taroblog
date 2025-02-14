---
title: Promise
tags: ['JavaScript','ES6']
date: 2023-04-05 19:47:29
categories: ['前端','JavaScript']
cover: http://qny.bioart.icu/blog/8.jpg
---

### 1. 基本功能

在处理一些需要花费比较长时间的任务时，使用Promise就可以进行异步的处理，防止阻塞。实现把异步当同步写。

### 2. 解决问题

解决回调地狱问题，而且因为有了resolve和reject可以进行异步处理并且得知任务进度

### 3. 异步任务

异步任务不进入主线程，而是进入异步队列，前一个任务是否执行完毕不影响下一个任务的执行。 

```javascript
setTimeout(function(){
    console.log('我在上面')
},1000}
console.log('我在下面')

执行结果：
    我在下面
    我在上面
  >
```

这种不阻塞后面任务执行的任务就叫异步任务

### 4. 回调地狱

上面说到，异步任务不能保证按照顺序执行，但实际上我们是有这样的需求的。在没有promise的时候我们这样子实现。

```javascript
setTimeout(function(){
    console.log("获取id");
    setTimeout(function(){
        console.log("获取用户名");
        setTimeout(function(){
            console.log("获取email");
        },2000)
    },1000)
},3000)
```

可以看到，代码中的回调函数套回调函数，居然套了3层，这种回调函数中嵌套回调函数的情况就叫做回调地狱。

总结一下，回调地狱就是为是实现代码顺序执行而出现的一种操作，它会造成我们的代码可读性非常差，后期不好维护。

### 5. Promise基本使用

new Promise((resolve,reject)=>{})

- Promise接受一个函数作为参数
- 函数参数中接受俩个形参参数

- - resolve
  - reject

控制台打印Promise实例，他有两个属性

- state: 状态
- result: 结果

### 6. Promise的状态

第一种状态：pending (准备，待解决，进行中)

第二种状态：fulfilled (已完成，成功)

第三种状态：rejected (已拒绝，失败)

### 7. Promise状态的改变

通过调用resolve()和reject()改变当前promise对象的状态

示例

```javascript
const p = new Promise((resolve,reject)=>{
    resolve()
})
console.log(p)// [[PromiseState]]: "fulfilled"
```

```javascript
const p = new Promise((resolve,reject)=>{
    reject()
})
console.log(p)// [[PromiseState]]: "rejected"
```

**promise状态的改变是一次性的。** 改状态只能改一次，不是fulfilled就是rejected

### 8. Promise的结果属性

通过调用resolve()或reject()传递参数，改变当前promise对象的结果

```javascript
const p = new Promise((resolve,reject)=>{
    resolve('resolve的参数')
})
console.log(p)// [[PromiseResult]]: "resolve的参数"
```

### 9. Promise的方法

#### 1) then方法

参数是两个回调函数

```javascript
p.then((value)=>{
    //promise的状态是fulfilled时，执行  
    console.log('成功时调用',value);//value是resolve传入的参数
},
()=>{
    //promise的状态是reject时，执行
    console.log('失败时调用');
})
```

then方法返回值是一个新的Promise实例，状态是pending

promise的状态不改变，不会执行then里的方法

这意味着我们可以进行链式编码

new Promise((resolve,reject)=>{}).then().then().then()

如何修改上一个then返回的promise的状态

使用return 可以将返回的promise的状态修改成fulfilled

```javascript
const p = new Promise((resolve,reject)=>{
    resolve()
}) //第一个promise


const t = p.then((value)=>{ //返回的t是第二个promise
    console.log("成功");
    return 123        //调用return 修改t promise的状态
},()=>{
    console.log("失败");
})

t.then((value)=>{ //怎么修改t的状态 好让第三个then输出成功2执行↑
    console.log('成功2',value);
},()=>{
    console.log("失败");
})
```

什么情况会修改promise为reject呢

如果then方法中，出现代码错误，会将返回的promise实例的状态改为fulfilled

```javascript
const p = new Promise((resolve,reject)=>{
    resolve()
}) //第一个promise


const t = p.then((value)=>{ //返回的t是第二个promise
    //如果这里代码出错，会将t实例的状态改成rejected
    console.log(a)
},()=>{
    console.log("失败");
})

t.then((value)=>{ //怎么修改t的状态 好让第三个then输出成功2执行↑
    console.log('成功2',value);
},()=>{
    console.log("失败"); //上面出错会执行这一步
})
```

#### 2) catch方法

当promise状态为rejected或promise执行体中出现代码出错时，将执行catch方法，参数是错误信息

```javascript
const p = new Promise((resolve,reject)=>{
    //thorw new Error('error')
    // console.log(a);
    reject();
}).catch((e)=>{
    console.log('失败',e);
})
```

#### 3) Promise.all

将多个Promise实例包装成一个新的Promise实例的方法，Promise.all的入参不一定非要是数组，只要是具有Iterator结构的数据集合都行。

Promise.all 等待所有成功返回成功（有一个失败，则进入失败方法）。

应用场景:

- 一个页面，有多个请求，我们需求所有的请求都返回数据后再一起处理渲染 
- 我们需求单独处理一个请求的数据渲染和错误处理逻辑，有多个请求，我们就需要在多个地方写 
- 验证多个请求结果是否都是满足条件 

```javascript
var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([p1, p2, p3]).then(values => {
  console.log(values); // [3, 1337, "foo"]
});
```

#### 手写实现Promise.all

```javascript
/*
实现思路：
1.遍历数组
2.判断是否是promise对象
  - 是就执行.then
    - 成功就将值添加到返回值数组
    - 失败就调用 当前promise的reject()
  - 不是 就直接把值添加到返回值数组
3.因为有异步任务 每次添加值都记录一遍index++ 与 数组值相等说明任务
    都执行完了 可以执行resolve(结果)
*/
Promise.myall = function (array) {
  let result = [];
  let index = 0;
  return new Promise((resolve, reject) => {
    function addData(key, value) {
      result[key] = value
      index++
      //3. 任务都执行完毕 resolve(result)
      if (index === array.length) {
        resolve(result)
      }
    }
    //1.遍历数组
    for (let i = 0; i < array.length; i++) {
      let current = array[i];
      //2.判断是不是Promise
      if (current instanceof Promise) {
        //promise对象 执行then
        current.then(value => addData(i, value), reason => reject(reason))
      } else {
        //普通值 添加到返回值数组
        addData(i, array[i])
      }
    }
  })
}
```

**4）Promise存在的问****题**

- promise一旦执行，无法中途取消
- promise的错误无法在外部被捕捉到，只能在内部进行预判处理
- promise的内如何执行，监测起来很难

### 10. promise实践

### 常见写法

```javascript
new Promise((resolve,reject)=>{

}).then(value=>{
    console.log("成功",value);
}).catch(reason=>{
    console.log(reason);
})
```

### 解决回调地狱

```javascript
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("第一次请求数据")
    }, 3000)
}).then((data) => {
    console.log(data);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("第二次请求数据")
        },1000)
    })
}).then(data=>{
    console.log();

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("第三次请求数据")
        },2000)
    })
}).then(data=>{
    console.log(data);
})
```

### 11. async,await

使用async,await语法糖可以让异步代码看起来像同步代码，提高代码可阅读性。

示例：

```javascript
//原来Promise的写法
function getData() {
    fetch("https://jsonplaceholder.typicode.com/posts/1").then(res => {
        return res.json()
    }).then(res => {
        console.log(res);
    }).catch(error=>{
        console.log(error);
    }).finally(()=>{
        // 清理工作
    })
}

//使用async语法糖
//async将函数标记为异步函数
async function getData(){
    // 请求不需要then处理,而是用await
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1")
    const json = await response.json()
    console.log(json);
}
getData()
```

使用async,await应该避免的坑：

#### 一、使用async和await会打破并行

```javascript
async function getData(){
    const a = await fetch("https://...")
    const b = await fetch("https://...")
}
```

这里的两个fetch并不是并行操作，而是a先获取到，再执行b的请求。更高效的做法是将所有Promise用Promise.all组合起来，然后再去await。

```javascript
async function getData(){
    const promiseA = fetch("https://...")
    const promiseB = fetch("https://...")

    const[a,b] = await Promise.all([promiseA,promiseB])
}
```

#### 二、在循环中执行异步操作，不能直接调用forEach或map这一类方法的

如果我们希望等待循环中的异步操作都一一完成之后才继续执行，我们应该使用for循环

```javascript
async function f(){
    for (let i of [1,2,3]){
        await someAsyncOperation()
    }
    
    console.log("done")
}
f()
```

更进一步，如果我们需要所有请求**并发**执行，我们可以使用for await

```javascript
// 并发
async function f(){
    const promises = [
        someAsyncOperation(),
        someAsyncOperation(),
        someAsyncOperation(),
    ]
    for await (let result of promises){
        //..
    }

    console.log("done")
}
f()
```

#### 三、更简洁的写法

```javascript
//async function f(){
//    await someAsyncOperation()
//}
//f()

(async()=>{
    await someAsyncOperation()
})()
```