<div align="center">
  <h1>🧪 AcidMind</h1>
  <p><strong>简体中文文档</strong> ·
    <a href="../../README.md">English</a> |
    <a href="README.ko.md">한국어</a> |
    <a href="README.ja.md">日本語</a> |
    <a href="README.pt-BR.md">Português</a> |
    <a href="README.es.md">Español</a>
  </p>
</div>

# AcidMind

面向 AI 编程代理的 8 个专业批评技能。一个路由器。零套话评审。

没有透镜的 AI 代理评审代码时，总是输出同样温和的一段话：夸奖、几个吹毛求疵、含糊收尾。AcidMind 用真正回答你所问问题的专家取而代之。架构疑虑得到架构评审；功能按真实用户、包括空状态来检验；上线前的应用会像攻击者那样被攻击，然后连同加固方案一起交还给你。

每次评审都以一行机械化判定结束：

> **Gate: SHIP | FIX FIRST | DO NOT SHIP**

技能按需加载。代码评审只消耗五个文件的上下文。

## 技能家族

| 技能 | 人格 | 回答的问题 | 命令 |
|---|---|---|---|
| `ruthless-critic` | 🧪 酸性测试（ROAST / AUTOPSY / HONEST 三种语域） | 这个产物具体在哪里崩坏？ | `/grill-me`, `/autopsy`, `/tellingtruth`, `/honest` |
| `design-critic` | 🧠 架构师 | 这个结构能挺过接下来三次需求变更吗？ | `/designcritic` |
| `feature-critic` | 🔪 解剖者 | 这个功能在所有状态下对真实用户都可用吗？ | `/featurecritic` |
| `badass-critic` | 💻 性能工程师 | 在多大负载下、以什么方式测得崩溃？ | `/badass` |
| `security-critic` | 😠🥷 事故指挥官 + 受雇攻击者（Protocol A 灾难推演 / Protocol B 红队） | 什么可能致命出错？谁会怎样入侵？ | `/heartattack`, `/blackhat`, `/pentest` |
| `autocritic-skill` | 🎭 审计员 | 这个 SKILL.md 能正确触发并产出有用结果吗？ | `/auditskill` |
| `unified-critic` | 🧩 陪审团主持人 | 所有透镜同时审查并合并为一份报告会怎样？ | `/acidmind` |
| `secondthought-critic` | 🤔 执行前的刹车 | **每个会话自动加载：** 当你陈述观点或计划时，它会在代理执行之前进行批评 | 自动, `/wait` |

三个家族共性：默认只读 · 范围互不重叠 · 目的门槛（禁止的从来不是技术，而是没有目的的技术）。

## 快速开始

```bash
npx github:ragajatsuma-cmd/acidmind init                    # core（5 个）
npx github:ragajatsuma-cmd/acidmind init --edition security # + security-critic（6 个）
npx github:ragajatsuma-cmd/acidmind init --all              # full（8 个）
```

Claude Code 插件：

```bash
/plugin marketplace add https://github.com/ragajatsuma-cmd/acidmind
/plugin install acidmind@acidmind
```

更新：

```bash
npx github:ragajatsuma-cmd/acidmind status   # 已安装版本 vs 最新版本
npx github:ragajatsuma-cmd/acidmind update   # 自动更新
```

## 负责任的使用

`security-critic` Protocol B 只针对你拥有或获得书面许可的目标扮演攻击者，其余一律拒绝。它不生成可直接运行的漏洞利用载荷，仅通过已安装的 Strix/Wallbreaker 代理委派动态测试。其余 7 个技能在未获明确实施请求时都是纯只读诊断工具。

## 许可证

MIT, 参见 [LICENSE](../../LICENSE)。
