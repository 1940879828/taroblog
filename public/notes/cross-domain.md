---
title: 跨域的解决办法
tags: 'Js'
date: 2023-04-11 18:47:29
categories: 'Js'
cover: http://qny.bioart.icu/blog/17.jpg
---

### 一、浏览器的同源策略

为了安全，不同源的请求会发送出去，但是不让你的JS拿到响应内容。不能跨过这个域去访问其他域的功能。

这里的域指的是协议、主机和端口号都要需要一致的URL

- 协议：http://

- 主机：www.bilibili.com
- 端口号: 8080

换句话说：俩个URL必须同源才允许交互

如果我们需要让member.bilibili.com和mail.bilibili.com进行资源交互，就需要用到跨域的技术来解决这个问题。

### 二、JSONP处理跨域

既然不同源不能资源交互，那为什么我写<script>标签里的link和script引用可以在别的源请求脚本呢？

这是因为当时在设计script标签的时候，就允许在别的源请求脚本。

能够跨域的标签有：script link img 

利用这些标签能够跨域的“漏洞”进行跨域的办法就叫JSONP

### 1.JSONP操作

HTML5里的script标签默认的type属性是text/javascript，定义了这个类型，请求的内容会被路利器执行。换句话说，script标签请求返回的代码就会被浏览器以JS代码的方式执行

那我们就可以这样操作

1.在客户端创建好函数

```
<script>
  function aa(data){
    console.log(data)
  }
</script>
```

2.在服务端调用你创建好的函数**并传参**

```
<?php
	echo "bb('这是服务端的资源')"
?>
```

这样我们就可以获取到服务端的数据了，至于怎么同步函数名：我们可以利用URL传参把函数名传过去。

#### 2. 总结一下JSONP跨域过程：

1. 客户端准备一个函数 function(真实数据){}
2. 然后在URL上提供给服务器额外参数
3. 服务器收到这些额外的参数就会执行相应的代码
4. 服务器把数据外包一个JS函数再以JSON数据的形式回传给客户端
5. 客户端收到后调用提前设置好的函数执行服务器传过来的数据，执行函数并获取数据

#### 3. JSONP名字的由来

因为是JSON包含JS数据，JSON with Padding，简称JSONP。

#### 4. JSONP的缺点

1. 只支持GET不支持POST
2. 失败时不会返回各种HTTP状态码
3. 不安全，假如提供jsonp的服务存在页面注入漏洞，即它返回的javascript的内容被人控制的。那么结果是什么？所有调用这个 jsonp的网站都会存在漏洞。于是无法把危险控制在一个域名下…所以在使用jsonp的时候必须要保证使用的jsonp服务必须是安全可信的。

因为JSONP有以上种种缺点，因此就诞生了CORS这种方法。

### 三、CORS解决跨域问题

当浏览器进行跨域请求的时候，会在请求头部添加origin:协议+主机+端口，表明自己的协议、主机和端口号，当服务器接收到请求并且看到这个origin头部时，如果需要允许能够访问，就得添加头部Access-Control-Allow-Origin:协议+主机+端口到响应里面，浏览器看到服务器传回来的这个头部就知道能不能进行跨域请求了

后端会设置一个Access-Control-Allow-Origin，也就是允许什么源过来拿资源。

没配置CORS：不同源的请求会发送出去，但是不让你的JS拿到响应内容。

配置了CORS：不同源的请求发送出去，服务端告诉浏览器可以拿到响应内容

### 四、Nginx反向代理解决跨域问题

客户端先将请求发送给代理服务器，因为代理服务器与服务端服务器都属于服务器之间的沟通，没有同源限制问题所以可以拿到资源

#### Vue开启代理服务器

1. 代理服务器

1. 1. nginx
   2. vue-cli

```
module.exports={
    // 关闭语法检查
    lintOnSave:false,
    // 开启代理服务器
    devServer:{
        proxy: 'http://localhost:5000'
    }
}
```

请求的资源8080没有就会转发给5000

```
devServer:{
        proxy: {
            // 请求前缀是api才走代理
            '/students' : {
                target: 'http://localhost:5000',
                pathRewrite:{'^/ai':''}，
                ws:true,//用于支持websock
                changeOrigin:false//是否告知服务器源地址 host值 默认true
            },
        }
    }
```

配置繁琐，请求资源必须加前缀