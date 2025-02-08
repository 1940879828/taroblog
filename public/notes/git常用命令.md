---
title: git常用命令
date: 2020-06-25 16:00:29
tags: ['Git']
categories: ['前端','工具','Git']
---

1、cd 路径 进入当前目录

2、git init 本地进行初始化（建立暂存区）

- .git 文件存储当前项目所有版本信息

3、工作区=>暂存区

- git add 文件名
- git  add * 提交所有文件
- git commit -m "这一次提交的描述"

4、git status 查看当前工作区状态

5、从暂存区恢复文件到工作区

- git checkout 文件名

6、查看工作区和暂存区版本的区别

- git diff

7、clear 命令窗口清屏

8、git log 查看已经提交到暂存区的历史版本

9、恢复文件到指定版本

- git reset --hard 版本号

10、生成ssh密匙

- ssh-keygen -t rsa -C "你的github邮箱"

11、暂存区=>远程仓库

- git remote add origin 仓库链接
- git push -u origin master

14、git clone 从远程仓库克隆项目到本地

15、git pull 从远程仓库同步本地代码

16. 修改远程仓库地址: `git remote set-url origin <remote-url> `
17. 添加远程仓库地址: `git remote add origin <你的项目地址> `

### 设置账户名和密码

1. 添加账户名和密码：
   - `git config --global user.email [email]   //邮箱`
   - `git config --global user.name [username] //密码`
2. 查看配置信息是否添加成功：`git config --list `  输入`:q`退出

我尝试上面的方法过后发现不行，但可以使用下面的命令，效果类似于记住密码，输入一次后续上传就不需要再输入了：

`git config --global credential.helper store `

### 强行推送至远程仓库

```powershell
//1. 初始化 
git init
//2. 添加仓库
git remote add origin <你的项目地址> 
//3. 添加所有更改
git add .
//4. 提交所有更爱
git commit -m "备注"
//5. 查看仓库名字
git remote
//6. 强制推送
git push --force <仓库名字> master 
```

