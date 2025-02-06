---
title: php入门笔记
date: 2020-06-05 16:27:40
tags: 'php'
categories: ['后端','PHP']
cover: http://qny.bioart.icu/blog/10.jpeg
---

## 服务器认识

软件架构

- C/S (客户端->服务端)
- B/S (浏览器->服务端)
  - 客户端：资源受益方
  - 服务端：资源提供方

开发网站的技术：php、jsp、asp、ruby、python、nodejs、c/c++等

集成开发环境:

- WAMP架构：windows+apache+mysql+php
- LAMP架构：Linux+apache+mysql+php
- LNMP架构：Linux+nginx+mysql+php
  - apache：对外开放你的某一个磁盘

PHPnow：apache+mysql+php

## PHP简介

- 特点：
  1. PHP（Hypertext Preprocessor）超文本预处理器：是一种通用开源脚本语言
  2. PHP脚本在服务器上运行，文件后缀名为.php
  3. PHP可以在不同平台上运行（windows、Linux、Unix、Mac等）
  4. PHP与目前几乎所有的正在被使用的服务器兼容(Apache、IIS等)
  5. PHP提供了广泛的数据库支持
  6. PHP免费，官网（www.php.net）
  7. PHP易于学习且运行高效
  8. 严格语法

## 一些PHP的简单的语法

### 1.php输出

```php
<?php
    header('content-type:text/html;charset="utf-8');//头文件声明编码格式

    /*
        php输出函数
    */

    //往页面写入内容 标签会被解析 不会覆盖之前的内容
    echo "<h1>hello world</h1>";
    print_r("<h1>hello world</h1>");
	print "数字是：$x<br>";

    //类似于console.log() 一般用于测试程序
    var_dump(100);// int(100) 
    var_dump("hello");// string(5) "hello"
?>
```

### 2.变量和数据类型

- 变量定义规则

  - 变量以$符开始，后面跟变量名称
  - 变量名必须以字母或学习开始
  - 变量名只能包含字母数字下划线
  - 变量名不能有空格
  - 变量名区分大小写

  ```php
  <?php
      header('content-type:text/html;charset="utf-8');
  
      /*
          声明变量
           - 弱引用 赋值什么类型就是什么类型数据
          数据类型：
           字符串String 整形Integer 浮点型Float 布尔Boolean
           数组Array 对象Object 空的NULL
      */
      $username="钢铁侠";
      $age=18;
  
      /*
          字符串拼接用 .
          或者用占位符 {变量/表达式}
      */
  
      echo "我是".$username."今年".$age."岁";
      echo "我是{$username}今年{$age}岁"
  ?>
  ```

### 3.条件语句

#### 3.1.分支语句

```php
<?php
    header('content-type:text/html;charset="utf-8');   
    $isYes=true;
    if($isYes){
        echo "是";
    }else{
        echo "否";
    }
?>
```

#### 3.2.switch语句

```php
<?php
    $num =2;
    switch($num){
        case 1:
            echo "数字1";
            break;
        case 2:
            echo "数字2";
            break;
        default:
            echo "输入错误";
            break;
    }
?>
```

#### 3.3.循环

```php
<?php
	for($x=0;$x<=10;$x++){
        print "数字是：$x<br>";
    }
?>
```

### 4.函数

```php
<?php
    function printHello(){
        print "hello world<br/>";
    }
    printHello();
?>
```

### 5.数组

- PHP有三种类型的数组

  - 数值/索引数组：下标是数字

    ```php
    <?php
        header('content-type:text/html;charset="utf-8');   
        $cars=array("大众","别克","奔驰");
        var_dump($cars);
        //array(3) { [0]=> string(6) "大众" [1]=> string(6) "别克" [2]=> string(6) "奔驰" } 别克
        echo $cars[1];//别克
        for($i=0;$i<count($cars);$i++){
            echo "下标：{$i},数据：{$cars[$i]}<br/>";
            /*
            下标：0,数据：大众
            下标：1,数据：别克
            下标：2,数据：奔驰
            */
        }
    ?>
    ```

  - 关联数组：带指定键的数组，每个键关联一个值（类似map）

    ```php
    <?php
        header('content-type:text/html;charset="utf-8');   
        $arr=array("王五"=>"打渔","张三"=>"种地","李四"=>"打猎");
        var_dump($arr);
        //array(2) { ["王五"]=> string(6) "打渔" ["李四"]=> string(6) "打猎" }
        foreach($arr as $key => $value){
            echo "下标：{$key},数据：{$value}<br/>";
            /*
            下标：王五,数据：打渔
            下标：张三,数据：种地
            下标：李四,数据：打猎
            */
        }
    ?>
    ```

  - 多维数组：索引数组和关联数组结合

    ```php
    <?php
        header('content-type:text/html;charset="utf-8');   
        $arr = array(
            array("name"=>"小白","英语"=>100,"数学"=>50),
            array("name"=>"小花","英语"=>60,"数学"=>100),
            array("name"=>"小红","英语"=>100,"数学"=>100)
        );
        for($i=0;$i<count($arr);$i++){
            var_dump($arr[$i]."<br/>");
            /*
                 string(10) "Array
                 " string(10) "Array
                 " string(10) "Array
                 "
            */ 
            echo $arr[2]["数学"];//100
        }
    ?>
    ```

  - 全局数组  

    - $_GET：接收通过get提交过来的所有数据
    - $_POST：接收通过post提交过来的所有数据

### 6.数组函数

- array_keys()：返回数组中所有键名
- array_pop()：删除数组中最后一个元素（出栈）
- array_push()：将一个或多个元素插入数组的末尾（入栈）
- array_rand()：从数组中随机选出一个或多个元素，返回键名
- array_shift()：删除数组中第一个元素并返回删除元素的值
- count()：返回数组中元素的数目
- in_array()：检查数组中是否存在指定的值

### 7.字符串函数

- explode()：字符串打散为数组
- implode()：返回一个由数组元素组合成的字符串
- join() implode()：合并成数组
- trim()：去掉字符串两边的字符
- md5()：计算字符串的MD5散列
- str_replace()：替换字符串中的一些字符(大小写敏感)

### 8.事件函数

- date()：获取当前的日期
- dote('Y-m-d H:i:s')：获取当前日期，格式化
- time()：获取时间戳
- strtotime('2017-01-01 0:0:0')：字符串转换成时间戳
- getdate()：返回某个时间戳或者当前本地的日期/时间的日期/时间信息