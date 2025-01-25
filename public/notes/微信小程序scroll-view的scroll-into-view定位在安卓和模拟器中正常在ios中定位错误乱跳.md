---
title: 微信小程序scroll-view的scroll-into-view定位在安卓和模拟器中正常在ios中定位错误乱跳
date: 2024-08-31 11:53:54
categories: ['前端','微信小程序']
tags: ['微信小程序','问题']
cover: http://qny.bioart.icu/blog/202408311154158.png
---

需求是一进入页面就要执行scroll让页面滚动到对应位置。



原因是元素未渲染完成获取不到id导致定位错误



解决办法是：设置延迟时间等待元素加载完就可以了



![img](http://qny.bioart.icu/blog/202408311154158.png)
