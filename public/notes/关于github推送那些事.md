---
title: 配置SSH连接github，以及解决连接不上的问题
date: 2025-02-08 11:55:05
tags: ['Git']
categories: ['前端','工具','Git']
description: "记录连接github的坎坷，各种问题连不上等"
---

# 前言

我用的是Windows系统。

# 注册GitHub账号

## 进入GitHub

最好有[vpn](https://xfltd.org/#/register?code=6LuN3EAQ)，没有的话可以查看这个项目[GitHub 520](https://gitee.com/klmahuaw/GitHub520)。

GitHub520项目通过修改本地 hosts 文件，试图解决： GitHub 访问速度慢的问题 GitHub 项目中的图片显示不出的问题
- 我觉得安装很麻烦，所以我是手动将项目中的hosts复制出来再拖入文件夹`C:\Windows\System32\drivers\etc`

# 安装Git版本控制系统

[Git官网下载](https://git-scm.com/downloads)

git安装成功后在终端输入`git version`会出现版本号，类似`git version 2.45.2.windows.1`
- 呼出终端: <kbd>windows</kbd> + <kbd>R</kbd> 输入`cmd`后 <kbd>回车↩︎</kbd>

# 配置Github的SSH密钥

没有配置密钥每次推送都需要输入用户名和密码，很不方便。

1. 检查本机是否存在ssh key

```bash
cd ~/.ssh
ls
```

这一步是查看目录下是否存在id_rsa 和 id_rsa.pub文件，有就不用生成了

2. 生成ssh key

```bash
ssh-keygen -t rsa -C "xxx@xxx.com"
```

这里的邮箱用注册GitHub时候填的邮箱

3. 获取ssh key公钥内容(id_rsa.pub)

```
cd ~/.ssh
cat id_rsa.pub
```

会显示`ssh-rsa`开头的好几行字符，这就是ssh key的公钥了

4. Github账号添加公钥

头像 - Settings - SSH and GPG keys - New SSH key

名字自己起，然后把第三步获取的公钥填进去。

5. 测试连接是否畅通

```bash
ssh -T git@github.com
```

如果显示：

```bash
Hi xxx! You've successfully authenticated, but GitHub does not provide shell access.
```

恭喜你，现在可以通过 **ssh的url** 来克隆和推送项目了！

- 记得不要再用http url的方式了
- 当然，换了电脑的话，还要再来一次上述流程

不知道你成功没有，但是我没有

# 修改ssh服务端口为443

默认ssh推送会用到22端口，而这个端口容易被防火墙什么的挡住，导致连接超时

## 修改 config 文件

打开config文件所在目录

```bash
cd ~/.ssh
explorer .
```

修改目录里config文件为：

```yaml
Host github.com
User xxx@qq.com
HostName ssh.github.com
Port 443
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
```

这样子再验证一下

```bash
ssh -T git@github.com
```

不知道你成功没有，但是我没有

# 设置DNS服务器

发现是我的DNS服务器设置有问题，把首选改成阿里云DNS服务器: 223.5.5.5 备选改为谷歌DNS服务器: 8.8.8.8。可以成功推送了。

# 其他的一些失败尝试：

## vpn(Clash)使用TUN模式

有些网络可能会对特定的IP地址或服务进行限制或屏蔽。使用TUN模式的VPN可以改变你的IP地址，使得你的流量看起来像是来自另一个地方，从而有可能绕过这些限制。

通俗的说，如果你连接到香港的VPN节点但不开启TUN模式，某些情况下，网络仍然可以检测到你实际上不是来自香港的流量。

开启TUN模式可以确保所有流量都通过VPN隧道传输，从而更好地隐藏你的真实信息，让你看起来像是来自香港的流量。

没有vpn的话我这里有: [vpn](https://xfltd.org/#/register?code=6LuN3EAQ)

> 没有用

## 使用网线而不是wifi，关闭ipv6协议

虽然不知道其中具体原因，但是我将wifi的ipv6协议关闭后，可以成功ssh推送了，而使用网线代替wifi并关闭ipv6协议后，更加稳定了。

> 没有用

### 怎么关闭网络连接的ipv6协议

打开windows菜单 - 搜索"控制面板" - 网络和 Internet - 右边"网络和共享中心" - 左边"更改适配器设置" - 右键你要修改的网络连接(连接上的是没有❌的) - 属性 - 中间窗口找到"Internet 协议版本 6 (TCP/IPv6)" **去掉**前面的✅ 

> 还是不行

## 开启vpn(Clash)的IPv6开关

开启Clash的 主页 - IPv6 开关。

> 没有用~~ 
