---
title: Mysql数据库常用命令
date: 2020-04-03 21:22:44
tags: ['MySql']
categories: ['后端','数据库']
cover: http://qny.bioart.icu/blog/6.jpg
---

登陆数据库：mysql -h localhost -u root -p

# 1.数据库操作

显示数据库：`show databases;`

创建数据库：`create database if not exists [数据库名字]`

创建数据库并指定字符集：`create database [库名] character set gbk;`

删除数据库：`drop database [库名];`

显示警告信息：`show warnings;`

运行sql文件：`source /绝对路径/文件名.sql`

# 2.数据表操作

创建数据表:

```mysql
CREATE TABLE 表名
(
	字段名1 数据类型[完整的约束条件],
	字段名2 数据类型[完整的约束条件]
)ENGINE=InnoDB DEFAULT CHARSET=utf8;	
```

数据表查询

- 查看数据表：

  ​	`SHOW TABLES;`

- 查看数据表结构：

  ​	`DESCRIBE 表名;`

- 查看表的创建信息：

  ​	`show create table 表名[\G];`

  

对表操作

- #### 修改表名

  ALTER TABLE 旧表名 RENAME [TO] 新表名;
    例子：`alter table sc rename score;`

- #### 修改表的存储引擎

  ALTER TABLE 表名 ENGINE=<更改后的存储引擎名>;
    例子：`alter table student engine = myisam;`

- #### 修改表的字符集

  ALTER TABLE 表名 CHARACTER SET 更改后的字符集 ;
  例子：`alter table student modify sno varchar(10) character set utf8;`

- #### 复制表

  `create table 新表名 select * from 旧表;`

- #### 删除表

  `drop table 表名;`

# 3.字段操作

​	

- 字段约束目录

  - PRIMARY KEY 主键约束			
    NOT NULL 非空约束			
     UNIQUE 唯一约束			
     DEFAULT 默认值约束			
     FOREIGN KEY 外键约束			
     AUTO_INCREMENT 自动增加值			

- #### 增删改字段操作

  - 添加字段
    ALTER TABLE 表名 ADD  新字段名  数据类型 [列级约束条件]
    	例子：`alter table student add class char(10) after ssex;`
  - 删除字段
    ALTER TABLE 表名 DROP 字段名;
     	例子：`alter table student drop class;`
  - 修改字段的数据类型
    ALTER TABLE 表名 MODIFY 字段名  数据类型;
     	例子：`alter table product modify ProductID int(11) AUTO_INCREMENT;`
  - 修改字段名和数据类型
    ALTER TABLE 表名 CHANGE 旧字段名  新字段名 新数据类型;
     	例子：`alter table student change sbirthday sbirth date;`

- #### 字段约束添加

  - 外键约束添加删除
    - 添加：ALTER TABLE 从表
      ADD CONSTRAINT 外键名 foreign key (被加字段) references 主表(主表字段);
    - 删除:alter table table_name drop foreign key 约束名
  - 主键添加删除
    - 先删后加:
    - 删除:alter table table_name drop primary key
    - 添加:alter table table_name add primary key (字段) 
  - 复合主键添加
    - 多个字段组合而成的主键，表级约束
    - PRIMARY KEY (字段名1,字段名2,...)
  - 非空约束添加删除
    - 添加:alter table table_name modify 列名 数据类型 not null 
    - 删除:alter table table_name modify 列名 数据类型 null
  - 唯一约束添加删除
    - 添加:alter table table_name add unique 约束名（字段） 
    - 删除:alter table table_name drop key 约束名
  - 自增添加删除
    - 添加:alter table table_name modify 列名 int auto_increment 
    - 删除:alter table table_name modify 列名 int
  - 默认值添加删除
    - 添加:alter table table_name alter 列名 set default '值' 
    - 删除:alter table table_name alter 列名 drop default

- 查看表字段信息

  - 查看表的字段信息：desc table_name;

# 4.对数据表数据操作

- #### 添加数据

  - 为所有字段添加数据
    INSERT [INTO] 数据表名(字段列表)  VALUES(值列表);
    `insert into student(sno,sname,ssex) values('1001','曹操','男');`

    如果向表中所有字段插入数据，可以省略字段列，可以写成：
    `insert into student values('1002','刘备','男');`

  - 为部分字段添加数据

    ​	INSERT [INTO] 数据表名 (字段名1 [, 字段名2] …) VALUES (值1[, 值2] …);
    ​	INSERT [INTO] 数据表名 SET 字段名1 = 值1 [, 字段名2 = 值2]
    ​	字段名必须与数据相对应 一次只能加一条
    ​	`insert into student set sno='1004',sname='貂蝉',classno='19004';`
    ​	`insert into student(sno,sname,classno) values ('1003','吕布','19001');`

  - 一次添加多行数据
    INSERT [INTO] 数据表名 [(字段列表)] VALUES (值列表) [, (值列表)] …;

  ```mysql
    insert into student values
    ('1005','司马懿',null,null,null,null,'19003'),
  ('1006','大乔','女',null,null,null,'19003'),
    ('1007','小乔','女',null,null,null,'19003');
  ```

- #### 删除数据

  DELETE FROM 数据表名 [WHERE 条件表达式];
  有WHERE条件，删除满足条件的记录，无WHERE条件，系统就会自动删除该表中所有的记录。
  删除example01表中所有记录：`select * from example01;`
  删除student表sno字段为1002的记录：`delete from student where sno = '1002';`

- #### 查询数据

  查询当前表数据： `SELECT * FROM 数据表名`

- #### 修改数据

  UPDATE 数据表名 SET 字段名1 = 值1 [, 字段名2 = 值2, …][WHERE 条件表达式];
  有WHERE条件，修改符合要求的对应字段，无WHERE条件，修改表中所有对应的字段。
  `update student set classno = '19003' where sname = '貂蝉';`

## 5.数据导出

- #### 使用 SELECT ... INTO OUTFILE 语句导出数据

  ```mysql
  SELECT 导出的字段 FROM 导出的表 
  INTO OUTFILE '路径(双反斜杠)' 
  character set utf8
  FIELDS
  	TERMINATED BY ','		-- 字段之间用,间隔   默认'\t'
  	ENCLOSED BY '\"'		-- 设置字段包围字符
  	ESCAPED BY '\''			-- 转义字符，默认为'\'
  LINES
  	STARTING BY 'val';		-- 每行的开头字符，默认不使用任何字符
  	TERMINATED BY '\r\n';	-- 每行的结尾字符，默认为'\n'
  
  -- 例子：
  SELECT * FROM student 
  INTO OUTFILE 'C:\\ProgramData\\MySQL\\MySQL Server 5.7\\Uploads\\myschool35stu.txt' 
  character set utf8
  FIELDS
  	TERMINATED BY ','
  	ENCLOSED BY '\"'
  	ESCAPED BY '\''
  LINES
  	TERMINATED BY '\r\n';
  ```

## 6.视图

- 创建视图命令：` create view 视图名字 as`
- 删除视图命令：`drop view 视图名;`
- 修改视图数据：`update view_s set sname = '安琪拉' where sno = '2005020301'`
- 删除视图数据：`delete from view_s where sname ='安琪拉'`

## 7.索引

- 创建索引

  - 建表时

    ```mysql
    CREATE TABLE <表名>
    	(
        <字段1> <数据类型1> [<列级完整性约束条件1>],
        <字段2> <数据类型2> [<列级完整性约束条件2>],
        [UNIQUE|FULLTEXT|SPATIAL] <INDEX|KEY> [索引名](属性名[(长度)] [,…]) 
    	);
    
    create table test_index
    	(
    	tid int,
    	tname varchar(20),
    	tcount double,
    	index index_tid (tid) -- 普通索引
        unique index index_test(tid,tname) -- 唯一索引
    	);
    ```

  - 建表后

    - create语句：`create [UNIQUE|FULLTEXT|SPATIAL] INDEX 索引名 on 表(字段);`
    - alter语句：`ALTER TABLE 表名 ADD  [UNIQUE|FULLTEXT|SPATIAL] INDEX 索引名 (属性名[(长度)] [,…]);`

## 6.用户管理

### 1.查看用户

```mysql
 select user,host from mysql.user;
```

### 2.创建用户

```mysql
不带密码
create user user1@localhost;
带密码
create user userA@localhost identified by '123'
创建多个
create user
user2@localhost identified by 'user2',
user3@localhost identified by 'user3';
```

### 3.删除用户

```mysql
drop user test1,tets2@localhost;
```

### 4.修改密码

```mysql
ALTER USER 账户名 IDENTIFIED BY '明文密码';
```

### 5.修改用户名

```mysql
rename user 旧用户名 to 新用户名;
将用户user1和user2的名字分别修改为test1和test2。
rename user 'user1' to 'test1','user2'@'localhost' to 'tets2'@'localhost';
```

## 7.权限管理

### 1.查看权限

```mysql
看自己
show grants
看别人
show grants for root@localhost
```

### 2.授予权限

```mysql
授予test1用户对所有数据有查询和插入权限
create user test1@localhost identified by '123';
grant select,insert
on *.*
to test1@localhost;

gradem数据库中student表的DELETE权限授予用户user4。
grant delete
on gradem.student
to user4@localhost;

添加多个和grant权限
grant delete,select,create,drop
on gradem.student
to user4@localhost
with grant OPTION;

使用GRANT语句将gradem数据库中sc表的degree列和cno列的UPDATE权限授予用户test1。
grant update(degree,cno)
on gradem.sc
to test1@localhost;
```

### 3.回收权限

```mysql
REVOKE语句收回test8用户的的所有权限，包括GRANT权限。
revoke all privileges,grant option
from test8@localhost;

收回用户指定的权限 收回test1用户对gradem数据库中sc表的cno列的UPDATE权限
revoke update(cno) 
on gradem.sc
from test1@localhost;
```

## 7.存储函数

存储函数格式：

```mysql
CREATE FUNCTION 函数名([参数名 数据类型, …]) RETURNS 返回值类型
			[BEGIN]
			 # 函数体
			 RETURN 返回值数据; # 数据必须与结构中定义的返回值类型一致
			[END]
```

不带参数函数：

```mysql
delimiter $$
	create function sayhello() returns varchar(20)
	begin
		return 'hello world！';
	end
	$$
	delimiter ;
```

带参数函数

```mysql
-- 带参数的函数。创建一个名为func_name的存储函数，返回某位老师的姓名。
delimiter $$
	create function func_name(t_tno varchar(10)) returns varchar(20)
	begin
		return (select tname from teacher where tno = t_tno);
	end
	$$ 
	delimiter ;
```

查看函数创建语句

```mysql
SHOW CREATE FUNCTION sayhello \G
```

查看函数状态语句

```mysql
SHOW FUNCTION STATUS LIKE 'sayHello' \G
```

调用函数

```mysql
SELECT 函数名1(实参列表), 函数名2(实参列表), …;
select sayhello();
```

删除函数

```mysql
DROP FUNCTION [IF EXISTS] 函数名;
drop function sayhello;
```

#### 一些系统函数：

```mysql
-- 将字符串转换为全部大写。
SELECT UPPER('Welcome to My SQL');
-- 将字符串转换为全部小写。
SELECT LOWER('Welcome to My SQL');
-- 去掉字符串前后的空格。
SELECT TRIM('  Welcome to My SQL  ');
-- 截取从第12个字符开始的10个字符。
SELECT MID('Welcome to My SQL',12,10);

#使用日期型函数，获得输出结果见下表。
#输出结果：
#年份 月份 日期 星期几
#2009 11 18 2
SELECT YEAR('2009-11-18')  年份,MONTH('2009-11-18') 月份,DAY('2009-11-18') 日期,
WEEKDAY('2009-11-18')  星期几;

```

## 8.存储过程

存储过程格式

```mysql
DELIMITER 新结束符号
				CREATE PROCEDURE 过程名字([[ IN | OUT | INOUT ] 参数名称 参数类型])
				BEGIN
				  过程体
				END
				新结束符号
				DELIMITER ;
```

无参过程

```mysql
-- 从数据库gradem的student表中检索出所有籍贯为“青岛”的学生的学号、姓名、班级号及家庭地址等信息。
delimiter $$
	create procedure proc_stud()
	begin
		select sno,sname,classno,saddress 
		from student 
		where saddress like '%青岛%';		
	end
	$$
	delimiter ;
```

有参过程

```mysql
delimiter $$
	create procedure proc_sc(in tmp_sno varchar(10))
	begin
		select * from sc 
		where sno = tmp_sno;
	end
	$$
	delimiter ;
```

有参有返回值过程

```mysql
-- 创建一个名为proc_sc_num的存储过程，统计某位同学的考试门数。
delimiter $$
	create procedure proc_sc_num(in tmp_sno varchar(10),out count_num int)
	begin
		select count(*) into count_num
		from sc 
		where sno = tmp_sno;
	end
	$$
	delimiter ;
```

查看存储过程创建语句

```mysql
SHOW CREATE PROCEDURE 过程名;
show create procedure proc_sc_num;
```

查看存储过程状态信息

```mysql
SHOW PROCEDURE STATUS [LIKE 匹配模式];
SHOW PROCEDURE STATUS LIKE 'proc%'\G
```

调用存储过程

```mysql
CALL 数据库名.存储过程名称([实参列表]);

-- 无参
call proc_stud();
-- 有参
call proc_sc('2007010104');
-- 有参有返回值
call proc_sc_num('2007010104',@num);
select @num;
```

## 9.变量

### 系统变量

- 概念：系统变量也可称为全局变量，指的就是MySQL系统内部定义的变量，对所有MySQL客户端都有效。默认情况下，会在服务器启动时使用命令行上的选项或配置文件（ini文件）完成系统变量的设置。

  ```mysql
  SHOW [GLOBAL | SESSION] VARIABLES  [LIKE '匹配模式']
  -- 查看当前mysql版本
  SELECT @@version 
  ```

- 修改系统变量

  ```mysql
  -- 永久生效
  # 语法1
  SET GLOBAL 变量名 = 值;
  # 语法2
  SET @@GLOBAL.变量名 = 值;
  
  -- 仅本次链接生效
  SET 变量名 = 新值;
  ```

### 用户变量

- 概念：基于会话变量实现的, 可以暂存值, 并传递给同一连接里的下一条sql使用的变量。当客户端连接退出时,变量会被释放。

- 用户变量的定义：

  ```mysql
  # 语法1
  SET @变量名 =表达式;
  # 语法2
  SELECT @变量名 :=表达式;
  
  -- 查询结果赋值给变量
  SET @student=(SELECT sname FROM student 
                WHERE sno='2007010120');
  
  ```

### 局部变量

- 概念：局部变量的作用范围仅在复合语句语法BEGIN和END语句之间，保证局部变量在除BEGIN和END之间以外的任何地方，不能被获取和修改。

- 定义局部变量格式：

  ```mysql
  DECLARE 变量名1 [, 变量名2] … 数据类型 [DEFAULT 默认值]
  -- 省略default时变量的初始值为NULL
  ```

- 例子

  ```mysql
  -- 创建一个名为addr的局部变量，并在select语句中使用该局部变量查找位于青岛的所有学生的学号和名字。
  DELIMITER $$
  CREATE PROCEDURE proc_setaddr() 
  	begin
  		DECLARE addr varchar(50);
  		set addr = '青岛';
  		select sno,sname 
  		from student
  		where saddress like concat('%',addr,'%');
  	end
  	$$
  DELIMITER ;
  ```

- 使用SELECT...into为变量赋值

  ```mysql
  -- 查找‘计算机工程系’的专业主任，将主任名字保存在变量中。
  DELIMITER $$
  CREATE PROCEDURE proc_into_dept(in dept_value varchar(50)) 
  	begin
  		DECLARE deptheader_value varchar(50);
  		select deptheader into deptheader_value
  		from department
  		where deptname = dept_value;
  		select dept_value 专业, deptheader_value 专业主任;
  	end
  	$$
  DELIMITER ;
  ```

## 10.流程控制语句

### 条件结构

- if...else 用于指定SQL语句的执行条件

  - 格式

    ```mysql
    IF search_condition THEN statement_list
    [ELSEIF search_condition THEN statement_list]…
    [ELSE statement_list]
    END IF;
    ```

  - 例子

    ```mysql
    -- 查询‘2007010104’同学‘a01’ 课程的成绩，如果成绩大于90分，则显示“考的不错！”，否则显示“加油！”。
    DELIMITER $$
    CREATE PROCEDURE proc_if() 
    	begin
    	  DECLARE d_value int;
    	  select degree into d_value 
    	  from sc 
    	  where sno = '2007010104' and cno = 'a01';
    	  if d_value >90 then 
    	      select concat('考了',d_value,',考的不错！') as 成绩 ;
    	  else  
    	     select concat('考了',d_value,',加油！') as 成绩  ;
    	  end if;
    	end
    	$$
    DELIMITER ;
    
    -- select 输出内容 as 字段名    可以在结果中新建一列并输出
    ```

- case语句

  ```mysql
  DELIMITER $$
  CREATE PROCEDURE proc_level(IN score DECIMAL(5, 2))
  BEGIN
  	CASE
  	    WHEN score > 89 THEN SELECT '优秀' as 等级;
  	    WHEN score > 79 THEN SELECT '良好' as 等级;
  	    WHEN score > 69 THEN SELECT '中等' as 等级;
  	    WHEN score > 59 THEN SELECT '及格' as 等级;
               ELSE SELECT '不及格' as 等级;
      	 END CASE;
  END
  $$
  DELIMITER ;
  
  ```

### 循环结构

- while...end循环

  ```mysql
  -- 使用while语句求1 ～ 100的和
  DELIMITER $$
  CREATE PROCEDURE proc_while() 
  begin
  	DECLARE i,sum int DEFAULT 0;
  	WHILE i<=100 DO
  	  SET sum=sum+i;
       	  SET i=i+1;
  	END WHILE;
  	SELECT sum as 求和;
  end
  $$
  DELIMITER ;
  ```

- repeat...end循环

  ```mysql
  -- 使用REPEAT语句求1 ～ 100的奇数和
  DELIMITER $$
  CREATE PROCEDURE proc_repeat() 
  begin
    DECLARE i,sum int DEFAULT 0;
    repeat
        if i%2 != 0 then
          set sum = sum+i;
        end if;
        SET i=i+1;
    until i>100
   end repeat;
    SELECT i,sum ;
  end
  $$
  DELIMITER ;
  ```

- loop...end循环

  ```mysql
  -- 使用LOOP语句求1 ～ 100的和
  DELIMITER $$
  CREATE PROCEDURE proc_loop() 
  begin
    DECLARE i,sum int DEFAULT 0;
    add_sum:LOOP
   	if i>100 then 
  	  LEAVE add_sum;
  	else
  	  set sum = sum+i;
  	  set i = i+1;
  	end if;
    end loop;
    SELECT i,sum ;
  end
  $$
  DELIMITER ;
  ```

- 例子

  ```mysql
  -- 利用循环往表中插入大量数据
  
  CREATE TABLE `gradem`.`test_auto_insert`  
  (
    `tid` int(11) NOT NULL,
    `name` varchar(20) ,
    `number` varchar(20) 
  ) ENGINE = InnoDB CHARACTER SET = utf8;
  
  DELIMITER $$
  CREATE PROCEDURE proc_million() 
  begin
  	DECLARE i bigint DEFAULT 1;
  	DECLARE num bigint DEFAULT 101;
  	WHILE i<=1000001 DO
  	  insert into test_auto_insert(tid,name,number) values(i,concat('测试',i),num);
      SET i=i+1;
  	END WHILE;
  end
  $$
  DELIMITER ;
  ```

## 11.触发器

### 0.格式

```txt
要素：触发器的要素：触发事件类型，触发时间，触发对象。
		事件类型：增删改，三种类型，insert、delete和update；
		触发时间：操作前还是操作后：before和after；
		触发对象：表中的每一条记录（行）


创建触发器
	语法格式：CREATE TRIGGER 触发器名 触发时机 触发事件 
				ON 表名 
				FOR EACH ROW  触发顺序
				BEGIN
				  操作的内容
				END
```

### 1.插入触发器

```mysql
delimiter $$
create  trigger trig_ssex_student before insert
on student
for each row 
begin
	if(new.ssex!='男' and new.ssex!='女')then
		set new.ssex='男';
	end if;
end
$$
delimiter ;
```

```mysql
#1.创建插入触发器trig_insert。当向销售订单表（Sell_Order）添加一条销售订单信息时，同时需要更新商品表（Product）中的“现有库存量（ProductStockNumber）”列和“已经销售的商品量（ProductSellNumber）”列。
delimiter $$
create  trigger trig_insert after insert
on sellorder
for each row 
begin
	update product set ProductStockNumber=ProductStockNumber-new.SellOrderNumber where ProductID=new.ProductID;
	update product set ProductSellNumber=ProductSellNumber+new.SellOrderNumber where ProductID=new.ProductID;
end
$$
delimiter ;
```

### 2.删除触发器

```mysql
delimiter $$
create  trigger student_delete before delete
on student
for each row 
begin
		SET @@foreign_key_checks=OFF;
		delete from sc where old.sno=sno;
end
$$
delimiter ;
```

```mysql
#2.创建删除触发器trig_delete。当向销售订单表（Sell_Order）删除一条销售订单信息时，同时需要更新商品表（Product）中的“现有库存量（ProductStockNumber）”列和“已经销售的商品量（ProductSellNumber）”列。
delimiter $$
create  trigger trig_delete after delete
on sellorder
for each row 
begin
	update product set ProductStockNumber=ProductStockNumber+old.SellOrderNumber where ProductID=old.ProductID;
	update product set ProductSellNumber=ProductSellNumber-old.SellOrderNumber where ProductID=old.ProductID;
end
$$
delimiter ;
```

### 3.更新触发器

```mysql
delimiter $$
create  trigger student_sno before update
on student
for each row 
begin
		update sc set sno = new.sno where sno = old.sno;
end
$$
delimiter ;
```

```mysql
#3.创建更新触发器trig_update。当供应商表（Provider）中的“供应商编号（ProviderID）”变更时，同时更新表中相应的采购订单表（Purchase_order）的“供应商编号（ProviderID）”信息。
delimiter $$
create  trigger trig_update after update
on provider
for each row 
begin
	update purchase_order set ProviderID=new.ProviderID	where ProviderID=old.ProviderID;
end
$$
delimiter ;
```

### 4.查看触发器` show triggers`

### 5.删除触发器`DROP TRIGGER 触发器名`