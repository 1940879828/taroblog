---
title: 节流与防抖
tags: ['Js']
date: 2023-04-08 14:47:29
categories: 'Js'
cover: http://qny.bioart.icu/blog/14.jpg
---

### 一、什么是防抖。

就是指 在设定的一段时间内中除了最后一次，前面的连续触发都不执行。

举例：设定1000毫秒执行，触发一次，1000毫秒后执行，但是如果你在剩500毫秒的时候又触发了，那就重新从1000毫秒计算。

形象举例：英雄联盟或者王者荣耀的回城

#### 防抖应用场景

- 搜索框搜索输入、文本输入的验证
- 文本编辑器实时保存

示例：非立即执行版

```
<button class="ipt" type="button" onkeyup="SomeJavaScriptCode">防抖</button>
<script>
  let timerId = null
  document.querySelector('.ipt').onclick = function () {
    console.log('我被点了');
    if (timerId !== null) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      console.log('我是防抖');
    }, 1000)
  }
</script>
```

立即执行版

```
<button class="ipt" type="button" onkeyup="SomeJavaScriptCode">防抖</button>
<script>
  let timerId = null
  let flag = true
  document.querySelector('.ipt').onclick = function () {
    console.log('被点了');
    clearTimeout(timerId)
    if (flag) {
      console.log('我是防抖');
      flag = false
    }
    timerId = setTimeout(() => {
      flag = true
    }, 1000)
  }
</script>
```

### 二、什么是节流。

就是指在设定的一段时间内连续触发事件也只执行一次。

举例：设定1000毫秒执行，在1000毫秒内触发多次，也是在1000毫秒后执行一次

形象举例：技能CD，等cd过后再点技能才能生效

#### 节流使用场景

- 高频事件：快速点击、鼠标滑动、resize事件、scroll事件
- 下拉加载
- 视频播放记录时间等

示例：非立即执行版

```
<button class="ipt" type="button" onkeyup="SomeJavaScriptCode">节流</button>
<script>
  let timerId = null
  document.querySelector('.ipt').onclick= function () {
    console.log('我被点了');
    if (timerId !== null) {
      return
    }
    timerId = setTimeout(() => {
      console.log('我是节流');
      timerId = null
    }, 1000)
  }
</script>
<button class="ipt" type="button" onkeyup="SomeJavaScriptCode">节流</button>
<script>
  let timerId = null
  let flag = true
  document.querySelector('.ipt2').onclick = function () {
    if (flag) {
      console.log("我是节流");
      flag=false
      timerId = setTimeout(() => {
        flag = true
      }, 1000)
    }
    console.log('我被点了');
  }
</script>
```

> 一般用lodash库，利用里面的debounce和throttle