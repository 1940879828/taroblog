---
title: laravel框架学习笔记
tags: ['PHP']
date: 2020-12-01 20:06:29
categories: ['后端','Php']
cover: http://qny.bioart.icu/blog/11.jpeg
---

# laravel54笔记

### 1.准备前

- 切换阿里云镜像:`composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/`
- laravel下载语句:`composer create-project laravel/laravel=5.4.* --prefer-dist ./laravel`

### 2.目录结构分析

- app：核心目录，存放核心代码，控制器、模型、路由。模型文件直接写在app目录下即可，也可分目录管理
- bootstarp（启动）：laravel启动目录，autoload.php文件用于自动载入需要类文件
- config：项目配置目录，存放配置目录。例如数据库的配置文件
  - App.php：项目主要配置文件
  - Auth.php：用于定义用户认证（登陆）配置文件
  - Database.php：针对数据库的配置
  - Filesystems.php：上传文件、文件存储需要使用到的配置文件
- database：数据迁移目录，存储跟数据表相关的操作类文件（迁移文件、种子文件
  - migrations：创建数据表类
  - seeds：种子文件目录、
- public：项目入口文件和系统静态资源目录（css,img,js,uploads）后期使用的外部静态文件（js、css、图片等）都需要放到public。项目单一入口文件也在此目录下，和后续配置虚拟主机时需将站点位置指定到public下
- resources：存放视图文件，还有语言包文件的目录
  - assets：有用的
  - lang：语言包，如需本地化配置语言包
  - views：视图，可分目录管理
- routes：定义路由的目录，web.php是定义路由的文件
- storage：存放缓存和日志文件，在linux下该目录需可写权限（后期用户上传文件如果存在本地也在此目录）
  - app：用户文件
  - framework：缓存文件
  - logs：日志
- vendor：第三方代码依赖
- .env文件：设置一些系统相关的环境配置文件信息。config目录里面的文件配置内容一般都是读取该文件里面的配置信息（config里面的配置项的值基本来自.env文件）
- **artisan脚手架文件**：主要用于生成的代码（自动生成），比如生成控制器，模型文件等
  - 执行命令：#php artisan (环境变量，artisan存在命令行当前工作路径)
- composer.json：依赖包配置文件，声明当前需要的软件依赖，不能删，composer需使用

| 目录                 | 作用                                 |
| -------------------- | ------------------------------------ |
| app                  | 保存模型文件（默认）                 |
| app/Http/Controllers | 保存控制器文件                       |
| resources/views      | 保存视图文件                         |
| config               | 配置文件目录                         |
| routes               | 存放路由文件                         |
| database/migrations  | 存放数据库迁移文件（操作数据表结构） |
| database/seeds       | 存放数据库种子文件（模拟测试数据）   |

### 3.启动方式

方式一(不推荐)：Laravel框架提供了更简单的方式启动项目（相比配置apche）

- cmd执行命令：`#php artisan serve`
- 缺点：能跑php，不启动数据库，如果修改项目配置文件，则需重新启动

方式二(推荐)：使用wamp或lamp环境，虚拟主机配置（虚拟主机≠虚拟机）

### 4.路由

- 什么是路由：将用户的请求按照事先规划的方案提交给指定的控制器或功能函数来进行处理（通俗的酱，路由就是访问地址形式）。在ThinkPHP框架中，当我们在URL地址中，传递m、c、a三个参数时，系统会自动跳转到指定模型中指定控制器的指定方法，这些处理过程都由框架自动完成。但在Laravel框架，并没有指定固定参数，其路由必须手工配置。

#### 4.1.路由配置文件：routes/web.php

- 路由定义格式：**Route::请求方式('请求的url',匿名函数或控制响应方法)**

#### 4.2.路由方式

```php
Route::get($url,$callback);//支持get请求方式
Route::post($url,$callback);//支持post请求方式
Route::match($url,$callback);//表示匹配固定（自己定义）请求方式
Route::any($url,$callback);//匹配任意请求方式
//下面不常用
Route::put($url,$callback);
Route::delete($url,$callback);
Route::options($url,$callback);
```

有时候还需要注册路由响应多个HTTP请求，这可以通过`match`方法来实现。或者用`any`方法注册一个路由来响应所有HTTP请求

```php
Route::match(['get','post'],'/',function(){
    //可以通过get和post方式请求/目录
});
Route::any('foo',function(){
    //可以通过任意请求方式访问/foo目录
});
```

#### 4.3.路由参数

- 路由参数就是给路由地址传递参数

路由参数分为必选参数和可选参数 

```php
//必须传参，不传报错
Route::get('/user/{id}',function($id){
	return "当前用户id是".$id;
});
//有id也行 没id也行需要给默认值
Route::get('/user/{id?}',function($id=null){
	return "当前用户id是".$id;
});
Route::get('/user/{id?}',function($id=5){
	return "当前用户id是".$id;
});
//参数字符不支持-可以用_代替
```

还可以通过传统的?传参，不需要写路由

#### 4.4.路由别名

路由别名相当于在路由定义时，为路由起了一个别名，在以后程序中可以通过这个别名来获取路由信息。

```php
Route::get('/user/{id}',function($id){
    //xxx
})->name('名字');
//调用
route('名字');
```

查看系统已有路由：php artisan

#### 4.5.路由群组

比如后台有如下路由

/admin/login

/admin/logout

/admin/index

/admin/user/add

他们共同点都有admin前缀，为了管理方便，可以把他们放到一个路由分组中，使用prefix属性指定路由前缀

比如你想为所有路由URIs前面添加前缀admin

```php
Route::group(['prefix'=>'admin'],function(){
    Route::get('users',function(){
        //匹配"/admin/users"
    });
    Route::get('logout',function(){
        //匹配"/admin/logout"
    });
    Route::get('user/add',function(){
        //匹配"/admin/user/add"
    });
});
```

语法：Route::group(公共属性数组,回调函数)

### 5.控制器

- 控制器文件位于：app/Http/Controllers
- 控制器文件如何命名：大驼峰命名+Controller.php。例如：GoodsController.php

#### 5.1.控制器生成

`php artisan make:controller 控制器名(大驼峰)+Controller 关键词`

例如：`php artisan make:controller TestController`

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;//命名空间三元素：常量、方法、类

class TestController extends Controller
{
    //测试路由函数
    public function test1(){
        phpinfo();
    }
}
```

#### 5.1.控制器路由

- 如何使用路由规则调用控制器下的方法
- 路由设置格式基本相同，只需将匿名函数换成`控制器类命@方法名`
- 格式：Route::请求方法(路由表达式,控制器@方法)

例子：设定路由home/test/test1

```php
//web文件下
Route::get('home/test/test1','TestController@test1');
```

- 分目录管理：
  - 例：创建前台分组，在前台平台中创建IndexController.php文件；同时建立后台分组，再创建后台的IndexController.php
  - 在Controllers文件夹下新建2个文件夹 Admin和Home
  - 创建控制器文件命令
    - `php artisan make:controller Admin/IndexController`
    - `php artisan make:controller Home/IndexController`
  - 路由文件：
    - `Route::get('home/index/index','Home\IndexController@index');`
    - `Route::get('admin/index/index','Admin\IndexController@index');`

### 6.控制器接受用户输入

- 接受用户输入类：Illuminate\Support\Facades\Input
- Facades:中文门面。门面是介于一个类的实例化与没有实例化中间的一个状态。其实是类的一个接口实现。在这个状态下可以不实例化类但是可以调用类中的方法。

```php
Input::get('参数名字','如果参数没被传递使用该默认值')
Input::all() //获取所有用户输入
Input::get('') //获取单个的用户输入
Input::only([]) //获取指定几个用户的输入
Input::except([]) //获取指定几个用户的输入以外的所有参数
Input::has('name') //判断某个输入的参数是否存在

//上述方法即可获取get也可获取post的信息，laravel7以上淘汰
//2.使用request类
use Illuminate\Http\Request;
public function insert(Request $res){
        $username=$res->input('username','123');//默认123
        dd($username);
    }
```

使用Input类前需先use引用，可以使用别名，配置在config文件夹下app.php。

### 7.DB类操作数据库

按照MVC架构，对数据操作应放在Model中完成，但如果不使用Model，我们也可以用laravel框架提供的DB类操作数据库。对于某些极其复杂sql，用Model已经很难完成，需要开发者自己手写sql语句，使用DB类去执行原生sql。laravel中DB类的基本用法DB::table('tableName')获取tableName表的实例

#### 7.1.配置文件

.env文件中配置数据库相关信息

```php
DB_CONNECTION=mysql //数据库类型
DB_HOST=127.0.0.1   //localhost
DB_PORT=3306		//段鸥
DB_DATABASE=homestead//数据库名
DB_USERNAME=homestead//账号
DB_PASSWORD=secret	//密码
```

也可以在config目录下database.php文件里面配置，使用env函数，表示先从env获取，获取失败使用env函数第二个参数。**strict，严格模式选项，建议修改为false**

#### 7.2.使用

1. 控制器中引入DB门面：`user DB`

2. 定义增删改查需要的路由，例如：

   ```php
   Route::get('/test/add','TestController@add');
   Route::get('/test/del','TestController@del');
   Route::get('/test/update','TestController@update');
   Route::get('/test/select','TestController@select');
   ```

   使用group优化路由

   ```php
   Route::group(['prefix'=>'test'],function(){
       Route::get('add','TestController@add');
   	Route::get('del','TestController@del');
       Route::get('update','TestController@update');
       Route::get('select','TestController@select');
   });
   ```

3. ##### 增加信息(insert)

   对数据库增加数据主要有2个函数insert()和insertGetId()

   insert()可以同时添加一条或多条，返回值布尔

   insertGetId()只能添加一条，返回自增的id

   举例：

   ```php
   public function add(){
       //指定数据表
       $db=DB::table('TableName');
       //增加多条数据,增加一个一维，多个二维
       $rs=$db->insert([
           [
               'name' => '张三',
               'age => ‘23'
           ],[
               'name' => '李四',
               'age => ‘23'
           ],[
               'name' => '王五',
               'age => ‘23'
           ]
       ]);
       //insertGetId
       $db -> insertGetId([
            'name' => '张三',
            'age => ‘23'
       ]);
       var_dump($rs)
   }
   ```

   ps:链式/连贯操作:`DB::table('TableName')->insert()`

4. ##### 修改信息(update)

   Update表示可以修改整个记录中的全部字段

   Increment和decrement表示修改数字字段的数字(递增或递减),应用：记录登陆次数、积分增加

   举例：

   ```php
   public function update(){
   	$db = DB::table('TableName');
       //id=1的name改成'赵六'
       $rs=$db->where('id','=','1')->update([
           'name' => '赵六'
       ]);
       dd($rs)//更好的输出函数dd，返回受影响行数
           //======================
       DB::table('tableName')->increment('votes');//每次+1
       DB::table('tableName')->increment('votes',5);//+5
       DB::table('tableName')->decrement('votes');//-1
       DB::table('tableName')->decrement('votes',5);//-5
   }
   ```

5. ##### 查询数据

   1. 取出基本数据

      ```php
      //获取member表中所有数据
      $db=DB::table('member')
      $date=$db->get();//返回集合对象
      //遍历数据
      foreach($data as $key => $value){
          echo "value:{$value->id}";
      }
      //查id大于3
      $date=$db->where('id','>','3')->get();
      //并且
      ->where()->where()->where()
      //或者
      ->where()->orWhere()->orWhere()
      ```

   2. 取出单行数据

      ```php
      DB::table('member')->where('id','3')->first();//返回一个对象
      ```

   3. 取出具体某个值(一个字段)

      ```php
      //取出id为3的记录的name值
      DB::table('member')->where('id','3')->value('name');
      ```

   4. 获取某些字段数据(多个字段)

      ```php
      DB::table('member')->select('name as username','email')->get();
      ```

   5. 排序

      ```php
      DB::table('member')->orderBy('id','desc')->get();
      ```

   6. 分页（限制输出记录数）

      ```php
      DB::table('member')->limit(3)->offset(2)->get();
      //Limit：限制输出条数
      //Offset:从什么地方开始
      ```

6. ##### 删除数据(delete)

   删除两种方式：物理删除（本质是删除）**逻辑删除（本质是修改）**

   delete函数：删除记录

   Truncate：清空数据表

   ```php
   DB::table('member')->where('id','3')->delete();//返回影响行数
   ```

7. 执行任意sql语句

   1. 执行任意insert update delete

      ```php
      DB::statement("insert into member values(null,"")");
      ```

   2. 执行任意select语句

      ```php
      $res=DB::select("select * from member");
      ```

### 8.视图操作resources/views

其实就是-html页面把控制器中分配的数据进行处理和展示

#### 8.1.视图文件命名与渲染

1. 文件名习惯小写（建议小写）
2. 文件名后缀blade.php（因为laravel里面有一套模板引擎就是使用blade，可以直接使用标签语法{{$title}}）,也可以使用原生php语法显示数据）
3. 也可以不使用blade，这样话就没有模板引擎了，两个视图文件同时存在以模板引擎后缀优先显示
4. 展示视图：控制器中调用return view('viewname');
5. 视图支持分目录管理。控制器中可以使用/或.进行目录分隔

#### 8.2.变量分配与展示（数据交互

语法：

```php
view(viewname,数组)
view(viewname)->with(数组)
view(viewname)->with(名称，值)->with(名称,值)
//举例 控制器中传参$date,$day
return view('testview',['date'=>$date,'day'=>$day]);
    //调用 视图中展示
	{{$date}}
```

模板输出：{{$变量名}}

#### 8.3.补充：compact函数传递参数

Compact函数是php内置函数 ，跟laravel框架没关系,用于打包数组

语法:compact('变量名1','变量名2',......)

```php
//优化上面案例
return view('testview',compact('date','day'));
```

#### 8.4.在视图中使用函数

在视图模板中我们可以使用函数去处理变量

语法：`{{函数名(参数1,参数2)}}`

说明：函数名可以是php内置的，也可以是laravel框架中定义的

案例：在数据库中存储时间都是以时间戳存储，但在页面上展示不适合使用时间戳。需要对其进行格式化处理。

```php
//控制器传递时间戳
$time=strtotime('+1 year');
return view('test',compact('time'));
//test模板
{{date('Y-m-d H:i:s',$time)}}
```

#### 8.5.循环与分支语法标签

视图中遍历数据

```php
//php循环
foreach($variable as $key => $value){
    //循环体
}
//laravel视图中
@foreach($variable as $key => $value)
    //循环体
@endforeach

@if(条件)
    语句1
@elseif(条件)
    语句2
@else
    语句3
@endif
    
//举例
//控制器
$data=DB::table('testTable')->get();
return view('test',compact('data'));
//test模板
@foreach($date as $val)
	id:{{$val->id}}，name:{{$val->name}}
@endforeach
```

#### 8.6.模板继承/包含

用于制作公共部分页面

语法：@yield('名字') 在父级页面中的占位

父级页面parent

```html
<h1>头部</h1>
@yield('mainbody')
<h1>尾部</h1>
```

子级界面

语法：@extends(‘父级文件名')	 相对路径根view

​			通过section标签绑定区块/部件到父级页面，区块名称就是父级页面yield标签参数名

​			@section(区块名称)

​			代码

​			@endsection

```html
@extends(‘parent')
@section('mainbody')
<div>
    正文内容
</div>
@endsection
```

模板包含：@include('模板文件名')

继承模板留空：

```php
<!DOCTYPE html>
<html>
<head>
    <title>@yield('title')</title>
</head>
<body>
@yield('content')
</body>
</html>
```

填空：

```php
@extends('wap.base')

@section('title')
    aa
@endsection

@section('content')
    <h1>我是aa</h1>
@endsection
```



#### 8.7.外部静态文件引入

原先

```html
<link rel="stylesheet" type="text/css" href="/css/app.css">
源码中显示效果href="/css/app.css"
```

现在laravel中系统封装了asset方法

```html
<link rel="stylesheet" type="text/css" href="{{asset('css/app.css')}}">
源码中显示效果href="域名/css/app.css"
```

### 9.CSRF攻击

#### 9.1.什么是CSRF攻击

CSRF是跨站请求伪造(Cross-site request forgery)的英文缩写

Laravel框架中避免CSRF攻击很简单，Laravel自动为每个用户Session生成了一个CSRF Token，该Token可用于验证登陆用户和发起请求者是否是同一人，如果不是则请求失败。和验证码原理一致

Laravel提供了一个全局帮助函数csrf token来获取该Token值，因此只需在视图提交中添加如下HTML代码即可在请求中带上Token

php模板：``` <input type="hidden" name="_token" value="<?php echo csrf_token();>">```

blade模板：```<input type="hidden" name="_token" value="{{csrf_token()}}">```

### **简写：`{ {csrf_field()} }`**

**异步提交**时没有选择权，只能使用`csrf_token：$get(url,{csrf_token;});`

#### 9.2.CSRF验证排除例外路由

不是所有请求都需要避免CSRF攻击，比如第三方api获取数据请求

可以通过在VerifyCsrfToken（app/Http/Middleware/VerifyCsrfToken.php)中间件将要排除的请求URL添加到$except属性数组中

```php
protected $except=[
  //此处填写需要排除csrf验证的路由
    'home/test',
    'home/test2',
  //星号排除全部
	'*'
];
```

### 10.模型操作(AR模式)

Laravel自带的Eloquent ORM提供了一个美观、简单的与数据库打交道的ActiveRecord实现，**每张数据表都对应一个与该表进行交互的“Model模型”**，模型允许你在表中进行数据查询，以及插入、更新、删除等操作

> AR模型三核心(映射)：
>
> 每个数据表	与数据表进行交互的Model模型映射(实例化模型)
>
> 记录中的字段	与模型类的属性映射(给属性赋值)
>
> 表中的每个记录 	与一个完整的请求实例映射(具体的CURD操作)

#### 10.1.定义模型

1. 位置：app目录下，建议分目录管理

2. 命名规则：一般使用 表名(首字母大写).php

3. 创建模型：php artisan make:model Models/Member

4. **定义模型注意事项**：

   1. 定义$table属性，值为不要前缀的表名，如果不指定则使用类名的复数形式作为表名，不定义默认找members表。修饰词:protected
   2. 定义$primarKey属性，值为主键名称，如果需要使用AR模式find方法，则可能需要指定主键(Model::find(n))。修饰词:protected
   3. 定义$timestamps属性，值为false，如果不设置false，则默认会操作表中的created_at和updated_at字段，我们表中一般没有，所以设置false，表示不操作这两个字段。修饰词:public
   4. 定义$fillable属性，表示使用模型插入数据时，允许插入到数据库的字段信息。修饰词:protected
   5. 使用模型create插入数据，设置$fillable允许入库字段，使用$guarded是设置排除入库字段

   ```php
   <?php
   namespace App\Home;
   use Illuminate\Database\Eloquent\Model;
   class Member extends Model{
       //定义模型关联数据表，一个模型一个表
       protected $table-'member';
       //定义主键，可选
       protected $primaryKey='id';
       //定义禁止操作时间
    public $timestamps=false;
       //设置允许写入的数据字段
       protected $fillable=['id','name','age'];
   }
   ```

#### 10.2.模型控制器调用

引入Member模型类，use App\Home\Member

模型在控制器中使用方式有2种

1. 直接像使用DB门面一样的操作方式，以调用静态方法为主的形式，该形式模型下不需要实例化，例如：Member::get() 等价于DB::table('member')->get();
2. 实例化模型然后再使用模型类(普通)，例如：$model=new Member();$model->get();

#### 10.3.添加数据

1. AR模式：必须实例化模型

   $member=new Member(); //映射关系1，将表映射到模型

   $member->name=value; //映射关系2，将字段映射打属性，属性名和字段名一致

   $member->age=value;//映射关系3：将记录映射到实例

```php
public function add(){
   	//实例化模型 表类映射
    $model=new Member();
    //属性赋值 字段类属性映射
    $model->name='zhangsan';
    $model->age='15';
    //具体操作 记录映射实例
    $model->save();
}
```

不推荐，一个个字段添加

1. 推荐，可以使用数组

   建立简单表单，提交姓名年龄

   ```php
   public function test(Request $request){
   	$model=new Member();
       //添加
       $result=$model->create($request->all());
   }
   ```

   request语法

   $request->all() 返回数组

   $request->input('name')

   $request->only(['name1','name2])

   $request->except(['name1','name2])

   $request->has('name')

   $request->get('name')

#### 10.4.查询数据

获取指定主键一条数据

$info=Member::find(4); //获取主键为4的数据

```php
public function test2(Request $request){
	$info=Member::find(4);
    echo $info->name;//结果为对象
    //如果需要将对象结果集转数组
    ->get()->toArray();
    //如下
    $info=Member::find(4)->toArray();
}
```

获取符合指定条件的第一条记录

```php
public function test3(Request $request){
    $rest=Member::where('id','>','4')->toArray();
}
```

查询多行并指定字段

Member::all()		Member::all(字段1，字段2);

Member::get() 	Member::get([字段1，字段2]);

按条件查询指定多个字段
Member::where('id','>','4')->get([列1,列2]);	数组选列

Member::where('id','>','4')->select(列1,列2)->get();  字符串选列

Member::where('id','>','4')->select([列1,列2])->get();  字符串选列

#### 10.4.修改数据

**注意：在laravel里面如果需要更新数据（ORM模型方式），需要先调用模型的find方法获取对应记录，返回一个模型对象，然后为该模型对象设置要更新的数据（对象的属性）。最后调用save方法即可。**

例如：

$user=User::find($id);

$user->title=$_POST['title'];

$user->content=$_POST['content'];

$user->save()

```php
public function test4(Request $request){
    $rest=$model->where('id',7)->update(['age'->‘10']);
}
```

#### 10.5.删除数据

**注意：在laravel里面如果要删除数据，如果需要使用AR模型删除数据必须先根据主键id查询对应记录，返回模型对象，然后调用模型对象的delete**

例如代码：

$user=User::find($id);

$uesr->delete();

### 11.自动验证

前端可通过JS验证表单数据有效性，但如果用户浏览器过低或直接禁用js，则前端验证可能失效，这样就不能保证数据有效性。所以后端也需要做相应的验证操作，这个操作在laravel中称为自动验证

#### 11.1.准备工作

可以使用有表单的视图，建好路由控制器方法跳转到视图

#### 11.2.验证方法

1. 基本语法

   使用控制器中的validate方法来完成，$this->validate($request,[验证规则];)如果验证失败，laravel会自动将用户重新定向回上一个位置，并将验证错误信息一次性存放到session中

扩展：如何得知请求类型。

语法：$request->method()   获取当前请求方法 返回GET或POST

```php
public function test13(){
    if($request->method()=="POST"){
     	
    }
    return view('test');
}
```

1. 基本规则

   required:不能为空

   max:255 最长255字符

   min:1 最少1字符

   email:验证邮箱是否合法

   confirmed:验证两个字段是否相同,如果验证的字段是password，则必须输入一个与之匹配的password_confirmation字段

   integer:验证字段必须是整型

   numeric:字段必须数值

   ip:必须是ip

   size:value 验证字段必须有和给定value相匹配的尺寸，字符串是字符数，数值是给定整型值，文件对应文件字节数,固定值

   string:必须是字符串

   unique:表名，字段，需要排除的ID

   alpha:必须字母

   **多个验证规则通过“|”字符进行隔开**

   语法：$this->validat(数据对象,[数组形式验证规则]);

   ```php
   public function test13(Request $request){
       if($request->method()=="POST"){
        	$this->validate($request,[
               'name'=>'required|min:2|max:20',
               'age'=>'required|integer|min:1|max:120',
               'email'=>'required|email'
           ]);
       }
       return view('test');
   }
   ```

#### 11.3.错误信息输出（放视图文件里头

```php
@if(count($errors)>0)
    <div class="alert alert-danger">
    	<ul>
    		@foreach($errors->all() as $error)
    			<li>{{$error}}</li>
    		@endforeach
    	</ul>
    </div>
@endif
```

#### 11.4.错误信息英转中

https://packagist.org 下载 laravel-lang

在项目根目录cmd输入说明里的安装指令:composer require caouecs/laravel-lang:~3.0

语言包文件再vendor/caous/laravel-lang中，将你需要的语言目录复制到resources/lang即可，一般找zh-cn

然后再config/app.php中修改locale的值，改成你复制过来的语言包的文件夹名字

翻译不准可以去zh-cn文件夹下修改语言包文件代码

### 12.分页

表：news

建好模型

```php
class News extends Model
{
    protected $table="news";
    protected $primaryKey='id';
    public $timestamps=false;
    protected $fillable=['id','title','content','image','auther','class','time'];
}
```

控制器

```php
use App\News;

public function homenews(){
    $homenews=News::where('class','3')->orderBy('time','desc')->paginate(10);
    return view('homenews',["homenews"=>$homenews]);
}
```

视图

```php
<div class="row justify-content-center mt-4">
    <div class="col-md-4 pl-5">
		{{$hotdate->links()}}
	</div>
</div>
```

