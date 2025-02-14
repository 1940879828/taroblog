---
title: vue3+vite实现主题换肤/黑暗模式
date: 2023-04-19 11:20:40
tags: ['Vue','vite','less']
categories: ['前端','Vue']
cover: http://qny.bioart.icu/blog/18.jpg
---

利用less和css变量实现动态修改Css变量

vue3包版本：

```powershell
├── @vitejs/plugin-vue@4.1.0
├── less-loader@7.3.0
├── less@4.1.3
├── style-resources-loader@1.5.0
├── vite@4.2.1
├── vue-cli-plugin-style-resources-loader@0.1.5 
└── vue@3.2.47
```

vue2包版本：

```powershell
├── @babel/core@7.21.8
├── @babel/eslint-parser@7.21.8
├── @vue/cli-plugin-babel@5.0.8
├── @vue/cli-plugin-eslint@5.0.8
├── @vue/cli-plugin-router@5.0.8
├── @vue/cli-service@5.0.8
├── core-js@3.30.2
├── eslint-config-prettier@8.8.0
├── eslint-plugin-prettier@4.2.1
├── eslint-plugin-vue@8.7.1
├── eslint@7.32.0
├── less-loader@11.1.0
├── less@4.1.3
├── prettier@2.8.8
├── style-resources-loader@1.5.0
├── vue-cli-plugin-style-resources-loader@0.1.5
├── vue-router@3.6.5
├── vue-template-compiler@2.7.14
└── vue@2.7.14
```

vue3配置**vite.config.js：** 

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve('src/theme/style.less')}";`,
        },
        javascriptEnabled: true
      }
    }
  },
})
```

vue2配置**vue.config.js** 

```js
const { defineConfig } = require('@vue/cli-service')
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        // 这个是加上自己的路径,不能使用(如下:alias)中配置的别名路径
        path.resolve(__dirname, "./src/theme/style.less"),
      ],
    },
  },
})
```

**/src/theme/style.less** 

```less
// 默认的主题颜色
@primaryColor: var(--primaryColor, #000);
@primaryTextColor: var(--primaryTextColor, green);
// 导出变量
:export {
  name: "less";
  primaryColor: @primaryColor;
  primaryTextColor: @primaryTextColor;
}
```

**/src/theme/model.js** 

```javascript
export const themes = {
  default: {
    primaryColor: `${74}, ${144},${226}`,
    primaryTextColor: `${74}, ${144},${226}`,
  },
  dark: {
    primaryColor: `${0},${0},${0}`,
    primaryTextColor: `${0},${0},${0}`,
  },
};
```

**/src/theme/theme.js** 

```javascript
import { themes } from "./model";
// 修改页面中的样式变量值
const changeStyle = (obj) => {
  for (let key in obj) {
    document
      .getElementsByTagName("body")[0]
      .style.setProperty(`--${key}`, obj[key]);
  }
};
// 改变主题的方法
export const setTheme = (themeName) => {
  localStorage.setItem("theme", themeName); // 保存主题到本地，下次进入使用该主题
  const themeConfig = themes[themeName];
  // 如果有主题名称，那么则采用我们定义的主题
  if (themeConfig) {
    localStorage.setItem("primaryColor", themeConfig.primaryColor); // 保存主题色到本地
    localStorage.setItem("primaryTextColor", themeConfig.primaryTextColor); // 保存文字颜色到本地
    changeStyle(themeConfig); // 改变样式
  } else {
    let themeConfig = {
      primaryColor: localStorage.getItem("primaryColor"),
      primaryTextColor: localStorage.getItem("primaryTextColor"),
    };
    changeStyle(themeConfig);
  }
};
```

**组件中css使用：** 

```css
background: rgba(@primaryColor, 1);
color: @primaryTextColor;	

```

**JS切换主题：**

```javascript
import { setTheme } from "../theme/theme";
//调用切换方法
setTheme("default");
// 更改为自定义主题
custom() {
    let newColor = {
        r: 12,
        g: 33,
        b: 234,
    };
    let newPrimaryColor = `${newColor.r},${newColor.g},${newColor.b}`;
    localStorage.setItem("primaryColor", newPrimaryColor); // 将新的主题色存入本地
    setTheme();
},
```



> 参考:
>
>  https://zhuanlan.zhihu.com/p/440387917 
>
> https://blog.csdn.net/LiuJia20010827/article/details/127235713 
>
> https://blog.csdn.net/V_AYA_V/article/details/117783527 

