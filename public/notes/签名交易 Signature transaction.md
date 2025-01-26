---
title: 签名交易 Signature transaction
date: 2024-08-31 16:47:43
tags: 'Web3'
categories: 'Web3'
cover: http://qny.bioart.icu/blog/202408311648782.png
---

本文讨论一下签名交易，私钥和其他密码学知识。

[Blockchain Demo (andersbrownworth.com)](https://andersbrownworth.com/blockchain/tokens)

![image-20240831164854709](http://qny.bioart.icu/blog/202408311648782.png)



什么如何确定图中区块1的交易信息中第一条，Darcy真的给Bingley发了25元呢？也就是怎么知道这个交易真的发生了呢？



我们需要了解私钥和公钥 & 他们是怎么验证的

示例网站

[Blockchain Demo: Public / Private Keys & Signing (andersbrownworth.com)](https://andersbrownworth.com/blockchain/public-private-keys/keys)

![image-20240902084656678](http://qny.bioart.icu/blog/202409020846712.png)

上图中，私钥会通过ECDSA算法，比特币和以太坊都使用这个算法，它是DSA（电子签名算法）的一种，它可以根据私钥创建出公钥，想了解DSA算法可以b站看技术蛋老师的ecc算法。



在交易中，我会像密码一样使用私钥，对交易进行电子签名，然后别人可以通过公钥来验证这个签名的交易。



让我们演示一下，接下来到[Blockchain Demo: Public / Private Keys & Signing (andersbrownworth.com)](https://andersbrownworth.com/blockchain/public-private-keys/signatures)页面，进行签名和验证的操作。

![image-20240902085151248](http://qny.bioart.icu/blog/202409020851288.png)

message是你想要对其签名的数据，输入数据后点击签名Sign按钮，跟哈希生成的逻辑类似，我们使用这个签名算法把message和Private Key组合并使用ECDSA算法生成Message Signature，这个签名算法的强大之处在于你可以使用私钥创建信息签名，但是别人不能从信息签名中得到你的私钥。



我们为什么要这样做，这在Verify页面可以得到答案。



![image-20240902085644134](http://qny.bioart.icu/blog/202409020856178.png)



当Message 被签名数据 和 Public Key 公钥 和 根据私钥和数据生成的Message Signature 一致的时候，验证会通过，当验证通过的时候，别人就知道这个东西是你发布的而不是其他什么人发布的



流程是 你用私钥(不能给别人看的) 加密数据 生成加密签名，别人通过加密签名、你公布的公钥和数据来验证这个内容是否是你发布的。所以这是一个身份认证机制，让别人知道这个交易是你发起的。这是密码学非对称加密的内容，想了解更多可以去b站搜视频。



一样的逻辑 我们把数据部分换成交易信息，[Blockchain Demo: Public / Private Keys & Signing (andersbrownworth.com)](https://andersbrownworth.com/blockchain/public-private-keys/transaction)

![image-20240902090349469](http://qny.bioart.icu/blog/202409020903504.png)

我们就能知道，这个交易是由谁发起的



在这个过程中私钥是非常私密的，一旦有人获得了你的私钥，他们就可以代替你对交易进行签名，发送交易

> 以太坊的地址是公钥衍生出来的



这个单向算法本身就是大家知道的，只不过私钥能签名公钥，但是公钥无法反推私钥，只能验证
