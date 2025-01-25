---
title: Cookie、localStorage、sessionStorage
tags: ['Html','Js']
date: 2020-04-11 15:47:29
categories: 'Js'
cover: http://qny.bioart.icu/blog/17.jpg
---

## 一、他们之间的区别

|                | cookie         | localStorage | sessionStorage |
| -------------- | -------------- | ------------ | -------------- |
| 大小           | 4kb            | 10Mb         | 5Mb            |
| 兼容           | H4/H5          | H5           | H5             |
| 访问           | 任何窗口       | 任何窗口     | 同一窗口       |
| 有效期         | 手动设置       | 无           | 到窗口关闭     |
| 存储位置       | 浏览器和服务器 | 浏览器       | 浏览器         |
| 与请求一起发送 | 是             | 否           | 否             |
| 语法难易度     | 复杂           | 简易         | 简易           |
| 安全性         | 不安全         | 不安全       | 不安全         |

## 二、应用场景

Cookie：

- 会话管理：登陆、游戏得分或者服务器应该记住的其他内容
- 个性化：用户偏好、主题或者其他设置
- 追踪：记录和分析用户行为
- 特点：服务器和浏览器存储

localStorage：

- 购物车等、长期本地存储

sessionStorage：

- 表单：表单拆分成多个子页面，按步骤引导填写
- 临时本地存储

## 三、cookie的使用

### 1.cookie基本语法格式

格式：name=value;[expires=date];[path=path];[domain=somewhere.com];[secure]

**设置cookie**：document.cookie='username=xxx';

**获取cookie**：alert(document.cookie);

### 2.cookie有一个中文编码问题

解决存储中文时的乱码问题：编码存储、解码读取

```
document.cookie='user='+encodeURIComponent('钢铁侠'); //编码写入

alert(decodeURIComponent(document.cookie)); //解码读取
```

### 3. expires参数

expires：过期时间

- 必须填写日期对象

- 系统自动清除过期cookie

- 默认值为会话，整个浏览器关闭为会话结束

```
function afterOfDate(n){
    var d=new Date();
    var day=d.getDate();
    d.setDate(n+day);
    return d
}
//设置一条7天后过期的cookie
document.cookie="username=xxx;expires="+afterOfDate(7);
```

### 4.添加cookie

```
Cookie c = new Cookie("username",encodeURIComponent('钢铁侠'));// 新建一个Cookie对象
c.setMaxAge(24*60*60);                    // 设置过期时间1天，以秒为单位
response.addCookie(c);                    // 保存cookie到客户端
```

### 5. 删除cookie

1. cookie同名添加覆盖上一条记录
2. 浏览器自动删除过期的cookie

```
document.cookie="username=;expires="+afterOfDate(-1);
//将时间设置为过去的天数cookie就被浏览器删掉了

//快速获取过去时间 1970年
new Date(0);

document.cookie="username=;expires="+new Date(0);
```

### 6.其他参数

格式：name=value;[expires=date];[path=path];[domain=somewhere.com];[secure]

- path 限制访问路径

- - 如果不去设置，默认是加载当前html文件的路径
  - 设置的cookie路径和当前加载文件的路径必须一致，不一致访问失败

- domain 限制访问域名

- - 如果不去设置，默认是加载当前.html文件的服务器域名/ip
  - 设置cookie域名和加载当前文件的域名不一致，设置cookie失败

- secure 安全

- - 如果不设置，设置cookie，可以通过http或者https协议加载文件设置
  - 设置了，只能通过https协议加载cookie

- HttpOnly 安全

- - JavaScript [Document.cookie](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie) API 无法访问带有 HttpOnly 属性的 cookie，此预防措施有助于缓解[跨站点脚本（XSS）(en-US)](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks)攻击。
  - 并不是说使用了就绝对安全，不要把敏感重要信息存储到cookie这是很危险的。

### 7.简单的封装

```
//添加cookie
function setCookie(name,value,time){ 
    var date= new Date(); 
    date.setDate(date.getDate()+time); 
    document.cookie = name+"="+value+";expires="+date; 
} 

//获得cookie
function getCookie(name){ 
    var arr = document.cookie.split(";"); 
    for(var i=0; i<arr.length; i++){ 
    var arr2 = arr[i].split("="); 
        if(arr2[0] == name){ 
            return arr2[1]; 
        } 
    } 
    return null; 
} 

//删除cookie
function removeCookie(name){ 
    setCookie(name,"",0) 
} 
```

## 四、localStorage的使用

这个比cookie简单的多

```
<h2>localStorage
  特点：浏览器关闭还存在
</h2>
<button onclick="saveDate()">点我保存一个数据</button>
<button onclick="getdate()">点我读取一个数据</button>
<button onclick="delDate()">点我删除一个数据</button>
<script>
  let p = {name:'张三',age:18}
  function saveDate(){

    localStorage.setItem('msg','hello!')
    localStorage.setItem('person',JSON.stringify(p))
  }
  function getdate(){
    console.log(localStorage.getItem('person'));
  }
  function delDate(){
    localStorage.removeItem('person')
    localStorage.clear()
  }
</script>
```

## 五、sessionStorage的使用

```
<h2>
  特点：浏览器关闭就没了
</h2>
<button onclick="saveDate()">点我保存一个数据</button>
<button onclick="getdate()">点我读取一个数据</button>
<button onclick="delDate()">点我删除一个数据</button>
<script>
  let p = {name:'张三',age:18}
  function saveDate(){

    sessionStorage.setItem('msg','hello!')
    sessionStorage.setItem('person',JSON.stringify(p))
  }
  function getdate(){
    console.log(sessionStorage.getItem('person'));
  }
  function delDate(){
    sessionStorage.removeItem('person')
    sessionStorage.clear()
  }
</script>
```




