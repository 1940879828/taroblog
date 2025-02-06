---
title: 发起区块链第一笔交易
date: 2024-08-30 15:29:44
tags: 'Web3'
categories: 'Web3'
cover: http://qny.bioart.icu/blog/202408301554955.png
---

### 创建钱包

1. 下载MetaMask：[Download MetaMask](https://metamask.io/download/)

2. 安装MetaMask浏览器插件

3. 然后根据提示创建一个新的钱包

4. 可以复制账户地址到区块浏览器查看账户细节：https://etherscan.io/

   1. 同一个助记词下可以有多个账户
   2. 账号地址是我们公开的身份
   3. 每个账号地址有私钥，不能分享和暴露私钥，私钥可以进入私钥对应的账户

5. 使用测试网络进行操作

   ![image-20240830155442895](http://qny.bioart.icu/blog/202408301554955.png)

### 获取测试币

1. 通过测试网水龙头获取测试币：[Testnet Faucets](https://faucets.chain.link/)

![image-20240830160158307](http://qny.bioart.icu/blog/202408301601337.png)

2. 设置跟钱包一样的测试网络然后点击Connect wallet链接钱包

3. 然后选择你的测试钱包并确定
4. 然后在下方选择一个测试网络Ethereum Sepolia描述drips 0.1 ETH的水龙头，通过验证后获取tokens
5. 然后就可以在MetaMask查看到你有0.1 SepoliaETH

### 查看具体的交易详情

1. 在MetaMask点击这次交易

   ![image-20240830162413717](http://qny.bioart.icu/blog/202408301624775.png)

2. 点击【收款】

3. 点击状态的【在区块浏览器上查看】

4. 可以看到这次交易的详情

   ![image-20240830162550503](http://qny.bioart.icu/blog/202408301625623.png)

   #### 关于Gas Price和Transaction Fee的概念

   不同的节点运行区块链，是因为他们可以通过区块链上的交易获得收入，当你创建一个交易，就会有一个节点，或者说叫矿工和验证者，他们会被支付一小部分以太坊或者去他区块链的原生代币，显然这些收入会激励人们运行节点。
   
   
   
   他们的收入是由gas使用量来决定的，gas是一个计算量的单位，要使用更多的计算资源，就需要支付更多的gas
   
   
   
   在详细交易中可以看到 Gas Limit & Usage by Txn，也就是gas上限和使用量，上限为60,000 实际上使用了21,000。对于发送以太币这样简单的交易，gas比较便宜，对于像是铸造NFT，向某个Defi存取这种复杂交易就会用到更多计算，花更多gas
   
   

​		交易手续费 Transaction Fee = Usage by Txn * Gas Price

​		

​		所以在这个交易中，发送方除了0.1的SepoliaETH 还额外花费了 0.005427222491544 SepoliaETH
