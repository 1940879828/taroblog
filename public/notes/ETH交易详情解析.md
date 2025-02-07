---
title:  ETH交易详情解析
date: 2024-09-02 09:10:52
tags: ['Web3']
categories: ['Web3']
---

- Transaction Hash: 一个独一无二的交易哈希，代表该区块链上的该笔交易

- Status: 交易的状态 Success 或者 Fail
- Block: 被确认的区块高度（区块链的一种“长度”或“深度”）
  - 16896 Block Confirmations: 意味着在交易所在的那个区块之后，已经有16个新的区块被添加到区块链中。确认次数越多，交易被篡改或回滚的可能性就越低。
- Timestamp: 交易发生的时间
- From: 发送方
- To: 接收方 
- Value: 发送了多少ETH
- Transaction Fee: 本次交易所花费的手续费 （Base fee per gas + Max Priority fee per gas）* gas
- Gas Price: Gas的费用
- Gas Limit & Usage by Txn: 限制使用多少Gas（愿意为这次交易付出的最大Gas） 和 实际使用了的Gas
- Gas Fees
  - Base：网络为每个区块动态调整的最低费用，用于确保交易在区块链上的处理。它由网络自动设定，随着网络拥堵程度的变化而变化。Base Fee 会被销毁（Burnt），而不是支付给矿工。这是 EIP-1559 的一个关键特性，旨在减少以太坊的供应量。
  - Max：用户愿意为交易支付的每单位 Gas 的最高费用上限。它包括 Base Fee 和矿工小费（Priority Fee）。用户设置的 Max Fee 确保即使网络拥堵导致 Base Fee 上升，交易仍然可以被处理。
  - Max Priority：用户额外愿意支付给矿工的小费，以激励矿工优先处理他们的交易。这部分费用会直接支付给矿工，而不是销毁。在这个例子中，Max Priority Fee 与 Max Fee 相同，都是 258.439166264 Gwei，这意味着用户愿意为快速处理交易付出较高的费用。
- Burnt & Txn Savings Fees
  - Burnt：被烧掉的ETH
  - Txn Savings Fees：用户设定的最大费用（Max Fee）与实际支付的费用之间的差额。这个差额代表了用户节省下来的部分费用
- Other Attributes
  - Txn Type: **Txn Type** 表示交易的类型。`2` 代表的是 EIP-1559 交易。在以太坊网络中，EIP-1559 引入了新的交易类型（Type 2），这种交易类型包括 Base Fee 和 Max Fee 的机制，与之前的非 EIP-1559 交易（Type 0）不同。Type 2 交易可以动态调整费用，避免用户过度支付交易费用。
  - Nonce: **Nonce** 是一个唯一的编号，用于标识一个账户在以太坊网络中发送的每一笔交易。每当一个账户发起一笔新的交易时，Nonce 值会增加 1。这个值对于防止“双重支付”至关重要，因为它确保每个交易在区块链中都是唯一的，不会被重复处理。在这个例子中，Nonce 值为 `1230500`，这意味着这是该账户发起的第 1,230,501 笔交易。
  - Position In Block: **Position In Block** 表示该交易在区块中的位置，通常是指该交易在被打包进区块时的排序位置。值为 `0` 表示这笔交易是该区块中被处理的第一笔交易。在一个区块中，交易的位置可能会影响到它的执行顺序，进而可能影响交易的结果，尤其是在多个交易试图修改同一状态时。
- Input Data: 因为这个交易是发送以太币，所以输入数据是空的。当我们使用智能合约时就不是空的了

> "Txn" 是 "Transaction" 的缩写。
