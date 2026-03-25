---
title: 人工智能简介
tags: ['AI']
date: 2026-03-25 15:58:29
categories: ['AI']
---

有些历史在发生时，并没有多少戏剧性的声音。

1943 年，[Warren McCulloch](https://en.wikipedia.org/wiki/Warren_Sturgis_McCulloch) 和 [Walter Pitts](https://en.wikipedia.org/wiki/Walter_Pitts) 用数学方式描述了[人工神经元](https://en.wikipedia.org/wiki/Artificial_neuron)。那时没有人知道，几十年后，这条线会延伸成深度学习、基础模型、GPU 集群，以及今天仍在持续扩张的智能系统。很多重大变化，起初都只是论文、实验、一次不算起眼的性能提升。人们照常工作、记录、训练、失败、重来。直到很多年后回头看，才发现自己曾站在拐点之中。

人工智能，英文是 Artificial Intelligence，通常简称 AI。若要用更准确一点的话去描述，它指的是让机器在感知、表示、学习、推理、决策与生成这些环节上，承担一部分过去主要依赖人类智能完成的任务。它并不是某一种单独技术，而是一整套方法体系：从早期符号主义，到统计学习，再到深度学习、基础模型与多模态系统，背后始终是数学、算法、数据和算力在共同推进。

今天人们谈论 AI，谈的早已不只是实验室里的模型，也是在谈推荐系统、搜索排序、语音助手、自动驾驶、医学影像分析，以及正在改变写作、编程、设计和内容生产方式的生成式系统。它离现实并不遥远。很多时候，它甚至没有一个足够醒目的登场时刻，只是在一代代芯片更新、一次次训练收敛、一个个 API 开放、一个个产品上线之后，慢慢进入日常生活。等更多人意识到它已经到来时，它其实已经走了很长一段路。

下面这条时间轴，试着把 AI 发展的关键节点放回它们原来的时间里。

> 注：文中数据主要综合自经典论文、公开竞赛结果与厂商公开披露，重点不是制造神话，而是尽量还原每个阶段真实发生过的跃迁。

## AI 发展时间轴

### 1943：人工神经元被写成数学模型

[McCulloch](https://en.wikipedia.org/wiki/Warren_Sturgis_McCulloch) 与 [Pitts](https://en.wikipedia.org/wiki/Walter_Pitts) 提出了 [McCulloch-Pitts 神经元模型](https://en.wikipedia.org/wiki/Artificial_neuron#McCulloch%E2%80%93Pitts_model)。那是一次安静的理论工作，却第一次让人看到，神经活动也许可以被写进公式，智能也许可以被带入计算。

- 关键意义：AI 开始拥有可计算的理论原型。
- 时代注脚：这时的 AI 还没有名字，但种子已经埋下。

### 1950：图灵测试提出

[Alan Turing](https://en.wikipedia.org/wiki/Alan_Turing) 在《[Computing Machinery and Intelligence](https://en.wikipedia.org/wiki/Computing_Machinery_and_Intelligence)》中提出那个后来被无数次重提的问题：机器能思考吗？问题本身并没有立刻给出答案，但它改变了此后几十年的讨论方式。

- 关键意义：AI 从工程问题上升为可验证的认知问题。
- 时代注脚：人类第一次认真讨论，智能是否可以被机器模拟。

### 1956：达特茅斯会议，AI 正式得名

[John McCarthy](https://en.wikipedia.org/wiki/John_McCarthy_(computer_scientist)) 等人在 [达特茅斯夏季研究项目](https://en.wikipedia.org/wiki/Dartmouth_workshop) 中正式提出 “Artificial Intelligence”。从这一刻起，这条原本分散的研究线索，第一次有了共同的名字。

- 关键意义：AI 从零散研究，变成一门有共同目标的学科。
- 时代注脚：名字出现的那一刻，历史开始被书写。

### 1957：感知机诞生

[Frank Rosenblatt](https://en.wikipedia.org/wiki/Frank_Rosenblatt) 提出 [Perceptron](https://en.wikipedia.org/wiki/Perceptron)。它本质上是最早一批可训练线性分类器之一，结构并不复杂，却让人们第一次较为具体地看见了另一种可能：机器不仅可以计算，也可能通过样本去学习决策边界。

- 关键意义：学习型模型进入公众与科研视野。
- 时代注脚：第一次乐观浪潮开始酝酿。

### 1960s：早期繁荣，也埋下第一次寒冬的伏笔

这是一个充满乐观气氛的阶段。符号主义、机器翻译和早期学习方法不断推进，许多人相信，真正通用的智能也许并不遥远。但当时的算力、数据和模型能力，还不足以支撑这样的期待。

- 关键节点：1969 年，[Marvin Minsky](https://en.wikipedia.org/wiki/Marvin_Minsky) 与 [Seymour Papert](https://en.wikipedia.org/wiki/Seymour_Papert) 在《[Perceptrons](https://en.wikipedia.org/wiki/Perceptrons_(book))》中对单层感知机局限性的批评，直接打击了神经网络路线。
- 时代注脚：技术史里最常见的事情，不是突破，而是过早的期待。

### 1974-1980：第一次 AI 寒冬

热情开始退去，研究经费收缩，公众预期回落。很多问题并不是方向错误，而是那个时代还拿不出足够的算力、数据和工程条件，去兑现先前说过的话。

- 关键意义：AI 第一次集体面对“理论可行，现实做不到”。
- 时代注脚：历史并不总是线性上升，它常常先沉下去。

### 1986：反向传播重新点燃神经网络

[David Rumelhart](https://en.wikipedia.org/wiki/David_Rumelhart)、[Geoffrey Hinton](https://en.wikipedia.org/wiki/Geoffrey_Hinton)、[Ronald J. Williams](https://en.wikipedia.org/wiki/Ronald_J._Williams) 推动[反向传播](https://en.wikipedia.org/wiki/Backpropagation)成为多层网络训练的核心方法。它真正解决的是“误差如何穿过隐藏层传播并更新参数”这个关键问题。沉寂多年的神经网络路线，因此重新出现了继续向前走的可能。

- 关键意义：深层模型第一次真正拥有可操作的训练路径。
- 时代注脚：很多后来改变世界的方法，最开始只是少数研究者坚持下来的结果。

### 1997：Deep Blue 击败卡斯帕罗夫

[IBM Deep Blue](https://en.wikipedia.org/wiki/Deep_Blue_(chess_computer)) 战胜国际象棋世界冠军 [Garry Kasparov](https://en.wikipedia.org/wiki/Garry_Kasparov)。它并不是今天意义上的大模型，却是 AI 第一次以如此直接的方式，进入大众的历史记忆。

- 硬数据：Deep Blue 当时每秒可评估约 `2 亿` 个棋局位置。
- 关键意义：AI 首次在高象征意义的智力竞技中击败顶尖人类选手。
- 时代注脚：机器开始不再只是“会算”，而是“会赢”。

### 1998-2011：数据时代前夜

互联网持续扩张，数据规模迅速累积；GPU 逐步进入通用计算场景；统计学习、[支持向量机](https://en.wikipedia.org/wiki/Support_vector_machine)、概率模型长期占据主流。许多决定后来走向的条件，都在这段时间里一点点就位：更大的公开数据集、更成熟的并行计算、更工程化的训练流程。

- 硬数据：[ImageNet](https://en.wikipedia.org/wiki/ImageNet) 建成后，收录了超过 `1500 万` 张标注图像、覆盖 `22000+` 类别。
- 关键意义：AI 终于等到“足够大的数据集”。
- 时代注脚：很多革命，不是某一天突然出现，而是基础设施先悄悄成熟。

### 2012：AlexNet 引爆深度学习时代

[AlexNet](https://en.wikipedia.org/wiki/AlexNet) 在 [ImageNet Large Scale Visual Recognition Challenge](https://en.wikipedia.org/wiki/ImageNet#ImageNet_Challenge) 竞赛中把深度卷积网络真正推到舞台中央。它的意义不只在于更深的卷积网络本身，还在于 [ReLU](https://en.wikipedia.org/wiki/Rectifier_(neural_networks))、[dropout](https://en.wikipedia.org/wiki/Dilution_(neural_networks))、数据增强与 GPU 并行训练被同时组织成一条可复制的工程路径。那不是一次普通的领先，而是一种几乎让整个研究方向重新排序的领先。

- 硬数据：模型在 ILSVRC 2012 中取得 `15.3%` 的 top-5 error，而第二名是 `26.2%`。
- 硬数据：训练数据约 `120 万` 张图片，模型参数约 `6000 万`，训练使用 `2` 块 GTX 580 3GB GPU，耗时约 `5-6 天`。
- 关键意义：这不是小幅改进，而是一个时代分界线。
- 时代注脚：从这之后，越来越多人意识到，神经网络并没有死，它只是等到了合适的硬件。

### 2017：Transformer 出现，基础模型的骨架被搭好

《[Attention Is All You Need](https://arxiv.org/abs/1706.03762)》提出 [Transformer](https://en.wikipedia.org/wiki/Transformer_(deep_learning_architecture))。模型开始摆脱对循环结构的依赖，转向以 [self-attention](https://en.wikipedia.org/wiki/Attention_(machine_learning)) 为核心的并行计算框架。这不仅改善了长距离依赖建模，也显著提高了大规模训练时的扩展性。后来席卷世界的许多系统，最早的骨架都可以追溯到这里。

- 硬数据：论文中的单模型约 `1.65 亿` 参数，在英德翻译任务上达到 `27.5 BLEU`，超过当时最佳集成结果 `1+ BLEU`。
- 关键意义：这是今天大语言模型与多模态模型最核心的结构起点之一。
- 时代注脚：后来席卷世界的很多系统，骨架都来自这一年。

### 2020：GPT-3 让“规模”成为新的决定性变量

[OpenAI](https://en.wikipedia.org/wiki/OpenAI) 发布 [GPT-3](https://arxiv.org/abs/2005.14165)。行业开始更清楚地意识到，当参数、数据和算力被同时推高时，模型呈现出来的并不只是性能提升，有时还会出现过去难以预料的新边界，比如更强的 [in-context learning](https://en.wikipedia.org/wiki/Prompt_engineering#In-context_learning) 和更明显的通用任务迁移能力。

- 硬数据：GPT-3 参数规模达到 `1750 亿`，是当时前代非稀疏语言模型的 `10 倍`。
- 关键意义：few-shot learning 开始真正进入主流讨论。
- 时代注脚：这一年之后，“把模型继续做大”不再只是工程冲动，而变成了路线判断。

### 2021：AI 从实验室能力走向应用接口

模型不再只停留在论文和演示里，而是开始变成开发者真正可以调用的能力。对于很多行业来说，这意味着 AI 第一次不再只是“看见”，而是可以被封装进 [API](https://en.wikipedia.org/wiki/API)、接入产品、写进工作流。

- 硬数据：OpenAI 在 2021 年披露，已有 `300+` 个应用接入 GPT-3，平台每天生成约 `45 亿` 个词，全球已有数万名开发者开始围绕这类模型构建产品。
- 关键意义：AI 开始从“研究成果”变成“开发平台”。
- 时代注脚：技术一旦进入工具链，扩散速度就会改写。

### 2022：ChatGPT 让生成式 AI 进入公众日常

如果说此前的 AI 更多属于行业内部，那么从 [ChatGPT](https://en.wikipedia.org/wiki/ChatGPT) 开始，普通用户第一次大规模体验到“直接与模型对话”。它不再只是一个结果展示，而开始变成一种新的交互方式。

- 关键意义：AI 的主战场从实验指标，转向真实交互。
- 时代注脚：人们不再只是看 AI 的演示，而是开始把它放进自己的工作流。

### 2023：大众采用速度远超传统互联网产品

这一年，AI 不再只是技术圈里的高频词，而成为企业、开发者和普通用户都无法回避的现实。它进入办公室、浏览器、搜索框、代码编辑器，也进入了越来越多人的日常表达。

- 硬数据：OpenAI 在 [DevDay](https://en.wikipedia.org/wiki/OpenAI_DevDay) 上披露，ChatGPT 周活跃用户达到 `1 亿`。
- 硬数据：同时有 `200 万+` 开发者在使用相关平台，`92%` 的[《财富》](https://fortune.com/) 500 强公司已在内部使用 OpenAI 工具。
- 关键意义：AI 正式进入基础生产力工具的竞争阶段。
- 时代注脚：技术扩散的速度，第一次快得像舆论本身。

### 2024：模型竞争进入基础设施级别

参数规模、推理成本、延迟、上下文长度、产品集成与算力供应，开始同时决定胜负。竞争的重心，逐渐从“谁先做出模型”转向“谁能长期稳定地提供能力”。

- 硬数据：OpenAI 公开信息显示，ChatGPT 周活跃用户增长到 `2 亿`。
- 关键意义：这不再只是模型公司之间的竞赛，而是芯片、云、应用和生态的系统战争。
- 时代注脚：从这一刻起，AI 的竞争单位不只是模型，而是完整产业链。

### 2025-至今：多模态与智能体继续推进，热点开始从“会不会”转向“能不能生产”

近一阶段的变化，已经不只是模型更大，而是模型更像真正可以被使用的工具。文本、图像、语音、视频、代码和工作流被逐步接在一起，行业讨论的重点也随之改变：从 benchmark 领先，转向真实生产环境中的可控性、稳定性、时延与成本。

像 [Seedance 2.0](https://seedanceai.tech/) 这样的新一代视频生成能力之所以会引发关注，不只是因为“它又能生成更好看的视频了”，而是因为评判标准正在悄悄改变：

- 人们开始关心时间一致性，而不只是一帧是否惊艳。
- 人们开始关心角色与场景的一致性、镜头语言的连续性、运动轨迹是否稳定、音画是否同步。
- 人们开始关心可控性、生成速度、成本与是否能够接入真实内容生产流程，而不是只把它当作一次性的演示。

它带来的影响，本质上说明了一件事：生成式 AI 的竞争，正在从“展示能力”走向“交付能力”。模型不再只是回答问题、生成图片，它开始尝试接手过去需要编导、剪辑、配乐、脚本和后期共同完成的一部分工作。换句话说，行业开始比较的，不再只是模型能不能生成，而是它能不能稳定地产出可用结果，能不能进入真实生产链条，能不能成为流程中的一环。哪怕现在还远未成熟，这个方向本身已经足够说明问题：AI 正在从单点智能，走向更完整的创作与生产链条。

## 今天回头看，我们正站在什么位置

如果把 1943 年看作第一颗火种，那么此后的八十多年，并不是一条平滑上升的曲线。它经历过寒冬、误判、停滞，也经历过算法突破、硬件跃迁、数据爆炸和产品化扩散。每一次真正的转折，都不是由一句口号完成的，而是由一组更大的数据集、一代更快的芯片、一次更稳定的训练、一个更低的调用门槛，慢慢堆出来的。

这大概也是 AI 最值得敬畏的地方。

它并不神秘，它往往只是持续、缓慢、扎实地前进。只是当这种前进累积到某个阈值之后，世界会突然看起来像是被改写了。

历史很少在发生时自带注释。大多数时候，人们只是照常工作，写代码，训练模型，记录参数，等待下一次实验结果。很多年后回头看，才知道自己当时正站在拐点上。
