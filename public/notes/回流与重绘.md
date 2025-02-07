---
title: 回流与重绘
tags: '前端'
date: 2023-04-20 18:21:29
categories: '前端'
cover: http://qny.bioart.icu/blog/19.jpg
---

# 浏览器渲染过程

1. 解析获取到的HTML、生成DOM树；解析CSS，生成CSSOM树
2. 结合DOM树和CSSOM树，生成渲染树(rander tree)
3. 根据生成的渲染树，进行**回流(Layout)**，得到节点几何信息（位置大小)
4. **重绘(Painting)**：根据计算好的信息绘制整个页面
5. Display将像素发送给GPU，展示在页面上。

![img](http://qny.bioart.icu/blog/20.png)

# 一、重绘

触发重绘的条件：不影响其他元素的元素样式改变（宽高、大小、位置等不变）。

- 例如：outline、visibility、color、background-color等
- 只改变自身样式，不会影响到其他元素

# 二、回流

回流的触发条件：元素的大小或位置发生改变（当页面布局和几何信息发生改变的时候）

- 例如：增删DOM元素、元素位置发生变化、尺寸发生变化、内容发生变化（文本变化或图片替代）、页面一开始渲染、浏览器窗口尺寸变化

回流一定触发重绘，重绘不一定触发回流

# 三、减少回流

1. **DOM的增删行为**

比如你要删除某个节点，给某个父元素增加子元素，这类操作都会引起回流。如果要加多个子元素，最好使用documentfragment。

1. **几何属性的变化**

比如元素宽高变了，border变了，字体大小变了，这种直接会引起页面布局变化的操作也会引起回流。如果你要改变多个属性，最好将这些属性定义在一个class中，直接修改class名，这样只用引起一次回流。

1. **元素位置的变化**

修改一个元素的左右margin，padding之类的操作，所以在做元素位移的动画，不要更改margin之类的属性，使用定位脱离文档流后改变位置会更好。

1. **获取元素的偏移量属性**

例如获取一个元素的scrollTop、scrollLeft、scrollWidth、offsetTop、offsetLeft、offsetWidth、offsetHeight之类的属性，浏览器为了保证值的正确也会回流取得最新的值，所以如果你要多次操作，最取完做个缓存。

1. **浏览器窗口尺寸改变**

resize事件发生也会引起回流，使用节流函数减少回流次数。

1. **尽量避免使用表格布局**

当我们不为表格td添加固定宽度时，一列的td的宽度会以最宽td的宽作为渲染标准，假设前几行td在渲染时都渲染好了，结果下面某行的一个td特别宽，table为了统一宽，前几行的td会回流重新计算宽度，这是个很耗时的事情。

# 四、总结

引起DOM树结构变化，页面布局变化的行为叫回流，且回流一定伴随重绘。

不会引起DOM树变化，页面布局变化的行为叫重绘，且重绘不一定会便随回流。

我们应该减少回流的次数以提高性能。

> 参考：
>
> https://www.cnblogs.com/echolun/p/10105223.html>
>
> <https://www.jianshu.com/p/8b01b5a0fb48>
>
> <https://blog.csdn.net/weixin_48491416/article/details/123452651>
>
> <https://blog.csdn.net/io_123io_123/article/details/123710018>
>
> <https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work>

