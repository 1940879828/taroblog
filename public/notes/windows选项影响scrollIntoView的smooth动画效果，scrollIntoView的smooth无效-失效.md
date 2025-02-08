---
title: windows选项影响scrollIntoView的smooth动画效果，scrollIntoView的smooth无效/失效
date: 2024-08-18 15:19:36
tags: ['JavaScript','Windows','问题']
categories: ['前端','JavaScript']
keywords: ['win11','scrollIntoView','平滑失效']
description: scrollIntoView原来可运行的情况下突然不可运行，表现为scrollIntoView设置了smooth但没有平滑过渡效果，smooth无效/失效，可能是设置了windows性能选项导致的。
cover: http://qny.bioart.icu/blog/202408181601875.png
---

问题：项目中scrollIntoView设置了smooth平滑过渡失效。

解决：是因为调整的windows性能选项导致的。

![2d8cc6a6b15140ce665a7669fae81881](http://qny.bioart.icu/blog/202408181601875.png)

如图所示：打开【控制面板】- 搜索【性能】 - 调整 Windows 的外观和性能选项 - 开启【窗口内的动画控件和元素】。

设置完后点击应用或者确定，恢复平滑过渡效果。
