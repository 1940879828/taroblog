---
title: CSS居中的几种写法
tags: ['Css']
date: 2023-05-07 21:39:29
categories: ['前端','Css']
---

# 一、行内元素的垂直水平居中方法

## 1.一行的垂直水平居中

```
<body>
  <div class="out">
    <span class="in">要居中的行内元素span</span>
  </div>
</body>
<style>
  .out{
    width: 300px;
    height: 300px;
    background-color: grey;
    line-height: 300px;
    text-align: center;

  }
  .in{
    background-color: blue;
  }
</style>
```

其实设置了 `line-height` 就可以让文本垂直居中，并不需要同时设置 `height`，这里也是一直存在的一个误区。

这种方式实现垂直居中运用的是 CSS 中“行距的上下等分机制”

这种方式实现的垂直居中是“近似”的，并不是完美的垂直居中，因为文字字形的垂直中线位置普遍要比真正的“行框盒子”的垂直中线位置低，而由于我们平时使用的 font-size 比较小，使得这点偏差不容易察觉出来，那么感官上也就看成是垂直居中了。

## 2.多行或者图片等替换元素的垂直居中

```
<body>
  <div class="out">
    <span class="in">
      要居中的行内元素span<br>
      要居中的行内元素span
    </span>
  </div>
</body>
<style>
.out{
  width: 300px;
  height: 300px;
  background-color: grey;
  line-height: 300px;
  text-align: center;
}
.in{
  background-color: blue;

  display: inline-block;
  vertical-align: middle;
  line-height: 20px;
}
</style>
```

设置 `.in` 元素的 `display` 为 `inline-block`。作用在于既能重置外部的 `line-height` 为正常大小，又能保持行内元素特性，从而可以设置 `vertical-align` 属性，以及产生一个非常关键的“行框盒子”。我们需要的其实并不是这个“行框盒子”，而是每个“行框盒子”都会附带的一个产物 —— “幽灵空白节点”，即一个宽度为 0，表现如同普通字符的看不见的“节点”。有了这个“幽灵空白节点”，我们的 `line-height: 300px;` 就有了作用的对象，从而相当于在 `.in` 元素前面撑起了一个高度为 300px 的宽度为 0 的行内元素。

因为行内元素默认都是基线对齐的，所以我们通过对 `.in` 元素设置 vertical-align: middle; 来调整多行文本的垂直位置，从而实现我们想要的“垂直居中”效果。这种方式也适用于 `图片等替换元素` 的垂直居中效果。当然这里的“垂直居中”也是近似的，这是由于 `vertical-align` 导致的，具体为什么可以深入了解 `vertical-align: middle;`。

# 二、块元素的垂直水平居中方法

## 1.position + margin: auto

```
<body>
  <div class="out">
    <div class="in"></div>
  </div>
</body>
<style>
.out{
  width: 300px;
  height: 300px;
  background-color: grey;

  position: relative;
}
.in{
  background-color: blue;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>
```

设置 `.out` 元素为相对定位 `position: relative;`，这样其子元素设置绝对定位时就相对它了。

然后设置 `.in` 元素为绝对定位 `position: absolute;` 并设置它的 `top`、`left`、`bottom`、`right` 都为0，这样该元素的元素的尺寸表现为“格式化宽度和格式化高度”，和 `<div>` 的“正常流宽度”一样，同属于外部尺寸，也就是尺寸自动填充父级元素的可用尺寸，但由于此时我们设置了 .content 元素的宽高，就限制了元素自动填充，这样就多出来50px的空间了。

最后我们设置 `.in` 元素为 `margin: auto;` ，此时根据 auto 的计算规则，将上下左右剩余空间全部等分了，自然就居中了。

## 2.position + translate

```
<body>
  <div class="out">
    <div class="in"></div>
  </div>
</body>
<style>
.out{
  width: 300px;
  height: 300px;
  background-color: grey;

  position: relative;
}
.in{
  width: 50px;
  height: 50px;
  background-color: blue;
  
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,50%);
}
</style>
```

设置 .out 元素为相对定位 position: relative;，这样其子元素设置绝对定位时就相对它了。

然后设置 `.in` 元素为绝对定位 `position: absolute;` 并设置 `top: 50%;`、`left: 50%;`，这样 `.in` 元素的左上角就位于 `.out` 元素的中心了。

最后设置 `.in` 元素 `transform: translate(-50%, -50%);` 将自身左移及上移宽高的一半，这样 `.in` 元素的中心处于 `.out` 元素的中心处，自然就实现了居中效果。

## 3.flex布局

```
<body>
  <div class="out">
    <div class="in"></div>
  </div>
</body>
<style>
.out{
  width: 300px;
  height: 300px;
  background-color: grey;

  display: flex;
}
.in{
  background-color: blue;
  width: 50px;
  height: 50px;
  
  margin: auto;
}
</style>
```

设置 `.out` 元素 `display:flax;`

然后设置 `.in` 元素为 `margin:auto;` 即可实现居中

这是毋庸置疑的最佳解决方案，我们不需要设置 `.in` 元素为绝对定位，`margin: auto` 自然就可以作用于宽高，而且我们也不需要设置 `.in` 元素的宽高， 因为Flexbox(伸缩盒)是专门针对这类需求所设计的。

Flexbox 的另一个好处在于，它还可以将匿名容器(即没有被标签包裹的文本节点)垂直居中。比如我们不设置 `.out` 元素为 `display: flex;`，而是设置 .in 元素为 `display: flex;`，并借助 Flexbox 规范所引入的 `align-items` 和 `justify-content` 属性，我们可以让它内部的文本也实现居中（我们可以对.out 元素使用相同的属性来使 `.content` 元素元素居中，但比 `margin: auto` 方法要更加优雅一些，并且同时起到了回退的作用）。



>  引用：
>
> https://article.itxueyuan.com/L4wG3

