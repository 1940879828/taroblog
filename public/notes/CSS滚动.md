---
title: CSS滚动条原理与自定义样式指南
tags: ['前端','Css']
date: 2025-02-20 13:39:29
categories: ['前端','Css']
description: 深度解析CSS滚动条的形成机制与自定义样式实现方案，包含常见问题解决方案与浏览器兼容性处理建议
---

## 滚动内容形成的必要条件

### CSS Overflow属性解析

[MDN官方文档-Overflow属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow)
[菜鸟教程-Overflow属性](https://www.runoob.com/css/css-overflow.html)

overflow 属性控制内容溢出元素框时在对应的元素区间内是否添加滚动条。

| 值 | 描述 | 
|---------|---------|
| visible | 默认值。内容不会被修剪，会呈现在元素框之外。 |
| hidden | 内容会被修剪，并且其余内容是不可见的。 |
| scroll | 内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。 |
| auto | 如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。 |
| inherit | 规定应该从父元素继承 overflow 属性的值。 |

⚠️ 重要注意事项：

1. 仅对明确设置高度的块级元素生效
2. MacOS系统默认隐藏滚动条（需滑动时才会显示，即使设置scroll值）

实现局部滚动需要满足两个核心条件：

1. 容器具有确定的高度值（非auto）
2. 设置`overflow: scroll`或`overflow: auto`

### 典型问题场景分析

```html
<!DOCTYPE html>
<head>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    .nav {
      width: 100%;
      height: 64px;
      background: lightcoral;
    }

    .main {
      /*这里的100%应该为100vh*/
      height: calc(100% - 64px);
      background: lightblue;
    }

    .content {
      height: 1300px;
    }
  </style>
</head>

<body>
  <nav class="nav"></nav>
  <main class="main">
    <div class="content"></div>
  </main>
</body>
</html>
```

看起main被设置了高度，滚动条应该出现在main内，但实际运行会发现滚动条还是在body上的。

原因是：默认情况下，`html` 和 `body` 的高度由内容撑开，而非视口高度。

- 当 .main 设置 height: calc(100% - 64px) 时，100% 继承的是 body 的高度，而 body 的高度此时等于其内容高度（即 .nav 的 64px + .main 的内容高度），形成循环依赖。

所以解决办法就是

- 给body或html设定高度为100vh，
- 或把`height: calc(100% - 64px)`的`100%`设置为`100vh`

## 滚动条样式

### 浏览器兼容

目前(2025/2/20)，推荐使用老的[::-webkit-scrollbar](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::-webkit-scrollbar)属性

因为新的属性没有旧的能改的多，像是圆角和hover之类
- scrollbar-color: initial;
- scrollbar-width

⚠️注意：设置了新的scrollbar-color和scrollbar属性会覆盖老webkit属性，导致webkit属性失效

```css
* {
  /* 平滑锚点跳转时的滚动 */
  scroll-behavior: smooth;
  /*谷歌121版本后的新属性与旧webkit-scrollbar冲突*/
  scrollbar-color: initial;
  scrollbar-width: initial;
}

/* 针对所有元素的Webkit内核浏览器滚动条进行全局样式设置 */
*::-webkit-scrollbar {
  height: 6px;    /* 水平滚动条的高度 */
  width: 6px;     /* 垂直滚动条的宽度 */
}

/* 隐藏滚动条两端的箭头按钮 */
*::-webkit-scrollbar-button {
  display: none;  /* 不显示滚动条按钮 */
}

/* 自定义滚动条滑块样式 */
*::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-color);  /* 使用CSS变量定义滑块颜色 */
  border-radius: 3px;                        /* 滑块圆角（半径是高度/宽度的一半） */
}

/* 鼠标悬停时滑块的样式变化 */
*::-webkit-scrollbar-thumb:hover {
  background-color: var(--scrollbar-hover-color);  /* 悬停时使用更醒目的颜色 */
}

/* 
注意事项：
1. 这些样式仅在Webkit内核浏览器生效（Chrome/Safari/Edge等）
2. --scrollbar-color 和 --scrollbar-hover-color 是CSS变量，需在根元素定义
3. 通过调整 width/height 值可以改变滚动条粗细
4. border-radius 设置为尺寸的一半会呈现胶囊形状
5. 通配符 * 表示应用于所有元素，可根据需要替换为特定选择器
*/
```
