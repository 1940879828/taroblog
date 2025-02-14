---
title: JavaScript入门
tags: ['前端','JavaScript']
date: 2020-05-07 18:43:44
categories: ['前端','JavaScript']
cover: http://qny.bioart.icu/blog/9.jpeg
---

# 一.JavaScript简介

### 1.1. 什么是JavaScript

- 官方概念：跨平台的脚本语言
  - 平台：运行环境，这里一般指操作系统
  - 跨平台：在各种操作系统下，都可以运行

### 1.2. 什么是脚本语言

- 特点：不能独立运行，依赖于网页

### 2.1. JS的发展历史

1995年，NetScape公司，布兰登艾奇发明了一种运行在浏览器网页里的脚本语言Livescript。

通过本地而不是服务器进行验证，为了快速的验证表单信息，这在当时来说是一个前所未有的壮举。

### 2.2 浏览器大战

LiveScript打开了浏览器市场，各大互联网巨头，都嗅到了蛋糕的味道，都想着分一杯羹，首当其中就是微软IE浏览器。

IE当年为了跟NetScape争夺市场份额。不甘落后很快退出适用于IE浏览器的JScript脚本语言。

由于缺乏统一标准，各个浏览器厂商发明的脚本语言，在用法和规范上不一致，成为了网页开发人员的噩梦。

1997年，ECMA（欧洲计算机制造商协会）成立了TC39委员会，委员会的成员基本都来自各大浏览器厂商。

这里面最重要的成员，就是当时如日中天的SUN公司，大家坐下来讨论之后，经过了大概1个月的世界，就快速制定出了浏览器脚本语言第一个全球标准。官方名称为ECMA Script编号ECMA-262。

由于总所周知的原因，大家没有忍住，蹭了一把JAVA热度，最终将其命名为JavaScript

至此，JavaScript诞生

如果非要说Java和Javascript有什么关系的话，就是Javascript在语法及很多API设计，内存结构设计上，直接借鉴和抄袭了Java

从这件事情可以看出，Java能这么经久不衰，是因为它非常优秀的设计（Java世界第一~~~

## 二.JavaScript-基础内容

### 1. 编辑工具和运行环境

- VSCode
- IE/firefox(火狐)/chrome(谷歌)/edge

### 2. JavaScript组成

1. ECMAScript
   - 版本：1,2,3,4,5,5.1,6
2. DOM
   - 文档对象模型（Document Object Model）
3. BOM
   - 浏览器对象模型（Browser Object Model）

### 3. script标签

- 所有js代码在script标签中编写
- 属性
  - type='text/javascript' 声明标签内容文本格式（可省略
  - src='demo.js' 引入外部js文件（处于引入文件功能时，Script标签内的代码将不执行）
- 注意：
  - 可以有多个script标签，多个script标签自上而下顺序执行

### 3.1 script标签属性

| 属性                                                         | 值              | 描述                                                   |
| ------------------------------------------------------------ | --------------- | ------------------------------------------------------ |
| [async](https://www.w3school.com.cn/html5/att_script_async.asp) | async           | 规定异步执行脚本（仅适用于外部脚本）。                 |
| [defer](https://www.w3school.com.cn/html5/att_script_defer.asp) | defer           | 规定当页面已完成解析后，执行脚本（仅适用于外部脚本）。 |
| [type](https://www.w3school.com.cn/html5/att_script_type.asp) | *MIME_type*     | 规定脚本的 MIME 类型。                                 |
| [charset](https://www.w3school.com.cn/html5/att_script_charset.asp) | *character_set* | 规定在脚本中使用的字符编码（仅适用于外部脚本）。       |
| [src](https://www.w3school.com.cn/html5/att_script_src.asp)  | *URL*           | 规定外部脚本的 URL。                                   |

### 4. 向页面输出内容

1. document.write('内容');	向body中添加文本
2. alert('内容');    弹出提示框
3. console.log(‘内容’)    向控制台输出

### 5. JavaScript-常量和变量

#### 5.1. 常量：值不可以改变的叫做常量

- 数据类型：
  - 基本数据类型：
    - 数字
      - 类型：number
      - 例子：100 -20 3.14
    - 布尔值
      - 类型：boolean
      - 例子：true false
    - 字符串：
      - 类型：所有带单引号或双引号的
      - 例子：'hello' "hello" '100' "3.14"
  - 特殊数据类型
    - null 空
    - undefined 未定义
    - NaN（not a number 值不是数字）
  - 复合/引用数据类型
    - 数组

#### 5.2. 变量：值可以被修改的叫做变量

1. 声明变量（必须声明以后才能使用）
   - 关键字（系统征用的有特殊功能的单词叫关键字）：var 声明变量。
2. 初始化：声明变量时，直接给这个变量赋值叫做初始化。
3. 如果我们声明变量时，没有值赋给这个变量，默认值为undefined。

注意：为了提高整个程序运行的效率，我们可以将声明变量时，没有值赋值给这个变量的时候，默认值设成null，提高程序运行效率

### 6. 变量命名 和 弱引用

#### 6.1. 变量命名

- 标识符：所有用户自定义的名字叫做标识符。
  - 变量名也是标识符。
- 硬命名规则：
  1. 只能由数字、字母、下划线和美元符号($)组成
  2. 不能以数字开头
  3. 不能为保留字和关键字
  4. 大小写敏感
- 软命名规则：
  1. 见名思意（使用英文全称）
  2. 单词个数超过2个
     - 驼峰式命名：className
     - 下划线命名：class_name

#### 6.2. 变量弱引用

- 在JS中变量为弱引用类型：赋值成什么数据类型就是什么类型
- 注意：不建议改变当前变量的数据类型，容易引起歧义
- typeof关键字：
  - 格式： typeof 常量/变量
  - 功能：输出当前常量或变量的数据类型。

### 7. 运算符

1. 算术运算
   - `+ - * / %(取余)`
2. 关系运算符
   - `> < >= <= == != === !==`
3. 逻辑运算符
   - `&& || !`
4. 一元运算符
   - `++ --`
5. 赋值运算符
   - 基本赋值运算符 =
   - 复合赋值运算符 += -= /= ...

#### 7.1. 关系运算符

1. 两个单个字符比较：直接比较ASCII值。
2. 两个多个字符比较：逐位比较ASCII值，一旦得出大于或小于的结果停止后面的比较得出结果。
3. 其中一个是数值：另一个转换为数值，再进行比较。
4. 其中一个是NaN：==返回false，！=返回true；并且NaN和自身不等。
5. ===恒等，相比==数据类型也加入判断条件

特殊值：

| 关系式          | 值    |
| --------------- | ----- |
| null==undefined | true  |
| 'NaN'==NaN      | false |
| 5==NaN          | false |
| NaN==NaN        | false |
| false==0        | true  |
| true==1         | true  |
| true==2         | false |
| undefined==0    | false |
| null==0         | false |
| '100'==100      | true  |
| '100'===100     | false |

#### 7.2. 逻辑运算符

与运算短路操作：当表达式1为false的时候，表达式2就不执行，直接得出结果为false。

或运算短路操作：

#### 7.3. 自动数据类型转换

- 不同数据类型之间无法进行计算，将数据转成同一数据类型，再进行计算。
- 任何类型的数据和字符串类型的数据相加时，其他数据类型会自动转换为字符串类型。此时相加表示“**拼接**“的意思
  - 如果字符串是一个纯数字字符组成的字符串，转成对应的数字
  - 如果字符串中含有除数字以外的字符，转成NaN，NaN和任何数据运算结果都为NaN。
  - 除字符串以外的数据，在进行运算时，先转成数字，再进行运算。
    - true→1 ， false→0 ， null→0 ， **undefined→NaN**

#### 7.4. 强制数据类型转换：

- Boolean() 其他数据类型强制转成布尔值

  - 数字：非0即真
  - 字符串：非空即真

- Number() 其他数据类型转数字

  - 只有纯数字字符字符串转成数字，其他为NaN

- parseInt()取整

  - 1.取整

    ```javascript
    parseInt("25a")//25
    parseInt("2a5a")//2
    parseInt("a25a")//NaN
    parseInt("3.14)//3
    ```

  - 2.将别的进制转成十进制 必须传入字符串

    ```javascript
    var str1="110100"
    alert(parseInt(str1,2))//52
    ```

- parseFloat() 取浮点数

  - 举例

    ```javascript
    parseFloat("3.14b")//3.14
    parseFloat("3.1b4b")//3.1
    parseFloat("a3.1b4b")//NaN
    ```

#### 8. 流程语句练习,输出当前年的第多少天

```javascript
var year = 2000;
var month = 1;
var date = 15;
var sum = 0;
switch(month){
    case 12:
        sum += 30;
    case 11:
        sum += 31;
    case 10:
        sum += 30;
    case 9:
        sum += 31;
    case 8:
        sum += 31;
    case 7:
        sum += 30;
    case 6:
        sum += 31;
    case 5:
        sum += 30;
    case 4:
        sum += 31;
    case 3:
        sum += 28;
        if(uear % 4==0 && year %100 !=0 ||year % 400==0){
            sum += 1;
        }
    case 2:
        sum += 31;
    case 1:
        sum += date;
        break;
    default:
        alert("error")
        break;
}
alert("这是第"+sum+"天");
var week = Math.ceil(sum/7);
alert("这是第"+week+"周");
```

## 三. JavaScript-函数

#### 1. 函数的概念及作用

- 概念：函数就是把完成特定功能的一段代码**抽象出来**，使之成为程序中的一个**独立实体**，起个名字（**函数名**）。可以在同一个程序或其他程序中多次重复使用（**通过函数名调用**）。
- 作用：
  - 使程序变得简短而清晰
  - 有利于程序维护
  - 可以提高程序开发效率
  - 提高了代码重用性（复用性）

#### 2. 函数的声明与调用

```javascript
//无参无返回值
function 函数名(){
    函数体;
}
//调用
函数名();

//有参无返回值
function 函数名(形参1,形参2...){
	函数体;
}
//调用
函数名(实参1,实参2...)

//有参数有返回值
function 函数名(形参1，形参2...){
	函数体;
    return 表达式;
    //函数调用的结果为表达式的值
    //函数遇到return会中止
}
```

注意：见名思意，函数名必须体现其功能。

#### 3. 封装函数

1. 分析不确定值
2. 将不确定值声明为形参
3. 函数名与形参名都要见名思意

```javascript
//编写一个函数 计算两数加减乘除 使用传参
function operation(num1,operator,num2){
    switch(operator){
        case "+":
            return num1 + num2;
            break;
        case "-":
            return num1 - num2;
            break;
        case "*":
            return num1 * num2;
            break;
        case "/":
            return num1 / num2;
            break;
        default:
            alert("error");
            break;
    }
}

//输入n为偶数 1/2+1/4+...+1/n,奇数，1/1+1/3+...+1/n
function sum(n){
    var res=0;
    if(n % 2==0){
        for(var i = 2 ; i <= n; i += 2){
            res += 1/i;
    }else{
        for(var i = 1;i <= n; i += 2){
            res += 1/i;    
        }
    }
    return res;
}
```

#### 4. arguments

- 每一个函数内都有一个系统内置的arguments
- 作用：存储实际传入的参数
- 属性：
  - arguments.length 输出当前存储参数个数
  - arguments[下标] 访问其中的数据
- 注意：由于违反了见名思意原则，尽量使用形参，除非特殊情况。

#### 5. 函数作用域

任何程序在执行的时候都要占用内存空间。函数调用的时候也要占用内存空间。

垃圾回收机制：调用函数时，系统会分配对应的空间给这个函数使用（空间大小一般情况由这个函数里声明的变量和形参决定）。当函数使用完毕之后，这个内存空间要释放，还给系统。

注意：在函数内部声明的变量和形参是属于当前函数的内存空间里的。

内存管理机制：在函数中声明的变量和形参，会随着函数的调用被创建，随着函数的调用结束而被销毁。在函数中声明的变量和形参，有效范围是当前函数（当前函数的大括号），这个范围被称为局部作用域。

就近原则：离哪个作用域近，就使用哪个作用域内的同名变量。

```javascript
//举例
var a = 10,b=20;
function show(a){
    var b = 100;
    a += 5;
    alert(a + "," + b);
}
show(a);//15,100
alert(a + ","+ b)//10,20
```



#### 6. 递归函数

满足以下三个特点就是递归：

1. 函数自己调用自己
2. 一般情况下有参数
3. 一般情况下有return

作用：递归可以解决循环能做的所有事情，有一些循环不容易解决的事情，递归也能轻松解决。

递归编写方法：

1. 首先找临界值，即无需计算，获得的值。
2. 找这一次和上一次的关系。
3. 假设当前函数已经可以试用，调用自身计算上一次

```javascript
//计算1~n的和
function sum(n){
    var res=0;
    for(var i = 1; i<=n; i++){
		res += i;
    }
    return res;
}
alert(sun(100));//5050

//递归写法
//sum(100)=sum(99)+100;
//sum(n)=sun(n-1)+n
function sum2(n){
    if(n==1){
        return 1;
    }
    return sum(n-1)+n;
}

alert(sum(100));//5050
```

注意：一般公司明文禁止使用递归。（一旦出现故障瞬间开出一堆内存空间）

#### 6.1. 递归练习

**练习1：**

斐波那契数列，兔子繁衍问题，设有一对新生兔子，从第四个月开始他们每个月月初都生一对兔子，新生的兔子从第四个月月初开始又每个月生一对兔子，按此规律，并假定兔子没有死亡，n(n<=20)个月月末共有多少对兔子?

|      | 一月兔 | 二月兔 | 三月兔 | 四月兔 | 总数 |
| ---- | :----: | :----: | :----: | :----: | :--: |
| 一月 |   1    |   0    |   0    |   0    |  1   |
| 二月 |   0    |   1    |   0    |   0    |  1   |
| 三月 |   0    |   0    |   1    |   0    |  1   |
| 四月 |   1    |   0    |   0    |   1    |  2   |
| 五月 |   1    |   1    |   0    |   1    |  3   |
| 六月 |   1    |   1    |   1    |   1    |  4   |
| 七月 |   2    |   1    |   1    |   2    |  6   |
| 八月 |   3    |   2    |   1    |   3    |  9   |
| 九月 |   4    |   3    |   2    |   4    |  13  |

```javascript
//1. 首先找临界值，即无需计算，获得的值。
//2. 找这一次和上一次的关系。
//3. 假设当前函数已经可以试用，调用自身计算上一次
//rabbit(4) = rabbit(3) + rabbit(1);
//rabbit(n) = rabbit(n-1)  + rabbit(n - 3)
function rabbit(n){
    if(n<4){
        return 1;
    }
    return rabbit(n-1)  + rabbit(n - 3)
}
```

**练习2：**

有一堆桃子不知数目，猴子第一天吃掉一半，觉得不过瘾，又多吃了一只，第二天照此办法，吃掉剩下桃子的一半另加一只，天天如此，到第num(num<=10)天早上，猴子发现只剩一只桃子了，问这堆桃子原来有多少只？（思路：n为还剩n天吃完的桃子数）

```javascript
peach(10)/2 - 1 = peach(9);
peach(10) = (peach(9) + 1) * 2;
peach(n) = (peach(n-1) + 1) * 2;
function peach(n){
    if(n == 1){
        return 1;
    }
    return(peach(n-1) + 1) * 2;
}
```

**练习3：**

输入一个n，打印n个hello world的运行结果，

```javascript
//print(n) =print(n - 1) + 一次输出
function print(n){
    if(n == 0){
        return;
    }
    document.write("hello world<br/>");
    return print(n - 1);
}
```

## 四. JavaScript-数组

### 1.认识数组

#### 1.1. 为什么要使用数组

当我们需要表示一组数据，或者叫做一次性定义很多相似的数字或变量时，就需要使用数组，如：表示一个班级学生的成绩，一年十二个月的销售数据等等

#### 1.2. 数组的概念

- 概念：数组的字面意思就是一组数据，一组（一般情况下相同类型）的数据（不一定都是数字，可以是任意数据类型）。**数组是一种数据类型。**
- 数组的作用：使用单独的变量名来存储一系列的值

### 2.声明数组

```javascript
// 1.通过new创建数组
//		参数：传入任意的数据，存储到数组中
var arr = new Array(100,true,"hello");

// 2.省略new运算符创建数组
var arr = Array(100,true,"hello");

// 3.数组常量进行赋值。(JS一般使用中括号[])
var arr = [100,true,"hello"];
```

注意：使用1、2方法时，传入参数只有一个，并且为数字的时候，直接声明这么长的一个数组（数字为数组的长度）。

### 3.数组属性

- 数组.length 返回值为数组元素的个数（数组长度）。
  - 元素：数组存储的每一个数据，叫做数组的元素
- 访问数组的元素：
  - 数组[下标]; 下标从0开始

### 4.数组遍历

#### 4.1. 随机数

```javascript
Math.random() //随机生成[0,1)中的数
paerseInt(Math.random()*10) //随机生成0~9的整数
```

#### 4.2. 循环赋值

```javascript
//给数组每个元素赋值随机数
var arr = new Array(10);
for(var i = 0; i < arr.length; i++){
    arr[i] = paerseInt(Math.random()*10);
}
```

#### 4.3. 快速遍历/快速枚举

差别：不用判断数组长度，运行过程中数组长度改变会出错（一般不写奇奇怪怪的代码不会发生错误）。

```javascript
var arr = [10,20,30,40,50];
//页面上分别将每一个数输出
for(var i in arr){
    document.write(arr[i]+"<br/>");
}
```

### 5.数组方法

#### 5.1. 栈结构

- 栈：木盆
  - 放的时候最先放的放最底下，拿的时候拿最后放下去的。
  - 特点：先进的后出
- 数组的两个方法形成栈结构：
  - push 方法
    - 格式：数组.push(参数1,参数2...)；
    - 功能：给数组的末尾添加元素。
    - 返回值：添加完元素后数组的长度
  - pop 方法
    - 格式：数组.pop();
    - 参数：没有参数
    - 返回值：取下的元素
    - 功能：从数组末尾取下一个元素

#### 5.1. 队列结构

- 结构：从末尾进，从头部出。
- 特点：先进的先出
- shift() 方法
  - 格式：数组.shift();
  - 参数：没有参数
  - 功能：从数组的头部取下一个元素
  - 返回值：取下的元素
- unshift() 方法
  - 格式：数组.unshift(参数1,参数2...)
  - 功能：从数组的头部插入元素
  - 返回值：插完元素以后数组的长度

#### 5.2. concat()方法

1. 拷贝原数组，生成新数组。
2. 合并数组
   - 格式：数组.concat(数组,数据,...)
   - 返回值：合并成的新数组。
   - 注意：就算传入是数组，数组中元素中的元素要单独拆出来再进行合并。

#### 5.2. slice()方法

- 格式：数组.slice(start,end);   [start,end)
- 功能：可以基于当前数组获取指定区域元素[start,end)，提取出元素生成新数组。
- 返回值：生成的新数组，原数组不会发生任何的改变。

#### 5.3. splice()方法

- 格式：数组.splice(start,length,数据1,数据2...)

  - 参数：
    - start 开始截取的位置
    - length 截取元素的长度
    - 第三个参数开始：在start位置插入的元素
  - 返回值：截取下来的元素组成的数组

- 增加

  ```javascript
  var arr = [10,20,30,40,50];
  var res = arr.splice(2,0,"hello","world");
  alert(arr);//10,20,hello,world,30,40,50
  alert(res);//空数组
  ```

- 删除

  ```javascript
  var arr = [10,20,30,40,50];
  var res = arr.splice(1,2);
  alert(arr);//10,40,50
  alert(res);//20,30
  ```

- 修改(先删后增)

  ```javascript
  var arr = [10,20,30,40,50];
  arr.splice(2,1,"hello");
  alert(arr);//10,20,hello,40,50
  ```

#### 5.4. join()方法

- 格式：数组.join(字符串)
- 功能：将数组中的元素，用传入的拼接符，拼接成一个字符串。
- 返回值：拼接好的字符串

```javascript
var arr = [10,20,30];
var str = arr.join("==");
alert(str);10==20==30
alert(arr);10,20,30
```

#### 5.5. resver()方法

- 功能：逆序

```javascript
var arr = [true,"hello",100];
arr.reverse();
alert(arr);//100,hello,true
```

#### 5.6. sort()方法

- 格式：数组.sort()	默认从小到大排序，按字符串排序

- 参数：一个函数，代表要怎么进行排序（固定用法）

- 按数值排序方法

  ```javascript
  var arr=[1,10,20,30,25,5];
  //从小到大
  arr.sort(function(value1,value2){
      return value1 - value2;
  })
  //从大到小
  arr.sort(function(value1,value2){
      return value2 - value1;
  })
  ```

#### 5.7. 数组求平均数

定义一个含有38个整型元素的数组，按顺序分别赋予从2开始的偶数；然后按顺序每五个数求出一个平均值，放在另一个数组中并输出。

```javascript
var arr=new Array(30);
for(var i=0;i<arr.length;i++){
    arr[i]=i*i+2;
}
var avgArr=[];
for(var i=0;i<6;i++){
    var newArr.splice(0,5);//splice对原数组进行修改
    //var newArr = arr.slice(i*5,(i+1)*5);也行
    var sum=0;
    for(var j=0;j<newArr.length;j++){
        sum+=newArr[j];
    }
    avgArr.push(sum/5);
}
alert(avgArr);
```

### 6. 引用数据类型

- 运行程序：
  - 1、准备运行程序要用的空间(一旦分配好，内存大小没办法进行改变)
  - 2、开始运行程序
- 数组的变量存储的是数组的地址值。
- concat()方法：拷贝原数组生成一个新数组

### 7. 声明提升和省略var

```javascript
//声明提升
alert(num);
var num=10;
alert(num);
//undefined 10

/*
内存分配，一次分配
预编译：所有代码运行之前，计算机将代码从头到尾看一遍。
	将这个程序需要运行的空间一次性分配好。
	var num=10在第二行 声明var num在所有程序之前
	相当于:*/
	var num;
	alert(num);
	num=10;
	alert(num);
//函数也会声明提升,预编译时会将函数提到代码最前面

//总结：在当前作用域，声明变量和函数，会直接提升在整个代码的最前面运行
```

- 省略var声明变量
  - 变量会被强制声明成全局变量

### 8. 二维数组

- 来源：数组中每一个元素，元素可以是任意数据类型，元素可以是数组，数组存数组是存的数组地址
- 二维数组：人为起的

```javascript
/*
通过循环按顺序为一个5x5的二维数组a赋1到25的自然数，然后输出该数组的左下半三角
*/
var arr = {
    [1,2,3,4,5],
    [6,7,8,9,10],
    [11,12,13,14,15],
    [16,17,18,19,20],
    [21,22,23,24,25]
};
//打印靠左三角形图案
for(var i=0;i<5;i++){
    for(var j=0;j<=i;j++){
        document.write("o")
    }
    document.write("<br/>")
}
//结合一下
for(var i=0;i<arr.length;i++){
    for(var j=0;j<=i;j++){
        document.write(arr[i][j]+" ")
    }
    document.write("<br/>")
}
```

### 9. 冒泡和选择排序

冒泡排序：

- 规则：前后两个数两两进行比较，如果符合交换条件就换位
- 规律：冒泡排序每过一轮排序，都可以找出一个较大的数，放在正确的位置

```javascript
var arr=[9,8,4,2,4,6];
for(var i=0;i<arr.length-1;i++){
	//每一轮比较的次数
	for(var j=0;j<arr.length-(i+1);j++){
		if(arr[j]>arr[j+1]){
			//交换位置
			var tmp = arr[j];
            arr[j]=arr[j+1];
            arr[j+1]=tmp;
		}
	}
}
```

选择排序（打擂台）：

- 规则：选出一个位置，这个位置上的数，和后面所有的数进行比较，如果比较出大小就交换位置。
- 规律：每一轮都能选出一个最小的数，放在正确位置

```javascript
var arr=[9,8,4,2,4,6];
for(var i=0;i<arr.length-1;i++){
    for(var j=i+1;j<arr.length;j++){
    	if(arr[i]>arr[j]){
            var tmp=arr[i];
            arr[i]=arr[j];
            arr[j]=tmp;
        }
    }
}
```

### 10.数组练习

```javascript
//随机给出一个五位以内的数，然后输出该数共有多少位，每位分别是什么
function count0fNum(num){
    var arr=[];
    while(num){
        arr.unshift(num % 10);
        num = parseInt(num/10);
    }
    alert("一共是："+arr.length+"位，每一位分别是"+arr)
}
//编写函数has(arr,60)判断数组中是否存在60这个元素，返回布尔类型
function has(arr,item){
    for(var i=0;i<arr.length;i++){
        if(arr[i]===item){
            return true;
        }
    }
    return false;
}
```

```javascript
/*
生成13位条形码
	Ean-13码规则：第十三位数字是前十二位数字经过计算得到的校验码。
	例如：690123456789
	第十三位计算其验证码的过程为：
	@前十二位的奇数位和6+0+2+4+6+8=26
	@前十二位的偶数位和9+1+3+5+7+9=34
	@将奇数和与偶数和的三倍相加26+34*3=128
	@取结果的个位数：128的个位数为8
	@用10减去这个个位数10-8=2
	所以校验码为2（如果结果个位数为0，校验码为0）
	例如：输入692223361219输出6922233612192
*/
functino ean13(num){
    //1、将其中每一位数取下来
    var arr=[];
    while(num){
        arr.unshift(num%10);
        parseInt(num/10);
    }
    var odd=0;
    var even=0;
    for(var i=0;i<arr.length;i++){
        if(i%2==0){
            //奇数
            odd += arr[i];
        }else{
            //偶数
            even += arr[i];
        }
    }
    var sum=(odd+even*3)%10;
    if(sum){
        sum=10-sum;
    }
    //生成第13位数
    arr.push(sum);
    return Number(arr.join(""));
}
```

## 五. JavaScript-ECMA5

### 1.ECMA5严格模式

- 简介：除正常运行模式，ECMAscript 5 添加了第二种运行模式：“严格模式”(strict mode)。顾名思义，这种模式使得Javascript在更严格的条件下运行。

- 目的：

  1. 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为。
  2. 消除代码运行的一些不安全之处，保证代码运行安全。
  3. 提高编译器效率，增加运行速度。
  4. 为未来新版本的Javascript做好铺垫。

- 格式：

  ```javascript
  /*
  严格模式：写在哪个作用内下，就在哪个作用域内生效。
  "use strict";
  注：尽量注意不要把严格模式写在全局。
  */
  ```

#### 1.1.严格模式的行为变更

1. 全局变量声明时，必须加var

   ```javascript
   <script>
   	"use strict";
   	a=10;//报错，因为a没有被var声明
   </script>
   ```

2. this无法指向全局对象。

   ```javascript
   <script>
       "use strict";
   	function a(){
       	this.b=10;//报错，因为this是undefined 
       }
   	a()
   </script>
   ```

3. 函数内重名属性

   ```javascript
   <script>
       "use strict";
       function a(b,b,c){
           //语法错误：上下文中不允许重复的参数名称
       }
   </script>
   ```

4. arguments对象不允许被动态改变 ：

   ```javascript
   function show(num1,num2){
       "use strict";
       num1="hello";
       alert(num1+","+num2);//hello,20
    	alert(arguments[0]+","+arguments[1])//10,20
   }
   show(10,20);
   ```

5. 新增保留字：implements,interface,let,package,private,protected,public,static,yield。

   注：保留字不能声明为变量名

   ```javascript
   <script>
       "use strict";
   	function package(protected){//语法错误
           var implements;//语法错误
       }
   </script>
   ```

### 2.ECMA5新增数组方法

#### 1. indexOf()方法

- 格式:数组.index(item,start)

- 参数：

  - item：任意数据
  - start：下标 可以不传入，默认为0

- 功能：在数组中查找第一次出现item元素的下标，从start开始查找

- 返回值：

  - -1 没有查找到
  - 大于等于0

- 举例：

  ```javascript
  var arr[1,2,3,4,5,6,7,2,5,6];
  var index = arr.indexOf(20,2);
  alert(index);
  ```

#### 2.forEach()循环

- 数组遍历方法：
  - for循环
  - for...in
  - forEach(ECMA5新增)

```javascript
var arr=[10,20,30,40,50];
arr.forEach(function(item,index,arr){
    /*
    	item当前遍历到的元素
    	index当前遍历到元素的下标
    	arr数组本身
    */
});
```

- 彩蛋：forEach出来的时候被抵制了一段时间，理由是forEach 屏蔽了初学者对于循环的理解。

#### 3.map()方法

- 映射：根据固定的运算公式把原来的数经过公式算出结果放在对应下标里

```javascript
var arr=[10,20,30,40,50];
var newArr=arr.map(function(item,index,arr){
    //遍历要做的事情
    return item*1.3;
});
alert(newArr)//;12,26,39,52,65
alert(arr);//10,20,30,40,50
```

#### 4.filter()过滤

```javascript
var arr=[5,1,2,3,4,5]
var newArr=arr.filter(function(item,index,arr){
    return item>2;//找出所有大于2的元素
});//结果：[5,3,4,5]，不改变原数组新生成数组
```

#### 5.some()方法

- 功能：在数组中查找是否有符合条件的元素，有返回true，没有返回false。
- 短路操作：只要找到符合条件的元素，后面的循环就停止了。

```javascript
var arr=[10,20,30,40,50];
var newArr=arr.some(function(item,index,arr){
    //遍历要做的事情
    return item>20;
});
```

#### 6.every()方法

- 功能：在数组中查找是否每一个元素都符合条件，有返回true，没有返回false。
- 短路操作：只要找到不符合条件的元素，后面循环停止。

```javascript
var arr=[10,20,30,40,50];
var newArr=arr.every(function(item,index,arr){
    return item>20;
});
```

#### 7.reduce()归并

- 归并：先把前两个数并一块，然后再并第二个第三个

```javascript
var arr=[10,20,30,40,50];
var newArr=arr.reduce(function(prev,next,index,arr){
    /*
    prev 第一次 下标为0的元素
    	 第二次开始 上一次遍历return的值
    	 
    next 从下标1开始，当前遍历到的元素
    arr数组本身
    */
    alert(prev+","+next);
    return prev + next;
});
alert(newArr)
/*
10,20
30,30
60,40
100,50
150
*/
```

## 六. JavaScript-字符串

### 1.字符串的基本概念

- 字符串概念：所有带单引号或双引号的都叫字符串
- 字符串的声明：
  - 通过new运算符去声明字符串
  - 省略new声明字符串
  - 字符串常量复制

```javascript
var str =new String(100);
alert(typeof str);//object
var str1 = String(100);
alert(typeof str1);//string
var str2 = "100";
alert(typeof str2);//string
```

- 访问字符串中的字符的个数：
  - 字符串.length  访问字符串中字符的个数
  - 注：中文字符集，utf-8(三个字符表示一个汉字) gbk（两个字符表示一个汉字） **在计数的时候都是当作一个汉字计数**
- 访问字符串中单个字符：
  - 字符串.charAt(下标)  **从0开始**
  - 字符串[下标]  
- **注意**：字符串只读，一旦被声明没办法修改，如果非要修改，只能将原字符串销毁再生成
- **注意**：在JS中，字符串既是基本数据类型也是符合数据类型。
- 字符串遍历：
  - for循环

### 2.字符串方法

#### 1.不常用字符串方法格式：字符串.函数名()

```javascript
big()		大好字体显示字符串
blink()		显示闪动字符串（ie无效）
bold()		粗体显示字符串
fixed()		以打字机文本显示字符串
strike()	使用删除线来显示字符串
fontcolor()	指定颜色显示字符串
fontsize()	指定尺寸显示字符串
link()		字符串显示为链接
sub()		字符串显示为下标
sup()		字符串显示为上标
//document.write()中使用,用特殊样式输出字符串
```

#### 2.字符串获取方法

```javascript
charAt(3) //获取下标为3的字符
charCodeAt(3) //获取下标为3的字符的编码
//上面2个方法使用字符串对象调用

fromCharCode(94) //编码转换成字符串
//该方法是String静态方法,所以用String调用，
如：var str = String.fromCharCode(98,99);
```

#### 3.字符串查找方法

```javascript
/*
indexOf()
	格式：supStr.indexOf(subStr,start);
	参数：第一个，要查的字符串
		 start 从哪个下标开始 默认为0
	功能：在supStr中查找subStr第一次出现的位置，从start这个位置开始查找。
    返回值：-1 没有找到
*/
var supStr="abcabcabc";
var subStr="abc";
var index = supStr.indexOf(subStr);//0
var index = supStr.indexOf(subStr,1);//3
var index = supStr.indexOf(subStr,4);//6
//======================================================
/*
lastIndexOf()
	格式：supStr.lastIndexOf(subStr);
	功能：在supStr中查找subStr最后一次出现的位置
	参数：第二个参数是开始查找的索引位置，查找方向是从右往左
	返回值：-1 没有找到
*/
var supStr="abcabcabc";
var subStr="abc";
var index = supStr.lastIndexOf(subStr);//6
var index = supStr.lastIndexOf(subStr)

 var arr=[10,5,2,3,4,5,7,8,9];
  //索引值：0  1 2 3 4 5 6 7 8
console.log(arr.lastIndexOf(4));//4
console.log(arr.lastIndexOf(7));//6
console.log(arr.lastIndexOf(5));//5
/*
//======================================================
search()
	格式：supStr.search(subStr);
	参数：字符串/正则表达式
	功能：在supStr中查找subStr第一次出现的位置
    返回值：-1 没有查找到
*/
var supStr="Abcabcabc";
var subStr="/abc/i";
var index = supStr.search(subStr);//0
```

#### 4.字符串提取方法

```javascript
/*
substring
	格式：字符串.substring(start,end);
	功能：将字符串中[start,end)提取这部分字符，生成新字符串
	返回值：新字符串
*/
var str = "hello";
var newStr=str.substring(1,4);
alert(newStr);//ell
alert(str);//hello
//======================================================
/*
substr
	格式:字符串.substr(start,length);
	返回值：新字符串
*/
var str="hello";
var newStr = str.substr(1,3);
alert(newStr);//ell
alert(str)//hello
//======================================================
/*
slice(数组方法)
	格式：字符串.slice(start,end);
*/
var newStr=str.slice(1,4);
alert(newStr);//ell
alert(str);//hello
```

#### 5.字符串替换分割

```javascript
/*
replace() 字符串替换
	格式：supStr.replace(oldStr,newStr);
	功能：用newStr将oldStr，替换，生成新字符串。
	参数：
		第一个参数传入的是字符串只能替换一次。
		第一个参数可以传入正则表达式
	返回值：新生成的字符串。
*/
var str="how are are you";
var newStr = str.replace("are","old are")
var newStr2 = str.replace("/are/g","old are")
alert(newStr);//how old are are you
alert(str);//how are are you
alert(newStr2);//how old are old are you
//======================================================
/*
split() 字符串分割
	格式：字符串.split(分隔符，length)
	参数：
		第一个参数，用这个分隔符对字符串进行分割
		第二个参数，控制返回的数组的元素格式，一般不用
	功能：用分隔符对原字符串分割分割玩的字串放在数组中返回
	返回值：数组
*/
var str="how are are you";
var newStr = str.split(" s")
alert(newStr);//how,are,you
alert(str);//how are you

/*
注意：1.相邻两个分隔符，会产生空字符串。
	 2.分割符是空字符串"",直接将每一个字符单独分割成字串,放在数组中返回。
*/
```

#### 6.字符串转大小写

```javascript
/*
	toLowerCase() 转成全小写
	toUpperCase() 转成全大写
	注：生成新字符串
*/
```

### 3.字符串练习

```javascript
//1、将字符串str="When I was young,I love a girl in neighbor class."中，从young提取到girl生成新字符串
var str="When I was young,I love a girl in neighbor class."
var start = str.indexOf("young");
var end=str.indexOf("girl")+"girl".length;
var newStr = str.substring(start,end);
alert(newStr);

/*
2、将字符中单词用空格隔开，已知传入的字符串只有字母，每个单词首字母大写，把每个单词用空格隔开，值保留第一个单词首字母大写
传入："HelloMyWorld"
返回："Hello my world"

思路
1、字符串转数组 split("")
2、数组转字符串 join("")
*/
function wordOfStr(str){
    var arr=str.split("");
    for(var i = 1;i<arr.length;i++){
        if(arr[i]>="A"&&arr[i]<="Z"){
            //大写转小写，插空格
            arr[i]=arr[i].toLowerCase();
            arr.splice(i,0," ");
        }
    }
    return arr.join("");
}
wordOfStr("HelloMyWorld");

/*
3.将字符串安单词进行排序，空格作为划分单词的唯一条件
传入"Welcome to Beijing"
改为"Beijing to Welcome"
*/

function reverseStr(str){
    var arr=arr.split(" ");
}
```

### 4.字符串验证码生成

```javascript
//纯数字验证码
function numTestCode(n){
    var arr=[];
    for(var i=0;i<n;i++){
        var num=parseInt(Math.random()*10);
        arr.push(num);
    }
    return arr.join("");
}
//字母数字验证码
/*
0-9
a-z 97-122
A-Z 65-90
随机ASCII码值
*/
function testCode(n){
    var arr=[];
    for(var i=0;i<n;i++){
        var num=parseInt(Math.random()*123);
        if(num>=0&&num<=9){
            arr.push(num);
        }else if(num>=97&&num<=122||num>=65&&<=90){
            arr.push(String.fromCharCode(num));
        }else{
            i--;
        }
    }
    return arr.join("");
}
```

## 七. JavaScript-对象

### 1. 认识对象

- 发展历史

  - 汇编语言：

    - 汇编、C语言	面向过程语言
    - Java、C++、javaScript、Object-c python 面向对象语言

  - 思想：

    - 面向过程→面向对象

    - 面向过程：只考虑数学逻辑

    - 面向对象：分析实体、设计实体属性功能、实体间相互作用，对生活逻辑的映射。

      ```javascript
      //一辆车60km/h，一条路100km，问跑完时间
      /*
      	面向过程：var hours=100/60;
      	面向对象：
      		车
      			速度 60km/h
      			功能 跑路上
      		路
      			属性
      				length 100km
      		让车真的跑在路上得出结果
      */
      //贪吃蛇
      /*
      	面向过程：坐标 蛇速度
      	面向对象：
      		蛇
      		食物
      		砖块
      */
      ```

- 语法

  - 类：一类具有相同特征事物的抽象概念。（狗

  - 对象：具体某一个个体，唯一的实例。（小白

    

- 举例

  ```javascript
  /*
  	1、通过new运算符声明对象
  	2、通过省略new
  	3、对象常量赋值（使用大括号表示对象）
  */
  var obj1=new Object();
  var obj2=Object();
  var obj3={};
  
  //新增属性 除加前缀使用起来和普通变量无区别
  obj3.username='钢铁侠'
  obj3.age=18;
  alert(obj3.username);
  alert(obj3.age);
  
  //通过中括号设置访问
  obj3['username']='钢铁侠'
  obj3['age']=18;
  alert(obj3['username'])
  alert(obj3['age'])
  
  //新增方法 除加前缀使用其阿里和普通函数没有区别
  obj3.show=function(){
      alert("我的名字叫"+obj3.name+"。"+obj3.age+"岁")
  }
  
  obj3.show();
  
  //通过对象常量赋值
  var obj3={
      username:"钢铁侠",
      "age":18,
      show:function(){
          alert("我的名字叫"+obj3.name+"。"+obj3.age+"岁")
      }
  }
  
  //delete 关键字 删除对象属性或方法
  delete obj3.show;
  ```

  

- 数据结构回顾

  - 基本数据类型（存储一个值
  - 数组（存储多个值
  - 对象（不仅可以存储多个值，还能存储函数

```javascript
//上面车的例子
var car={
    speed:60,
    run:function(road){
        return road.length/car.length;
    }
};
var gaosugonglu={
  	length:100 
};
var hours=car.run(gaosugonglu);
alert("一共花了"+hours.toFixed(2)+"小时");
```

### 2. 常用Math对象方法

- 万物皆为对象
- 数学运算函数Math对象

1. Math.random() 返回0~1之间随机数
2. Math.max(num1,num2) 返回较大的数
3. Math.min(num1,num2) 返回较小的数
4. Math.abs(num) 绝对值
5. Math.round() 四舍五入（成整数，只看小数点后一位）
6. Math.ceil(19.3) 向上取整
7. Math.floor(11.8) 向下取整
8. Math.pow(x,y) x的y次方
9. Math.sqrt(num) 开平方

### 3. 日期对象

- 声明

  - 没有传参：当前系统时间

    ```javascript
    var d=new Date();
    alert(d);//Wed Oct 09 2019 09:01:01 GMT+0800 (中国标准时间)
    // GMT 格林尼治时间
    ```

  - 传参：

    ```javascript
    /*
    参数：
    1.字符串 "2000-01-01"
    Sat Jan 01 2000 08:00:00 GMT+0800 (中国标准时间)
    
    2.数字(按顺序 年月日时分秒毫秒)
    	注：月份从0开始
    var d=new Date(2000,1,1,8,30,50);
    Tue Feb 01 2000 08:30:50 GMT+0800 (中国标准时间)
    
    3.数字(毫秒数)
    	起点：1970/1/1 0:0:0
    var d=new Date(1000);
    Thu Jan 01 1970 08:00:01 GMT+0800 (中国标准时间)
    */
    ```

### 4. 日期对象方法

#### 4.1. 格化式方法（了解）

| 方法                     | 功能                               |
| ------------------------ | ---------------------------------- |
| box.toDateString()       | 特定格式显示星期几、月、日和年     |
| box.totimeString()       | 特定格式显示时、分、秒和时区       |
| box.toLocaleDateString() | 特定地区格式显示星期几、月、日和年 |
| box.toLocaleTimeString() | 特定地区格式显示时、分、秒和时区   |
| box.toUTCString()        | 特定格式显示完整UTC日期            |

#### 4.2.常用方法（重点）

- set/get既能获取又能赋值 get只能获取
- **set/getDate()**
  - 从Date对象中返回一个月中的某一天(1~31)
- **getDay()**
  - 从Date对象返回一周中的某一天（0~6）
- **set/getMonth()**
  - 从Date对象中返回月份（0~11）
- **set/getFullYear()**
  - 从Date对象以四位数返回年份
- **set/getHours()**
  - 返回Date对象的小时（0~23）
- **set/getMinutes()**
  - 返回Date对象的分钟（0~59）
- **set/getSeconds()**
  - 返回Date对象的秒数（0~59）
- **set/getMilliseconds()**
  - 返回Date对象的毫秒
- **set/getTime()**
  - 返回1970年1月1日至今的毫秒数
- **getTimezoneOffset()**
  - 返回本地时间与格林威治标准时间（GMT）的分钟差

```javascript
var d = new Date();
var year = d.getFullYear();
var month = d.getMonth()+1;
var date = d.getDate();

var week = d.getDay()//0~6 0是星期天
var min = d.getMinutes();
var sec = d.getSeconds();
```

#### 4.3. 日期练习

##### 4.3.1. 日期对象转毫秒数

```javascript
/*
	Date.parse()
		格式：Date.parse(日期对象)
		功能：可以将日期对象转换成毫秒数
	
	d.getTime()/d.setTime()
		格式：日期对象.getTime/setTime
		功能：将当前日期对象转换成毫秒数
*/
var d=new Date();
alert(Date.parse(d));
alert(d.getTime());//调用格式不一样
```

##### 4.3.2. 获取两个日期之间相差的天数

```javascript
/*
传入："xxxx-xx-xx" "xxxx/xx/xx"
*/
function countOfDate(d1,d2){
    var dd1=new Date(d1);
    var dd2=new Date(d2);
    
    var time1=dd1.getTime();
    var time2=dd2.getTime();
    var time=Math.abs(time1-time2);
    return parseInt(time/1000/3600/24)
}
```

##### 4.3.2. 输入n，输出n天后的时间

```javascript
function afterOfDate(n){
    var d = new Date();
    var day = d.getDate();
    d.setDate(day + n);//超过30 31自动进1
    return n
}
```

### 5. 定时器

- 格式：var timer = setInterval(函数,毫秒数);

- 功能：隔对应毫秒数，执行一次传入函数

- 返回值：系统分配的编号

- 取消定时器：clearInterval(timer);

- 例子：

  ```javascript
  var i = 0;
  function show(){
      if(i==5){
          clearInterval(timer);
      }
      document.write(i++ + "<br/>")
  }
  
  var timer = setInterval(show,1000);
  //1 2 3 4 5
  //======================================
  var i = 0;
  var show = function(){
      if(i==5){
          clearInterval(timer);
      }
      document.write(i++ + "<br/>")
  }
  
  //匿名函数
  //======================================
  var timer = setInterval(function(){
      if(i==5){
          clearInterval(timer);
      }
      document.write(i++ + "<br/>")
  },1000);
  ```

## 八. JavaScript-BOM

### 1. 简介

- browser object model(浏览器对象模型)(浏览器规则)
- 窗口树状结构：
- window
  - document
    - anchors
    - forms
    - images
    - links
    - location
  - frames
  - history
  - location
  - navigator
  - screen

### 2. 系统对话框

浏览器可以通过alert()、confirm()和prompt()方法调用系统对话框向用户显示信息.

```javascript
//弹出警告框
alert("Lee")
//提示框（确定和取消）
confirm("请确定或者取消");
if(confirm(("请确定或者取消")){
   alert("按了确定")//返回true
   }else{
       alert("按了取消")//返回false
   }
//输入提示框
var num = prompt("请输入一个数字"，0);
//参数1：提示 ； 参数2：默认值
alert(num);//得到输入的值
```

### 3. open()方法

```javascript
/*
	功能：打开窗口
	open()
	 - 参数1：跳转url 打开一个新窗口加载url
	 - 参数2：字符串，给打开的窗口命名
	 	- 本窗口打开 _parent
	 	- 新建窗口打开 _blank
	 - 参数3：特殊含义字符串
	 	- 可以设置宽高
*/
open("https://www.baidu.com","_blank","width=400,height=400,top200,left=200")
```

| 第三个参数属性            | 值                                                           |
| ------------------------- | ------------------------------------------------------------ |
| channelmode=yes\|no\|1\|0 | 是否使用剧院模式显示窗口。默认为no。                         |
| directories=yes\|no\|1\|0 | 是否添加目录按钮。默认yes                                    |
| funllscreen=yes\|no\|1\|0 | 是否使用全屏模式显示浏览器。默认no。处于全屏模式的窗口必须同时处于剧院模式。 |
| height=pixels             | 窗口显示区高度                                               |
| left=pixels               | 窗口x坐标                                                    |
| location=yes\|no\|1\|0    | 是否显示地址字段。默认yes                                    |
| menubar=yes\|no\|1\|0     | 是否显示菜单栏。默认yes                                      |
| resizable=yes\|no\|1\|0   | 窗口是否可调节尺寸。默认yes                                  |
| scrollbars=yes\|no\|1\|0  | 是否显示滚动条。默认yes                                      |
| status=yes\|no\|1\|0      | 是否添加状态栏。默认yes                                      |
| titlebar=yes\|no\|1\|0    | 是否显示标题栏。默认yes                                      |
| toolbar=yes\|no\|1\|0     | 是否显示浏览器的工具栏。默认yes                              |
| top=pixels                | 窗口y坐标                                                    |
| width=pixels              | 窗口宽度                                                     |

### 3. history对象

- history对象是window对象的属性，它保存用户上网记录，从窗口被打开那一刻算起

```javascript
属性
history.length;//记录数
方法
history.back()//后退
history.forward()//前进
history.go(num)//跳转到第num个记录
 - 0刷新
 - 2 正整数 前进2个
 - -2 负整数 后退2个
```

### 4. location对象

```javascript
window下location

属性
url:统一资源定位符。
 - 协议://IP(域名)/:端口号/路径/?查询字符串#锚点

location.protocal//获取访问协议
 - http:
 - https:(证书认证协议)

location.hostname//获取主机名
 - 一般主机名为IP(网络地址) 不好记
 - 域名：ip的别称

location.port//获取端口号，默认隐藏
 - 当前电脑使用网络的软件，随机分配的一个编号 0-65535
 - 定位到当前使用网络的进程
 - 浏览器默认端口 8080
	- http 80
 	- https 443

location.pathname//获取路径

location.search//获取查询字符串
 - 查询字符串格式：?name1=value1&name2=value2

location.hash //获取锚点
```

```java
document下location

alert(window.loaction===window.document.location);//true

属性：
方法
    assign() //跳转到指定页面，与href等效
     - 产生历史记录
    reload() //刷新
     - reload(true)//不经浏览器缓存，强制重载
	repalce()//用新url替换当前页面
     - 不产生记录
```

## 九. JavaScript-DOM

### 1.元素节点的获取

- document object model(文档对象模型)
  - document：html标签里的内容
- 节点类型
  - 元素节点 `<div></div>`
  - 属性节点 id=‘div1’
  - 文本节点 标签里的文本
- 元素节点的获取
  - document.getElementById(id);
    - 功能：通过id获取符合条件的元素
    - 返回值：获取到的一个节点
  - node.getElementsByTagName(标签名);
    - 功能：从node节点开始通过标签名获取符合条件的元素节点
    - 返回值：伪数组/数组
  - node.getElementsByClassName(class名字);(IE8以下不兼容)
    - 功能：从node节点开始通过class名字获取符合条件的元素节点
    - 返回值：伪数组/数组
  - document.getElementsByName(name属性的值);
    - 功能：通过name属性的值获取符合条件的元素节点
    - 返回值：伪数组/数组
    - 一般使用在表单元素里
  - document.querySelector(); IE8以下不兼容
    - 返回值：一个元素节点，找到符合条件的第一个元素节点。
    - 参数：字符串 CSS选择器格式字符串
  - document.querySelectorAll() IE8以下不兼容
    - 返回值：伪数组/数组
    - 参数：字符串 CSS选择器格式字符串

### 2.获取当前有效样式

```javascript
/*
	查找指定元素指定CSS属性值
	@ elem 指定的元素
	@ attr 指定的CSS属性
	@ return 返回对指定元素查找到的css属性值
*/
function getStyle(elem,attr){
    return elem.currentStyle ? elem.currentStyle[attr]:getComputedStyle(elem)[attr];
}
//elem.currentStyle[attr]兼容ie
//getComputedStyle(elem)[attr]其他
```

### 3.attribute和元素节点属性

#### 3.1.attribute

- setAttribute()
  - 添加指定的属性，并为其赋指定的值。如果这个指定的属性已存在，则仅设置/更改值。
- getAttribute()
  - 返回指定属性名的属性值。
- removerAttribute()
  - 删除指定的属性。
- 特点：
  - 1.class访问
  - 2.支持自定义属性

#### 3.2.元素节点属性

- innerHTML：获取标签间内容
- innerText：获取标签间纯文本，不会解析标签，设置纯文本
- outerHTML：从外标签开始到外标签借宿

### 4.获取文本子节点

- 通过元素节点的子节点获取
- 获取元素子节点方法：
- 兼容ie6-8
  - firstChild 
    - 访问子节点中第一个
  - lastChild
    - 访问子节点最后一个
  - nextSibling
    - 下一同级节点
  - previousSibling
    - 上一同级节点
- 兼容ie9-10 chrome firefox
  - 只获取元素节点
  - firstElementChild
    - 第一个节点
  - lastElementChild
    - 最后一个节点
  - nextElementSibling
    - 下一同级节点
  - previousElementSibling
    - 上一同级节点
- childNodes
  - 访问当前节点下所有子节点
  - 获取：childNodes[]
  - 特点：回车也会被当作节点 
- children

|          | nodeType | nodeName   | nodeValue    |
| -------- | -------- | ---------- | ------------ |
| 元素节点 | 1        | **标签名** | null         |
| 属性节点 | 2        | 属性名     | 属性值       |
| 文本节点 | 3        | #text      | **文本内容** |

### 5.属性节点attributes

- 获取当前元素节点上的素有属性节点
- 返回值：集合对象
- 集合：无序、不重复

获取其中某一个节点

- getNamedItem("title") 获取节点
- 节点.attributes.getNamedItem("title").nodeName; //title 获取属性名
- 节点.attributes.getNamedItem("title").nodeType; //2 获取属性类型
- 节点.attributes.getNamedItem("title").nodeValue; //hello 获取属性值
- 繁琐，可以简化
  - 节点.attributes["title"].nodeName; //title 获取属性名
  - 节点.attributes["title"]..nodeType; //2 获取属性类型
  - 节点.attributes["title"]..nodeValue; //hello 获取属性值

### 6. DOM节点操作

- document.write()
  - 覆盖页面上原有内容
- createElement()
  - 功能：创建一个元素节点
  - 格式：document.createElement()
  - 参数：标签名
  - 返回值：创建好的这个节点
- appendChild()
  - 功能：将node2节点插入到node1节点子节点的末尾
  - 格式：node1.appendChild(node2);
- createTextNode()
  - 功能：创建文本节点(纯文本，写标签也不解析)
  - 格式：document.createTextNode(文本)
- insertBefore()
  - 功能：将box2添加到box1前面
  - 格式：box1.parentNode.insertBefore(box2,box1);
    - **注意**：必须用box1的父节点进行调用
- replaceChild()
  - 功能：用box2节点将box1节点替换掉
  - 格式：box1.parentNode.replaceChild(box2,box1);
    - **注意**：必须用box1的父节点进行调用
- cloneNode()
  - 功能：克隆node节点，子节点和行间内容不克隆
  - 格式：node.cloneNode();
  - 功能2：克隆node节点，子节点和行间内容也克隆
  - 格式：node.cloneNode(true);
  - 返回值：克隆出来的新节点
- removeChild()
  - 功能：删除box节点
  - 格式：(box.parentNode).removeChild(box)
    - 注意：必须用box的父节点进行调用

### 7. this关键字

- 概念：只要封装函数，任何一个函数系统都会内置一个叫做this的变量，this变量存储的是地址，当前函数主人的地址。函数主人通过上下文判断。this类似于现实生活中，用到的“我”。

- 常用情况：

  ```javascript
  var person={
      username:"钢铁侠",
      sex:"男",
      show: function(){//函数主人为person
          alert(person.username);
          alert(this.username);//2个结果一样
      }
  }
  ```

  ```javascript
  function show(){
      alert(this);
  }
  show();//全局函数 函数主人默认为window
  window.show();
  ```

  ```java
  window.onload=function(){
      var oBtn=dcument.getElementById("btn1");
      //给页面上btn1的一个对象添加了一个函数
      //函数主人为当前按钮 this指向oBtn
      oBtn.onclick=function(){
          alert(this);
      }
  }
  ```

  

### 8. offset方法

- offsetWidth
- offsetHeight
  - 获取元素宽高 不带px 
  - boorder和padding计算在内
- offsetLeft
- offsetTop
  - 获取眼睛能看到的实际距离第一个有定位的父节点的距离。
  - 不带px margin计算在内

#### 8.1. 获取元素相对于视口的位置

- getBoundingClientRect()
  - getBoundingClientRect用于获取某个元素相对于视窗的位置集合。集合中有top, right, bottom, left等属性。
- 返回值：
  - div.getBoundingClientRect().top：名为div元素上边到视窗上边的距离;
  - div.getBoundingClientRect().right：名为div元素右边到视窗左边的距离;
  - div.getBoundingClientRect().bottom：名为div元素下边到视窗上边的距离;
  - div.getBoundingClientRect().left：名为div元素左边到视窗左边的距离;

### 9. 文档碎片

```javascript
/*
	1.创建10w个节点，添加到页面上
*/
console.time("test1");
for(var i=0;i<100000;i++){
    var newDiv=document.createElement("div");
}
console.timeEnd("test1");

/*
	2.创建10w个节点，将10w节点插入到一个节点上，最后将这一个节点添加到页面上
*/
console.time("test2");
var node=document.createElement("div");
for(var i=0;i<100000;i++){
    var newDiv=document.createElement("div");
    node.appendChild(newDiv);
}
document.body.appendChild(node);
console.timeEnd("test2");

/*
第一种方式耗时120毫秒 第二种耗时78毫秒
而第二种方式就是 文档碎片操作（效率高）
生活中的例子：
1.想吃干脆面，下楼买一趟，想喝可乐，再下楼一趟，想吃方便面，再下楼一趟。
2.一趟把东西买完。
*/
```

### 10. 数组和对象的遍历方法

数组遍历：

- for循环

- for...in快速遍历 (效率高无判断

- forEach

  ```javascript
  var arr[10,20,30,40]
  for(var i=0;i<arr.length;i++){
  	document.write(i+","+arr[i]);
  }
  
  for(var i in arr){
      document.write(i+","+arr[i]);
  }
  
  arr.forEach(function(item,index,arr){
      document.write(indexi+","+item);
  });
  ```

对象遍历:

- for...in

  ```javascript
  var person={
      username:"钢铁侠",
      age:18,
      sex:"男"
  }
  for(var i in person){
      document.write("属性名:"+i+"属性值:"+person[i])
  }
  ```

## 九. JavaScript-事件

### 1.事件和事件类型

#### 1.1. 什么是事件：

- 事件是发生并得到处理的操作，即事情来了，然后处理，例如：
  - 电话铃响起（事件发生），接电话（处理）
  - 同学举手（事件发生），解答（处理）
  - 按钮被点击（事件发生），对应一个函数来处理（处理）

#### 1.2. 事件绑定方式

- JavaScript事件是由访问Web页面的用户引起的一系列操作，例如：用户点击。当用户执行某些操作的时候，再去执行一系列代码。

- JavaScript有两种事件模型：内联模型、外联/脚本模型。

- 内联模型：

  - 这种模型是最传统接单的一种处理事件的方法。在内联模型中，事件处理函数是HTML标签的一个属性，用于处理指定事件。虽然内联在早期使用较多

  - ```html
    <button onclick='btn();'> </button>
    ```

- 外联模型：

  - ```javascript
    var btn=document.getElementById("btn1");
    btn.onclick=function(){
        alert("外连模式")
    }
    ```

  - 绑定格式：

    - **元素节点.on+事件类型=匿名函数。**
    - click      事件类型
    - onclick 事件处理的函数

- 实际开发中我们希望js代码和html css是分离的 所以推荐使用外联模型。

#### 1.3. 事件类型的种类

一、鼠标事件(可以绑定在任何元素节点上)

| 事件名     | 事件详情           |
| ---------- | ------------------ |
| click      | 单击               |
| dblclick   | 双击               |
| mouseover  | 鼠标移入           |
| mouseout   | 鼠标移出           |
| mousemove  | 鼠标移动（不停触发 |
| mouseenter | 鼠标移入           |
| mouseleave | 鼠标移出           |

- mouserleave和mouseout的区别

- mouseleave是当鼠标指针离开了目标元素以及目标元素的所有子元素以后才会触发。

  而mouseout是只要鼠标指针离开了目标元素或者目标元素的所有子元素中的任何一个就会被触发，即使鼠标指针还在目标元素内。也就是离开子元素后，mouseout事件会冒泡到父元素上。直到取消了冒泡或者到达了最外层根元素，才会停止冒泡。

- https://www.w3school.com.cn/tiy/t.asp?f=jquery_event_mouseleave_mouseout

- mouseenter与mouseove同理

  - mouseenter经过子节点不会重复触发
  - mouserover经过子节点会重复触发

二、键盘事件（表单元素、全局window）

- keydown
  - 键盘按下（不放手 一直触发
- keyup
  - 键盘抬起
- keypress
  - 键盘按下（只支持字符键,例如数字，英文字符键）

三、HTML事件

1. window事件

```
   - load
     
     - 页面加载完以后触发
   - unload
     
     - 当页面解构的时候触发（刷新,关闭）仅兼容ie
   - scroll
```

```
 - 页面滚动
   - resize
     - 窗口大小发生变化
      	2. 表单事件
   - blur
     
     - 失去焦点
   - foucs
     
     - 获取焦点
   - select
     
     - 当我们在输入框内选中文本的时候触发
   - change
     
     - 当我们对输入框的文本进行修改并且失去焦点的时候
   - 必须添加到form元素的事件
     - submit
       - 当我们点击submit的按钮才能触发
     - reset
       - 当我们点击reset的按钮才能触发
```

### 2. 事件对象和事件对象属性

#### 2.1. 事件对象

- 引例：番茄炒蛋 番茄+鸡蛋+条例炒出来的味道是全新的味道，不是番茄也不是鸡蛋的味道了

- 事件绑定：

  - 元素节点.on + 事件类型=匿名函数；

- 系统会在事件绑定完成的时候，生成一个事件对象，将事件对象当作第一个参数传入

- 触发事件的时候，系统会自动去调用事件绑定的函数

  ```javascript
  function show(){
  	alert(arguments.length);//1
      alert(arguments[0]);//object MouseEvent
      alert("hello world");
  }
  window.onload=function(){
      var btn=document.getElementById("btn1");
      btn.onclick=show;
  }
  ```

- 可以设置一个形参，传入事件对象的时候可以通过形参拿到 ie8以下不兼容

  ```javascript
  function show(ev){
      //浏览器兼容
  	var ev = ev || window.event
      
  	alert(arguments.length);//1
      alert(arguments[0]);//object MouseEvent
      alert(ev)//object MouseEvent 
      alert("hello world");
  }
  window.onload=function(){
      var btn=document.getElementById("btn1");
      btn.onclick=show;
  }
  ```

- 最终写法：

  ```javascript
  window.onload=function(){
      var btn=document.getElementById("btn1");
      btn.onclick=function(ev){
          //事件对象获取,固定写法
          var ev=ev||window.event;
          alert(e);
      }
  }
  ```

#### 2.2. 事件对象属性



- button属性
  - 0 按下鼠标左键
  - 1 滚轮
  - 2 右键

获取当前鼠标位置：区别（原点位置不同）

- clientX   clientY
  - 可视窗口的左上角为原点
- pageX    pageY
  - 整个页面的左上角(包含滚动出去的距离)
- screenX screenY
  - 电脑屏幕的左上角

获取功能键：

- shiftKey
  - 按下shift键，为true，默认为false
- altKey
  - 按下alt键，为true，默认为false
- ctrlKey
  - 按下ctrl键，为true，默认为false
- metaKey
  - windows系统 按下windows（开始）键，为true
  - macos系统 按下command键，为true
- 可以和别的操作进行组合，形成一些快捷键操作。

获取键码

- keyCode (兼容ie) 和 which    
  - 格式：var which = e.which || e.keyCode;
  - 返回值：大写字母的ASCII码值。不区分大小写。
  - 只在keydown下支持 

获取字符码

- charCode (兼容ie) 和 which
  - 格式：var which = e.which || e.charCode;
  - 返回值：区分大小写的ASCII码值。
  - 只在keypress下支持，只支持字符键。

### 3. 目标对象和事件冒泡

#### 3.1. 目标对象target

- 概念：是事件对象的属性，代表触发对象

  - 触发对象：事件由谁而起的

- 兼容IE8：window.event.srcElement;

- 例子：

  ```html
  ...
  <script>
  window.onload=function(){
      var li=doucment.getElementById("li1")
      li.onclick=function(ev){
          var e=ev||window.event;
          var target = e.target||window.event.srcElement;
          alert(target.innerHTML);//1111
      }
      
      var ul=doucment.getElementById("ul1")
      li.onclick=function(ev){
          var e=ev||window.event;
          var target = e.target||window.event.srcElement;
          //点击内容2222的li
          alert(this.tagName);//ul  this指向函数主人ul
          alert(target.innerHTML);//2222 由li而起的
          //就好像隔了一层纸打了你一下，然后你叫了一声，但是我打的是纸，触发对象是纸，疼的是你。
      }
  }
  </script>
  ...
  <body>
      <ul id='ul1'>
          <li id='li1'>1111</li>
          <li>2222</li>
      </ul>
  </body>
  ...
  ```

#### 3.2. 事件冒泡与捕获

- 冒泡：一个页面中的多个dom如果呈现父子类关系，并且都绑定了事件，则会有事件冒泡的情况发生，从最里面的dom冒泡到外层，**由里向外逐级触发**。

- 捕获：冒泡反过来，由外向里逐级触发

- 阻止事件冒泡：

  - event.stopPropagation()
  - event.cancelBubble=true;

  ```javascript
  function stopbUBBLE(e){
      if(e.stopPropagation){
          e.stopPropagation();
      }else{
          e.cancelBubble=true;
      }
  }
  ```

### 4.阻止默认行为

1.阻止官方右键菜单

```javascript
window.onload=function(){
    //关闭官方右键菜单
    document.oncontextmenu=function(){
        return false;
    }
}
```

2.阻止超链接跳转

```javascript
link.onclick=function(evt){
    evt.preventDefault();//W3C，阻止默认行为，放哪里都可以
    alert('1');
}
link.onclick=function(ev){
    window.event.returnValue=false;//IE，阻止默认行为
    alert('1');
}

//兼容写法
function preDef(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }else{
        window.event.returnValue=false;
    }
}
```

案例：自定义右键菜单，跳转链接阻止加操作

### 5.实现拖拽使用到的事件

拖拽：

- mousedown
  - 记录鼠标按下位置和被拖拽物体相对距离
- mousemove
  - 一直保持相对距离
- mouseup
  - 取消拖拽

### 6. 事件委托

```javascript
window.onload=function(){
    var ul=document.getElementByid("ul");
    var li=docuemnt.getElementByTagName("li");
    
    //添加点击事件
	for(var i=0;i<li.length;i++){
        li[i].onclick=function(){
            this.style.backgroundColor='red';
        }
    }
    /*
    	这种添加方法
    	 - 1.浪费
    	 - 2.如果新增节点是没有事件的
    	相当于5个人想喝水一个人带一个水龙头(函数) 谁要喝就拧上去，喝完把水龙头拧下来。而且新来的同学不知道规矩没有水龙头(惨)
    	
    	解决这种情况的方式就叫事件委托
    */
}

```

```javascript
/*
	委托：
		A委托B去买饭。
		A发布任务 委托方
		B执行任务 受理方
		A要吃饭 B去买饭 
*/
/*
	事件委托步骤：
	 - 1.找到当前节点的父节点或者祖先节点
	 - 2.将事件添加到你找的父节点或者祖先节点上
	 - 3.找到触发对象，判断触发对象是否是想要的触发对象，进行后续操作。
*/
window.onload=function(){
    /*
    	li要变红
    	li委托ul去做
    	li变红
    	
    	li要吃饭
    	ul去买饭
    	li吃到饭
    */
    var ul=document.getElementByid("ul");
    
    ul.onclickk=function(){
        var e=ev||window.event;
        var target=e.target||window.event.srcElement;
        if(target.nodeName.toLowerCase()=="li"){
            target.style.backgroundColor='red';
        }
    }
    //所有li的变红都由ul的一个点击函数实现 1.不浪费 2.新增li也可以添加到效果,相当于5个同学 用一个水龙头(函数)。
}
```

### 7. 事件监听器

```javascript
//传统事件绑定格式
var btn=docuement.getElementById("btn1");
btn.onclick=function(){
    alert("点击1")
}
btn.onclick=function(){
    alert("点击2")
}
/*
	缺点:
	 - 1.重复添加覆盖
	 	- 因为是赋值，覆盖，点击后输出点击2
*/
/*
	事件监听器：
	 - 事件绑定的另一种方式
	 - addEventListener()
	  - 格式：node.addEventListener(“click”)
	  - 参数：
	   - 1.事件类型
	   - 2.绑定函数
	   - 3.布尔值 true:捕获 false:冒泡（默认
	 - removeEventListener()
*/
//事件监听器绑定格式
var btn=docuement.getElementById("btn1");
btn.addEventListener("click",function(){
    alert("点击1");
},false);
btn.addEventListener("click",function(){
    alert("点击2");
},false);
/*
	优点：
		1.不会覆盖
		2.可精确删除某个函数
	适用情况：
		- 给一个控件添加多个函数
		- 精确删除某一个函数
*/
//点击后输出点击1然后输出点击2
//应用情况：写了好多代码 想加功能 不用回去找
```

#### 事件监听器兼容

```javascript
function addEvent(node,evenType,funcName){
    if(node.addEventListener){
		node.addEventListener(evenType,funcName,false);
    }else{
        node.attachEvent("on"+evenType,funcName);
    }
}

function removeEvent(node,evenType,funcName){
    if(node.removeEventListener){
        node.removeEventListener(eventType,funcName);
    }else{
        node.detachEvent("on"+eventType,funcName);
    }
}
```

案例：生成表格，放大镜

### 十. JavaScript-正则表达式

### 1. 概念

- 用途
  - 假设用户需要在HTML表单中填写姓名、地址、出生日期等。那么在将表单提交到服务器进一步处理之前，JavaScript程序会检查表单确认用户确实输入了信息并且这些信息是符合要求的。
- 概念：
  - 正则表达式（regular expression）是一个描述字符模式的对象。ECMAScript的RegExp类表示正则表达式，而String和正则表达式都定义了进行强大的**模式匹配**和**文本检索**与**替换**的函数

### 2. 创建正则表达式

1. 通过new去声明正则表达式

   - 参数1：正则表达式主体（字符串
   - 参数2：修饰符 i/g

   ```javascript
   var box1=new RegExp("hello","ig");
   alert(box1) // 	/hello/gi
   ```

2. 省略new运算符声明正则表达式

   ```javascript
   var box1=RegExp("hello","ig");
   alert(box1) // 	/hello/gi
   ```

3. 通过常量赋值声明正则表达式

   ```javascript
   var box1=/hello/gi;
   alert(box1) // 	/hello/gi
   ```

### 3. 正则表达式方法

- test
  - 格式：正则.test(字符串)
  - 功能：在字符串中匹配这个正则是否存在
  - 返回值：成功返回true，失败返回false
- exec
  - 格式：正则.exec(字符串)
  - 功能：在字符串中匹配这个正则是否存在
  - 返回值：返回匹配到的字符串，成功返回数组，失败返回null

### 4.可使用正则表达式的字符串方法

- match()

  - 格式：字符串.match(正则);
  - 功能：字符串中匹配是否有符合的字符串
  - 返回值：成功返回装有匹配到字符串的数组，失败返回null

- replace()

  - 格式：字符串.replace(旧字符串/正则,新字符串);

  - 功能：新替换旧

  - 返回值：替换成功的新字符串

    ```javascript
    var str="how are Are ARE you";
    var newStr=str.replace(/are/ig,"*");
    alert(newStr) // how * * * you
    ```

- split()

  - 格式：字符串.replace(分隔符/正则);

  - 功能：用分隔符将原字符串进行分割

  - 返回值：分割剩下的子串组成的数组。

    ```javascript
    var str="how are Are ARE you";
    var newStr=str.split(/are/i);
    alert(arr);//how,,,you
    ```

- search()

  - 格式：字符串.search(字符串/正则);

  - 功能：找到符合字符串第一次出现位置

  - 返回值：找到返回>=0下标，否则返回-1

    ```javascript
    var str="how Are are ARE you";
    var newStr=str.search(/are/i);
    alert(arr);//4
    ```

### 5.元字符

- 概念：在正则表达式中有特殊含义的字符串

#### 5.1. 常用元字符

| 元字符    | 匹配情况                   |
| --------- | -------------------------- |
| .         | 匹配除换行符外任意单个字符 |
| [a-z0-9]  | 匹配括号中字符集任意字符   |
| [^a-z0-9] | 匹配不在括号中字符集的字符 |
| \d        | 匹配数字                   |
| \D        | 匹配非数字同[ ^0-9]相同    |
| \w        | 匹配字母数字下划线         |
| \W        | 匹配非字母数字下划线       |

| 元字符 | 匹配情况              |
| ------ | --------------------- |
| x?     | 匹配0或1个x           |
| x*     | 匹配0或任意多个x      |
| x+     | 匹配至少一个x         |
| (xyz)+ | 匹配至少一个xyz       |
| x{m,n} | 匹配最少m个、最多n个x |

| 元字符 | 匹配情况                           |
| ------ | ---------------------------------- |
| \s     | 匹配空白字符、空格、制表符和换行符 |
| \S     | 匹配非空白字符                     |
| \0     | 匹配null字符                       |
| \b     | 匹配空格字符                       |
| \f     | 匹配换页符                         |
| \n     | 匹配换行字符                       |
| \r     | 匹配回车字符                       |
| \t     | 匹配制表符                         |

| 元字符 | 匹配情况           |
| ------ | ------------------ |
| ^      | 必须以这个正则开头 |
| $      | 必须以这个正则结尾 |
| \|     | 两项之间的一个选择 |

- 案例：输入框密码框验证

## 十一. localStorage

### 1.什么是localStorage

loacalStorage本地存储对象	

在HTML5中，新加入了一个loaclStorage特性，这个特性作为本地存储使用，解决了cookie存储空间不足问题（每条cookie的存储空间为4k），localStorage中一般浏览器支持的是5M大小，这个在不同浏览器中localStoarage会有所不同。

### 2.localStorage优势与局限

- localStorage的优势
  - localStorage拓展了cookie的4K限制
  - localStorage可以将第一次请求的数据直接存储到本地，相当于5M大小针对前端页面的数据库，相比cookie可以节约带宽，高版本浏览器才支持
- localStorage的局限
  - 浏览器大小不统一，ie8以上才支持
  - 值类型为string，相比常见的JSON对象类型需要转换
  - 在浏览器隐私模式下不可读取
  - 本质是对字符串读取，存储内容多会消耗内存空间，导致页面变卡
  - 不能被爬虫抓取到
  - 永久性存储

### 3.cookie

1. 可以设置过期时间
2. 最大可以存4KB
3. 每一个域名下最多可以存储50条数据

### 4.sessionStorage

- 结合后端
- 保留一次对话

### 5.localStorage方法

- setItem(name,value);

- getItem(name);

- removeItem(name);

  ```javascript
  if(!window.localStorage){
      alert("当前页面不支持localStorage")
  }else{
      //设置
      localStorage.setItem("a","1");
      localStorage.b='2';
      localStorage["c"]='3';
      //获取
      console.log(localStorage.getItem("b"));
      console.log(localStorage.c);
      console.log(localStorage['a']);
  	//删除
      localStorage.removeItem("a");
  }
  ```

## 十二. 强制改变this指向函数

- this回顾

  - 每一个函数的内置变量 指向当前函数主人

  - 全局函数this指向window对象

  - 对象内的函数的this指向对应名称对象

    ```javascript
    var person={
        name:"123";
        show:function(){
            this.name;//this指向person
        }
    }
    ```

  - 绑定事件的函数中的this指向绑定函数的对象

- call()

  - 格式：函数名.call();
  - 参数1：传入改函数this指向的对象，传入什么强制指向什么
  - 参数2：将原函数的参数往后顺延一位。

- apply()

  - 格式：函数名.apply();

  - 参数1：传入改函数this指向的对象，传入什么强制指向什么

  - 参数2：数组，放入我们原有所有参数

  - apply()应用小技巧

    ```javascript
    var arr=[1,2,3,4,5]
    alert(Math.min.apply(null,arr))
    ```

- bind() 预设this指向

  ```javascript
  function show(x,y){
      alert(this);
      alert(x+","+y);
  }
  var res=show.bind("bind");//不调用
  res(40,50);//bing 40,50
  ```

- 三者区别点：

  1. call和apply会调用函数，并改变函数内部this指向
  2. call和apply传递的参数不一样，call传递参数aru1，aru2...形式，apply必须数组形式[arg]
  3. bind不会调用函数，可以改变函数内部this指向。

- 主要应用场景：

  1. call常做继承
  2. apply经常跟数组有关系，比如借助math对象实现数组最大值最小值
  3. bind不调用函数，但想改变this指向，比如改变定时器内部的this指向

## 十三. let和const关键字

### 1. let关键字

```javascript
//类似var 但是所声明的变量，只在let命令所在的代码块内有效。
//不存在变量提升
//暂时性死区 只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。
//不允许重复声明
//应用在循环中每次不同循环会生成不同作用域
{
    let a=10;
    let b=1;
}
alert(a);//报错
alert(b);
```

### 2. const关键字

```javascript
/*
	变量值只能在声明时确定 后续无法修改
	相当于常量
*/
var IP="10.30.152.33";
//避免中途被修改
const IP="10.30.152.33";
```

## 十四. 箭头函数

- 箭头函数：另一种函数写法

```javascript
function add(x){
    return x+10;
}
var add=x => x+10;
//适当省略 函数中的function和return关键字。除了形式不一样其他完全一样。不推荐使用，可读性差

//1.无参数，无返回值
function show(){
    alert("1");
}
var show=() => {alert("1")}

//2.有一个参数，无返回值
function xxx(num){
    alert(num);
}
var xxx=num =>{alert(num);}

//3.有一个参数，有返回值
function add(x){
    return x+10;
}
var add=x => x+10;
//==================
function add(x){
    //代码
    return x+10;
}
var add=x => {
	//代码    	
    return x+10
}

//4.多个参数，有返回值
function show(x,y){
    return alert(x+y);
}
var show=(x,y)=>{
    return alert(x+y);
}
```

- 与数组方法结合使用

  ```javascript
  //filter 过滤
  var arr=[1,2,3,4,5,6];
  var newArr=arr.filter(function(item){
      return item>2;
  })
  alert(newArr);//3,4,5,6
  //转换成箭头函数
  var newArr=arr.filter(item => item>2);
  //====================
  var newArr=arr.map(item=>item*1.3);
  ```

- 注意：

  - 箭头函数不能用new
  - 返回值是对象一定要加();
  - 箭头函数中的this指向上一层函数主人,没有上一层指向window

## 十五. 解构和ECMA6字符串

### 1. 解构

```javascript
var x=10,y=20,z=30;
var [x,y,z]=[10,20,30];
var [x,[y,z]]=[10,[20,30]];
//上面3个效果一样
var name="钢铁侠",age=18,sex="男"
var {name,age,sex}={
    age:18,
    name:"钢铁侠",
    sex:"男"
}
//上面2个效果一样

/*
	好处：
		1.交换2个值
		2.函数可以返回多个值
		3.函数定义参数和传入参数顺序改变
			- 参数可以带默认值
		4.快速取出数组中某一元素
*/
//1
var [x,y]=[10,20];
[x,y]=[y,x];
//2
function xxx(){
    return [1,2,3]
}
var [a,b,c]=xxx();
//3
function show({name,age=20,sex}){
    alert("我叫"+name+"今年"+age+","+sex);
}
show({
    age:18,
    sex:"男",
    name:"小明"
})
//4
var arr=[10,20,30,40,50];
var {0:first,4:last}=arr;
alert(first);
```

### 2. ECMA6字符串

```javascript
/*
	传统字符串：单引号双引号
	ECMA6字符串：反引号
	
	ECMA6字符串新特性：
		1.回车和缩进保留
		2.${变量/表达式/函数调用}字符串拼接
*/

//2
function show({name,age=20,sex}){
    alert(`我叫${name},今年${age},+${sex}`);
}
```

## 十六.ECMA6新增数组方法和合并对象

### 1. 新增数组方法

```javascript
/*
	Array.from() 伪数组转真数组
	
	find()
	 - 功能：中查找符合条件的元素（短路操作
	 - 返回值；找到的元素
	 
	findIndex()
	 - 功能：中查找符合条件的元素（短路操作
	 - 返回值；找到的元素的下标
	 
	arr.copyWithin(target, start = 0, end = this.length)
	 - 功能：把某些个位置的元素复制并覆盖到其他位置上去
	 - target：目的起始位置。
	   start：复制源的起始位置，可以省略，可以是负数。
       end：复制源的结束位置，可以省略，可以是负数，实际结束位置是end-1。
  
*/

//find()
var arr=[10,20,30,40,50];
var res=arr.find(function(item,index,arr){
    //查找条件
    return item>20;
})
//箭头函数写法
var res=arr.find(item=>item>20)

//copyWithin
var arr=[1,2,3,4,5,6,7,8,9,10];
arr.copyWithin(2,4,9) //1,2,5,6,7,8,9,8,9,10
```

### 2. 合并对象

- Object.assign

```javascript
var obj1={
    a:30
    	b:20,
    	c:30,
    	d:40,
    	f:"地址"
}
var obj2={
    b:20,
    c:30
}
var obj3={
    d:40,
    f:["hello","world",true]
}
Object.assign(obj1,obj2,obj3);//从第二个参数开始，把后面的对象合并到第一个对象
//只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性
//浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
//浅拷贝：拷贝地址 深拷贝：复合数据类型重新生成一份
//遇到同名属性处理方法为替换
```

- 应用

```javascript
//为对象添加属性

```

## 十六.ECMA6集合

- 集合：

  - 不重复
  - 无序

- Set

  ```javascript
  let imgs=new Set();
  imgs.add(100);
  imgs.add(100);//重复 添加不进去
  imgs.add("hello");
  imgs.add("hello");//重复 添加不进去
  imgs.add(true);
  imgs.add(new String("world"));
  imgs.add(new String("world"));//每次新建一个 添加的进去
  
  /*
  	集合遍历
  	for...of
  */
  for(let item of imgs.keys()){
      console.log(item);
  }
  for(let item of imgs.values()){
      console.log(item);
  }
  for(let item of imgs.entries()){
      console.log(item);
  }
  
  /*
  	利用集合去重
  */
  var set=new Set([2,3,3,4,4]);
  var arr=[...set];//将数据结构展开成数组
  
  var arr=[1,1,2,2,3,3];
  arr=[...new Set(arr)];
  
  ```

- Map映射

  - 键值不一致

  ```javascript
  //声明
  let map =new Map();
  //添加
  map.set("张三","打渔");
  map.set("李四","种地");
  map.set("王五","挖煤");
  //取值
  alert(map.get("王五"));
  //遍历for of
  for(let [key,value] of map){
      console.log(key,value);
  }
  ```

## 十七.数组遍历回顾与补充

- 数组

  - for循环

    ```javascript
    var arr=[10,20,30,40,60];
    for(var i=0;i<arr.length;i++){
        document.write(arr[i]+","+i);
    }
    ```

  - for...in

    ```javascript
    for(var i in arr){
        document.write(arr[i]+","+i);
    }
    ```

  - foreach

    ```javascript
    arr.forEach(function(item,index){
        document.write(item+","+index);
    })
    ```

  - for...of

    ```javascript
    for(var item of arr){
        //item是当前遍历元素
        document.write(item);
    }
    ```

    

- 对象

  - for...in

    ```javascript
    for(var attr in obj){
        //attr是obj对象的属性
       document.write(attr+","+obj[attr]);
    }
    ```

- 集合

  - for ...of

## 十八.构造函数(封装)

```javascript
/*
	prototype原型对象
	概念：每一个函数，都有一个原型对象prototype
		用在构造函数上，我们可以给构造函数的原型prototype，添加方法，构造出来的对象共享原型上所有方法
*/

//通过new调用函数：构造函数，可以构造对象
//构造函数首字母大写
function Person(name,sex){
    //1.原料
    //var obj=new Object();
    //加new  this=new Object
    
    //2.加工
    this.name=name;
    this.sex=sex;
    this.showName=function(){
        alert("我的名字叫"+this.name);
    }
    this.showSex=function(){
        alert("我的性别是"+this.sex+"的");
    }
    //3.出厂
    //return obj;
    //加new return this;
}
var p1= new Person("blue","男");
/*
	如果某一函数使用new运算符调用
	 1.当前函数中的this指向新创建的对象
	 2.自动去完成1.原料和3.出厂
*/
//=============================================
//最终效果 类似于 类
function Person(name,sex){
    this.name=name;
    this.sex=sex;
}
Person.prototype.showName=function(){
    alert("我的名字叫"+this.name);
}
Person.prototype.showSex=function(){
    alert("我的性别是"+this.sex+"的");
}
```

## 十九.继承和多态

### 1. 继承

1. 父类

   ```javascript
   function Person(name){
       this.name=name;
       this.sum=function(){
           alert(this.name)
       }
   }
   Person.prototype.age=10;
   ```

2. #### 原型链继承

   ```javascript
   function Per(){
       this.name="ker";
   }
   Per.prototype=new Person();//原型链继承
   var per1=new Per();
   console.log(per1.age);//10
   ```

   概念：让新实例的原型等于父类的实例

   特点：实例可继承的属性有：实例的构造函数的属性，父类构造函数属性，父类原型的属性。（新实例不会继承父类实例的属性！）

   缺点：

   1. 新实例无法向父类构造函数传参
   2. 继承单一
   3. 所有新实例都会共享父类实例的属性。

3. #### 借用构造函数继承

   ```javascript
   function Per(){
       Person.call(this,"jer");//借用构造函数继承
       this.age=12;
   }
   var per1=new Per();
   console.log(per1.name);//jer
   console.log(per1.age);//12
   ```

   重点：用.call()和.apply()将父类构造函数引入子类函数（在子类函数中做了父类函数的自执行（复制））
   特点：

   1. 只继承了父类构造函数的属性，没有继承父类原型的属性。
   2. 解决了原型链继承缺点1、2、3。
   3. 可以继承多个构造函数属性（call多个）。
   4. 在子实例中可向父实例传参。

   缺点：

   1. 只能继承父类构造函数的属性。
   2. 无法实现构造函数的复用。（每次用每次都要重新调用）。
   3. 每个新实例都有父类构造函数的副本，臃肿。

4. #### 组合继承(组合上面2种）（常用）

   ```javascript
   function Per(name){
       Person.call(this,name);//借用构造函数
   }
   Per.prototype=new Person();//原型链继承
   var per=new Per("ker");
   console.log(sub.name);//gar 继承构造函数属性
   console.log(sub.age);//10  继承父类原型属性
   ```

   重点：结合了两种模式的优点，传参和复用

   特点：

   1. 可以继承父类原型上的属性，可以传参，可复用。
   2. 每个新实例引入的构造函数属性是私有的。

   缺点：调用了两次父类构造函数（耗内存），子类的构造函数会代替原型上的那个父类构造函数。

5. #### 原型式继承

   ```javascript
   function Person(name){
       this.name=name;
       this.sum=function(){
           alert(this.name)
       }
   }
   Person.prototype.age=10;
   
   //先封装一个函数容器，用来输出对象和承载继承的原型
   function content(obj){
       function F(){}
       F.prototype=obj;//继承传入参数
       return new F();//返回函数对象
   }
   var sup=new Person();//拿父类实例
   var sup1=content(sup);
   console.log(sup1.age);//10 继承了父类函数属性
   ```

   重点：用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象。object.create()就是这个原理。

   特点：类似于复制一个对象，用函数来包装。

   缺点：

   1. 所有实例都会继承原型上的属性。
   2. 无法实现复用。（新实例属性都是后面添加的）

6. #### 寄生式继承

   ```javascript
   //先封装一个函数容器，用来输出对象和承载继承的原型
   function content(obj){
       function F(){}
       F.prototype=obj;//继承传入参数
       return new F();//返回函数对象
   }
   var sup=new Person();//拿父类实例
   
   function subobject(obj){
       var sub=content(obj);
       sub.name="gar";
       return sub;
   }
   var sup2=subobject(sup);
   //这个函数经过声明之后成了可增添属性的对象
   console.log(typeof subobject);//function
   console.log(typeof sup2);//object
   console.log(sup2.name);//"gar",返回sub对象 继承了sub的属性
   ```

   重点：就是给原型式继承外面套了个壳子。

   优点：没有创建自定义类型，因为只是套了个壳子返回对象（这个），这个函数顺理成章就成了创建的新对象。

   缺点：没用到原型，无法复用。

7. #### 寄生组合式继承（常用）

   寄生：在函数内返回对象然后调用

   组合：1、函数原型等于另一个实例。2、在函数中用apply或call引入另一个构造函数，可以传参

   ```javascript
   //寄生
   function content(obj){
       function F(){}
       F.prototype=obj;
       return new F();
   }
   //content就是F实例的另一种表示法
   var con=content(Person.peototype);
   //con实例（F实例）的原型继承了父类函数的原型
   //上述更像是原型链继承，只不过只继承了原型属性
   
   //组合
   function Sub(){
   	Person.call(this);//继承了父类构造函数属性
   }//解决了组合式量词调用构造函数属性缺点
   //重点:
   Sub.prototype=con;//继承了con实例
   con.constructor=Sub;//一定要修复实例
   var sub1=new Sub();
   //Sub的实例就继承了构造函数属性，父类实例，con的函数属性
   console.log(sub1.age);//10;
   ```

   重点：修复了组合继承的问题

   > 继承内容引用于：https://www.cnblogs.com/ranyonsue/p/11201730.html

   

### 2.多态

- 多态背后的思想是将”做什么“和”谁去做以及怎样去做分开“。

  非多态代码示例

  ```javascript
  var makeSound = function(animal) {
      if(animal instanceof Duck) {
          console.log('嘎嘎嘎');
      } else if (animal instanceof Chicken) {
          console.log('咯咯咯');
      }
  }
  var Duck = function(){}
  var Chiken = function() {};
  makeSound(new Chicken());
  makeSound(new Duck());
  ```

  多态代码实例

  ```javascript
  var makeSound = function(animal) {
      animal.sound();
  }
  
  var Duck = function(){}
  Duck.prototype.sound = function() {
      console.log('嘎嘎嘎')
  }
  var Chicken = function() {};
  Chiken.prototype.sound = function() {
      console.log('咯咯咯')
  }
  
  makeSound(new Chicken());//咯咯咯
  makeSound(new Duck());//嘎嘎嘎
  ```

#### 3.__ proto __ 和instanceof关键字

- __ proto __ ：构造函数构造出来的对象，有一个属性`__proto__`,指向构造出这个对象的构造函数的原型。
- instanceof：instanceof运算符用来判断一个构造函数的prototype属性所指向的对象是否存在另外一个要检测对象的原型链上

## 二十. ECMA6的class语法

- 传统构造函数写法

  ```javascript
  function Person(name,sex,age){
      this.name=name;
      this.sex=sex;
      this.age=age;
  }
  Person.prototype.show=function(){
      alert('我的名字叫${this.name},今年${this.age}岁,${this.sex}');
  }
  ```

- ECMA6 class

  ```javascript
  class Person{
      constructor(name,sex,age){
          this.name=name;
      	this.sex=sex;
          this.age=age;
      }
      show(){
      	alert('我的名字叫${this.name},今年${this.age}岁,${this.sex}');
  	}
  }
  
  //继承
  class Worker extends Person{
      construtor(name,sex,age,job){
          //继承父级属性
          super(name,sex,age);
          this.job=job;
      }
      showJob(){
          alert("我的工作是"+this.job);
      }
  }
  ```

  