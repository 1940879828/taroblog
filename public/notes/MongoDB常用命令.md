---
title: MongoDB常用命令
tags: 'MongoDB'
date: 2023-04-4 22:07:29
categories: '数据库'
cover: http://qny.bioart.icu/blog/12.jpg
---

### 一. 数据库相关

1. ##### 查询数据库列表

   `show dbs `

2. ##### 创建或切换数据库

   `use database_name `

3. ##### 删除数据库

   `db.dropDatabase() `

### 二. 集合相关

1. ##### 创建集合

   `db.createCollection(name, options) `

   options:

   - **capped**如果为true则创建固定集合（有着固定大小的集合） 
   - **size**为固定集合指定一个最大值，如果capped为true需要指定该字段 
   - **max** 指定固定集合中包含文档的最大数量 

   举例：

   ```sql
   db.createCollection("t_article", {
       capped: false,
       size: 5242880, //Specify a maximum size in bytes for a capped collection. 
       max:5000, //The maximum number of documents allowed in the capped collection.
   })
   ```

2. ##### 查看集合列表

   `show collections`

3. ##### 删除集合

   `db.<集合名>.drop() `

### 三. 文档相关

1. ##### 插入文档

   `insert()` 或者 `insertMany()`

   举例：

   ```sql
   db.t_article.insertMany([
       {
           id: 1,
           title: "2018新版java学习路线",
           content: "java学习路线",
           created: new Date("2018-10-10"),
           modified: null,
           categories: "默认分类",
           tags: ["2018","Java",'学习路线'],
           allow_comment: 1,
           thumbnail: null,
           hits: 92,
           comments_num: 2,
           t_comment:[
               {
                   created:new Date("2018-12-13"),
                   ip:"0:0:0:0:0:0:0:1",
                   content:"很不错",
                   status:"approved",
                   author:"李四"
               },
               {
                   created:new Date("2018-12-14"),
                   ip:"0:0:0:0:0:0:0:1",
                   content:"很不错d",
                   status:"approved",
                   author:"张三"
               }
           ]
       },
       {
           id: 2,
           title: "2018新版python学习路线",
           content: "python学习路线",
           created: new Date("2018-10-10"),
           modified: null,
           categories: "默认分类",
           tags: ["2018","python",'学习路线'],
           allow_comment: 1,
           thumbnail: null,
           hits: 18,
           comments_num: 1,
           t_comment:[
               {
                   created:new Date("2018-12-13"),
                   ip:"0:0:0:0:0:0:0:1",
                   content:"很不错",
                   status:"approved",
                   author:"王五"
               }
           ]
       }
   ])
   ```

2. ##### 查询文档

   `db.<集合名>.find(<query>,<projection>)`

   options:

   - query: 可选，使用查询操作符指定查询条件 
   - projection: 可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）。 

   举例：

   ```sql
   // 1 查询：名字是tom 只显示username字段和email字段
   db.t_user.find({username:"tom"},{username: 1,email: 1})
   // 返回
   {
   	"_id" : ObjectId("642c1d48316b1ef08b947f36"),
   	"username" : "tom",
   	"email" : "2127269781@qq.com"
   }
   
   //2 查询点击量和评论数都大于等于1的文章，查询结果只显示文章标题和tags
   db.t_article.find(
       {
           hits: {$gt:1},			// $gt大于 $lt小于 $gte大于等于 $lte小于等于
           comments_num: {$gt:1},
       },
       {
           title: 1,
           tags: 1
       }
   )
   
   // 3 查询文章标题以：2018开头的文章，查询结果除了文章内容不显示，其他都显示。
   db.t_article.find(
       {
           title: {$regex:'^2018.*'},
       },
       {
           content: 0,
       }
   )
   
   
   ```

3. ##### 更新文档

   ```sql
   db.collection.update(
      <query>,
      <update>,
      {
        upsert: <boolean>,
        multi: <boolean>,
        writeConcern: <document>
      }
   )
   ```

   options

   - query : update的查询条件，类似sql update查询内where后面的。
   - update : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
   - upsert : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
   - multi : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
   - writeConcern :可选，抛出异常的级别。

   举例：

   ```sql
   // 将用户 tom 的权限更新为ROLE_admin
   db.t_user.update(
       {username: "tom"},
       {$set:{"authority":"ROLE_admin"}}, 
       { multi: false, upsert: true}
   )
   ```

   

4. ##### 删除文档

   `db.colection.remove(<query>,<justOne>)`

   options:

   - query: (可选) 删除条件
   - justOne: (可选) 默认false 全删，可以设为true或1，只删除一个