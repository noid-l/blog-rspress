---
title: 国内外主流大模型 API 与套餐价格对比（Claude、OpenAI、Google、Kimi、智谱、MiniMax、DeepSeek）
date: 2026-09-09
tags:
  - Claude
  - OpenAI
  - Gemini
  - Kimi
  - GLM
  - MiniMax
  - DeepSeek
  - API 定价
description: 汇总 Claude、OpenAI、Google、Kimi、智谱、MiniMax、DeepSeek 七家大模型的订阅套餐与 API 价格，并结合四个 AI 编程工具 30 天约 18.3 亿 token 的真实用量，估算订阅制与按量计费的成本差异。
category: AI 开发
---

本文汇总了国内外七家主流大模型厂商（Claude、OpenAI、Google、Kimi、智谱、MiniMax、DeepSeek）的订阅套餐与 API 价格，并结合个人四个 AI 编程工具 30 天约 18.3 亿 token 的真实用量，估算「订阅制 vs 按 API 计费」的成本差异，供选型参考。

> **数据说明**
>
> - 采集时间：2026-08-12，价格可能随时调整。Claude、OpenAI、Google 为美元（USD）价格，不含适用税费；Kimi、智谱、MiniMax、DeepSeek 为人民币（CNY）价格。
> - Claude、Google API 数据采集自官网定价页；OpenAI 官网（openai.com / chatgpt.com）有 Cloudflare 拦截，数据来自官网页面截图；Google 套餐、Kimi、智谱、MiniMax、DeepSeek 数据来自官网页面截图与官方文档。
> - API 价格单位统一为 **每 100 万 token（MTok）**。

## Claude（Anthropic）

来源：[claude.com/pricing](https://claude.com/pricing)

### 订阅套餐

| 套餐              | 月付                  | 年付折合           | 说明                                  |
| --------------- | ------------------- | -------------- | ----------------------------------- |
| Free            | $0                  | —              | 基础对话、有限用量                           |
| Pro             | $20/月               | $17/月（$200 预付） | 含 Claude Code、Cowork、Design、Science |
| Max 5x          | $100/月              | —              | 用量为 Pro 的 5 倍                        |
| Max 20x         | $200/月              | —              | 用量为 Pro 的 20 倍                       |
| Team 标准席位       | $25/席/月             | $20/席/月        | 2–150 人团队                           |
| Team Premium 席位 | $125/席/月            | $100/席/月       | 用量为标准席位的 5 倍                        |
| Enterprise      | $20/席 + 用量按 API 费率计 | —              | SSO、SCIM、审计日志等                      |

### API 价格（最新模型）

| 模型 | 输入 | 输出 | 缓存写入 | 缓存读取 |
| --- | --- | --- | --- | --- |
| Fable 5 | $10 | $50 | $12.50 | $1.00 |
| Opus 5 | $5 | $25 | $6.25 | $0.50 |
| Sonnet 5 | $2 | $10 | $2.50 | $0.20 |
| Haiku 4.5 | $1 | $5 | $1.25 | $0.10 |

旧模型：Opus 4.8 / 4.7 / 4.6 / 4.5 均为 $5 / $25；Sonnet 4.6 / 4.5 为 $3 / $15；Opus 4.1 为 $15 / $75。

其他规则：

- 批处理（Batch）5 折；缓存价格为 5 分钟 TTL。
- Opus 5 快速模式（fast mode）：2 倍标准价格，速度最高提升 2.5 倍。
- 美国本土推理（US-only inference）：输入输出按 1.1 倍计费。
- Web 搜索工具：$10 / 1000 次；代码执行：$0.05/小时/容器（每组织每天 50 小时免费）；Managed Agents：$0.08/会话小时。

## OpenAI（ChatGPT）

来源：[chatgpt.com/pricing](https://chatgpt.com/pricing)、[openai.com/api/pricing](https://openai.com/api/pricing/)（官网截图）

### 订阅套餐

| 套餐           | 价格     | 说明                                                                                  |
| ------------ | ------ | ----------------------------------------------------------------------------------- |
| 免费版          | $0/月   | 核心模型，有限的消息/文件上传/图片生成/记忆额度                                                           |
| ChatGPT Go   | $8/月   | 更多消息、上传、图片生成和记忆额度，扩展语音模式                                                            |
| ChatGPT Plus | $20/月  | 高级模型、Thinking 图像创建、Work 智能体、Codex 编程智能体、深度研究、自定义 GPT                                |
| ChatGPT Pro（5 倍额度）  | $100/月 | Plus 全部内容，相比 Plus 多 5 倍使用额度，Pro 前沿模型，Codex/工作智能体最高权限，抢先体验实验性功能（无限使用但受防滥用机制限制） |
| ChatGPT Pro（20 倍额度） | $200/月 | 同上，相比 Plus 多 20 倍使用额度 |

### API 价格（Frontier models）

| 模型            | Model ID                    | 输入    | 输出    | 定位         |
| ------------- | --------------------------- | ----- | ----- | ---------- |
| GPT-5.6 Sol   | `gpt-5.6-sol`（别名 `gpt-5.6`） | $5    | $30   | 旗舰，复杂专业工作  |
| GPT-5.6 Terra | `gpt-5.6-terra`             | $2    | $12   | 智能与成本平衡    |
| GPT-5.6 Luna  | `gpt-5.6-luna`              | $0.20 | $1.20 | 成本敏感、大批量场景 |

推理档位均支持 none / low / medium / high / xhigh / max。

## Google（Gemini）

来源：[ai.google.dev/gemini-api/docs/pricing](https://ai.google.dev/gemini-api/docs/pricing)、[one.google.com/about/google-ai-plans](https://one.google.com/about/google-ai-plans/)（官网截图）

### 订阅套餐（Google AI 方案）

| 套餐 | 价格 | 存储空间 | 说明 |
| --- | --- | --- | --- |
| Google AI Plus | $4.99/月 | 400 GB | 2 倍用量限额，Gemini 3 Flash 思考模型使用权 |
| Google AI Pro | $19.99/月 | 5 TB | 4 倍用量限额，Gemini 3 Pro 高级推理，Deep Research、视频生成 |
| Google AI Ultra（5 倍） | $99.99/月 | 20 TB | 5 倍于 Pro 的用量限额，Pro 模型更高权限，Deep Think |
| Google AI Ultra（20 倍） | $199.99/月 | 30 TB | 20 倍于 Pro 的用量限额，创新功能抢先体验 |

### API 价格（Standard 付费层级）

| 模型 | 输入 | 输出（含思考 token） | 备注 |
| --- | --- | --- | --- |
| Gemini 3.1 Pro Preview | $2（≤20 万 token）/ $4（>20 万） | $12 / $18 | 缓存 $0.20 / $0.40 |
| Gemini 3.6 Flash | $1.50 | $7.50 | 缓存 $0.15 |
| Gemini 3.5 Flash | $1.50 | $9.00 | 缓存 $0.15 |
| Gemini 3.5 Flash-Lite | $0.30 | $2.50 | 缓存 $0.03 |
| Gemini 3.1 Flash-Lite | $0.25（音频 $0.50） | $1.50 | — |
| Gemini 3 Flash Preview | $0.50（音频 $1.00） | $3.00 | 缓存 $0.05 |
| Gemini 2.5 Pro | $1.25（≤20 万）/ $2.50（>20 万） | $10 / $15 | 缓存 $0.125 / $0.25 |
| Gemini 2.5 Flash | $0.30（音频 $1.00） | $2.50 | — |
| Gemini 2.5 Flash-Lite | $0.10（音频 $0.30） | $0.40 | — |

其他规则：

- 多数模型提供免费层级（免费额度内输入输出免费，数据会被用于改进产品）。
- Batch 批量模式约为标准价 5 折；Priority 优先模式约为标准价 1.8 倍；另有 Flex 模式。
- 依托 Google 搜索接地：每月 5,000 次免费请求（Gemini 3.x 共享），超出后 $14/1000 次；Google 地图接地同价。
- 图像生成（Nano Banana 2 / Gemini 3.1 Flash Image）：输入 $0.50，图片输出 $60/百万 token，约合 $0.045–0.151/张（按分辨率）。

## Kimi（月之暗面）

来源：[kimi.com](https://www.kimi.com/) 会员页（官网截图）、[platform.kimi.com 文档](https://platform.kimi.com/docs/llms.txt)，人民币价格

### 订阅套餐（连续包月）

| 套餐 | 价格 | 定位 | Agent 额度 | 说明 |
| --- | --- | --- | --- | --- |
| Andante | ¥49/月 | 日常使用 | 更多 Agent 额度 | Office 文件处理、深度研究、网站部署、Kimi Code 可调用 |
| Moderato | ¥99/月 | 效率升级 | 2 倍 Agent 额度 | 同上 |
| Allegretto | ¥199/月 | 专业优选 | 4 倍 Agent 额度 | 增加 Agent 多任务并行 |
| Allegro | ¥699/月 | 全能尊享 | 10 倍 Agent 额度 | 同上，升级退差价 |

- 连续包年最高立省 ¥1,680；另有企业版。
- 所有档位均包含 Office 文件处理、深度研究、网站部署和 Kimi Code 调用权益。

> **备注：新会员体系即将上线**
>
> - 订阅中用户不受影响，如需继续使用合并权益，可在新会员体系上线前购买当前套餐。
> - 新会员体系 Kimi 权益将与 Kimi Code 权益拆分，按需购买更灵活。

### API 价格

| 模型 | Model ID | 输入（缓存命中） | 输入（缓存未命中） | 输出 | 上下文窗口 |
| --- | --- | --- | --- | --- | --- |
| Kimi K3（旗舰） | `kimi-k3` | ¥2.00 | ¥20.00 | ¥100.00 | 1,048,576（1M） |
| Kimi K2.7 Code | `kimi-k2.7-code` | ¥1.30 | ¥6.50 | ¥27.00 | 262,144（256k） |
| Kimi K2.7 Code HighSpeed | `kimi-k2.7-code-highspeed` | ¥2.60 | ¥13.00 | ¥54.00 | 262,144（256k） |

其他说明：

- Kimi K3：旗舰模型，面向长程编程与端到端知识工作；始终进行推理，`reasoning_effort` 支持 low / high / max（默认 max）；支持自动上下文缓存、ToolCalls、结构化输出、Partial Mode 等。
- Kimi K2.7 Code：编程模型，仅支持思考模式，支持文本/图片/视频输入；HighSpeed 为同模型高速版，输出约 180 tokens/s（短上下文可达 260 tokens/s）。
- 联网搜索（`web_search`）功能正在升级，官方提示近期不建议使用。

## 智谱（Z.ai / GLM）

来源：GLM Coding Plan 订阅页、开放平台定价页（官网截图），人民币价格

### 订阅套餐（GLM Coding Plan）

| 套餐 | 价格 | 定位 | 说明 |
| --- | --- | --- | --- |
| Lite | ¥118/月 | 小型 Repo 轻量级迭代 | 每周 10,000 积分，逐步开放最新旗舰模型及功能，支持 ZCode、Claude Code 等 20+ 编程工具 |
| Pro | ¥538/月 | 最受欢迎，中型 Repo 日常开发 | 6 倍 Lite 用量额度，优先体验最新旗舰模型及功能，覆盖多款精选 MCP 工具，更快生成速度 |
| Max | ¥1078/月 | 高阶用户，中大型 Repo 深度开发 | 14 倍 Lite 用量额度，首发接入最新旗舰模型及功能，高峰期专属资源优先保障 |

### API 价格

| 模型 | 上下文 | 输入单价 | 输出单价 | 缓存命中 | 缓存存储 |
| --- | --- | --- | --- | --- | --- |
| GLM-5.2（新品） | 1M | ¥8 | ¥28 | ¥2 | 限时免费 |

## MiniMax

来源：MiniMax 订阅页与开放平台定价页（官网截图/文字），人民币价格

### 订阅套餐（按月订阅）

| 套餐 | 价格 | 月度 M3 用量 | Agent 并发 | 说明 |
| --- | --- | --- | --- | --- |
| Plus | ¥49/月 | 约 6 亿+ token | 3–4 个 | 全系模型（M3 / M2.7 / 图像 / 语音 / 音乐），1M 长上下文，M3 原生多模态理解（图像/视频输入） |
| Max | ¥119/月 | 约 18 亿+ token | 4–5 个 | 同上，增加视频生成 3 条/日（最受欢迎） |
| Ultra | ¥469/月 | 约 71 亿+ token | 6–7 个 | 同上，视频生成 5 条/日 |

- 支持主流编程工具并持续扩展中；文本 / 图像 / 语音 / 音乐共享同一额度。

### API 价格（MiniMax-M3）

| 上下文长度 | 输入价格 | 输出价格 | 缓存读取 |
| --- | --- | --- | --- |
| ≤ 512K | ¥4.2（五折价 ¥2.1） | ¥16.8（五折价 ¥8.4） | ¥0.84（五折价 ¥0.42） |
| 512K–1M | ¥8.4（五折价 ¥4.2） | ¥33.6（五折价 ¥16.8） | ¥1.68（五折价 ¥0.84） |

- 官方标注「永久五折」，括号内为折后价。

## DeepSeek

来源：[api-docs.deepseek.com](https://api-docs.deepseek.com/) 官方文档，人民币价格（仅 API，无订阅套餐）

### API 价格（DeepSeek-V4 系列）

| 模型 | 输入（缓存命中） | 输入（缓存未命中） | 输出 | 并发限制 |
| --- | --- | --- | --- | --- |
| `deepseek-v4-flash`（V4-Flash-0731） | ¥0.02 | ¥1 | ¥2 | 2500 |
| `deepseek-v4-pro`（V4-Pro） | ¥0.025 | ¥3 | ¥6 | 500 |

其他说明：

- 上下文长度 1M，最大输出 384K；默认思考模式，可切换非思考模式。
- 支持 Json Output、Tool Calls、对话前缀续写（Beta）、FIM 补全（Beta，仅非思考模式）；均支持 Anthropic 格式 API；Responses API 仅 Flash 支持，Pro 暂不支持。
- BASE URL：OpenAI 格式 `https://api.deepseek.com`；Anthropic 格式 `https://api.deepseek.com/anthropic`。

## 横向对比小结

- **旗舰模型 API**：GPT-5.6 Sol（$5/$30）与 Opus 5（$5/$25）同档；Gemini 3.1 Pro（$2/$12 起）明显更便宜；国内产品以人民币计价，Kimi K3 为 ¥20/¥100（缓存命中输入仅 ¥2），智谱 GLM-5.2 为 ¥8/¥28（缓存命中 ¥2），MiniMax M3 为 ¥4.2/¥16.8（永久五折后 ¥2.1/¥8.4），DeepSeek V4 Pro 为 ¥3/¥6、V4 Flash 低至 ¥1/¥2（缓存命中输入仅 ¥0.02 起，为全场最低）。
- **中端模型 API**：Sonnet 5（$2/$10）、GPT-5.6 Terra（$2/$12）价格接近；Gemini 3.6 Flash（$1.5/$7.5）更低。
- **入门模型 API**：GPT-5.6 Luna（$0.20/$1.20）、Gemini 2.5 Flash-Lite（$0.10/$0.40）、Haiku 4.5（$1/$5）中 Google 最便宜。
- **个人套餐**：入门档 Google AI Plus $4.99 < ChatGPT Go $8 < Kimi Andante / MiniMax Plus ¥49；主力档三家海外产品均为 $20 左右（Claude Pro $20 / ChatGPT Plus $20 / Google AI Pro $19.99），Kimi 主力档为 ¥99–199/月，MiniMax Max 为 ¥119/月；顶级档 $100 起（Claude Max 5x $100 / Max 20x $200、ChatGPT Pro 5x $100 / 20x $200、Google AI Ultra 5x $99.99 / 20x $199.99），Kimi 顶级档 Allegro 为 ¥699/月，MiniMax Ultra 为 ¥469/月。
- **编程订阅**：智谱 GLM Coding Plan（¥118–1078/月，按周积分计量）、Kimi 会员（含 Kimi Code 权益，¥49–699/月）、MiniMax 订阅（¥49–469/月，按月度 token 用量计量）均为人民币计价的国内编程订阅选择，海外对应产品是 Claude Pro/Max（含 Claude Code）与 ChatGPT Plus/Pro（含 Codex）；DeepSeek 无订阅套餐，纯 API 按量计费。

## 附：个人实际用量参考

四个工具最近 30 天（2026-07-13 至 08-12）合计消耗 **约 18.3 亿 Tokens**：Antigravity 约 3.89 亿 + ZCode 约 5.4 亿 + Claude Code 约 3.09 亿 + Kimi Code 约 5.90 亿。

**Google Antigravity（agy）**：2026-07-13 至 2026-08-12 期间，活跃会话 78 个，模型调用 9,664 轮，净模型输出约 685.7 万 Tokens，API 累计交互总 Token 消耗约 3.89 亿（多轮上下文累计约 3.83 亿）。

![Google Antigravity Token 用量统计](/images/posts/google-antigravity-token-usage-2026-08.png)

**ZCode（智谱）**：最近 30 天 Token 用量 5.4 亿，会话 136 个，消息 247 条，活跃 17 天，最常用模型 GLM-5.2（占比 89%）。

![ZCode 智谱 Token 用量统计](/images/posts/zcode-glm-token-usage-2026-08.png)

**Claude Code（接入 Kimi / GLM / MiniMax）**：最近 30 天真实消耗约 3.09 亿 Tokens，总请求 3,302 次，总成本约 $59.38；新增输入 1,777.9 万，输出 217.7 万，缓存命中 2.90 亿，缓存命中率高达 94.2%。

![Claude Code Token 用量统计](/images/posts/claude-code-token-usage-2026-08.png)

**Kimi Code**：最近 30 天全部交互总 Token 约 5.90 亿，活跃会话 98 个，请求 5,731 轮；总输入约 5.87 亿（其中缓存读取约 5.72 亿，未缓存输入仅约 1,476.5 万），输出约 353.4 万，Prompt 缓存平均命中率 97.48%。按模型分布：`k3-256k` 占 49.8%、`k3` 占 25.3%、`kimi-for-coding-highspeed` 占 24.9%。

![Kimi Code Token 用量统计](/images/posts/kimi-code-token-usage-2026-08.png)

### 缓存命中率汇总

| 工具 | 缓存命中率 | 数据口径 |
| --- | --- | --- |
| Claude Code（K/G/M） | **94.2%** | 缓存命中 2.90 亿 / 总消耗 3.09 亿 |
| Kimi Code | **97.48%** | 缓存读取 5.72 亿 / 总输入 5.87 亿 |
| ZCode（智谱） | 无数据 | 官方统计仅给总量，未拆分缓存 |
| Antigravity（Google） | 无数据 | 仅给累计上下文 3.83 亿，未拆分缓存 |

有数据的两个工具按用量加权平均约 **96.2%**（8.62 亿缓存命中 / 8.96 亿总量），两家的统计口径略有差异（Claude Code 分母含输出，Kimi Code 分母仅输入），但都说明 Agent 编程场景的上下文复用率极高。

## 最近 30 天用量按 API 计费估算

基于上面四个样本的实际用量，按本文各厂商牌价粗算「如果不买订阅、纯走 API」的月成本。假设说明：

- Claude Code、Kimi Code 两个样本有完整的输入/缓存/输出拆分，直接按实测数据计算。
- ZCode、Antigravity 只有总量，参照 Claude Code 样本的结构假设：未缓存输入约 6%、缓存读取约 93%、输出约 1%（Agent 编程场景的典型分布）。
- 估算为粗略值，实际还受阶梯价、免费额度、套餐内折扣影响。

| 工具（模型） | 30 天总 Token | 按 API 估算月成本 | 对应订阅价参考 |
| --- | --- | --- | --- |
| Claude Code（Kimi / GLM / MiniMax 混合） | 3.09 亿 | 约 ¥177（MiniMax M3 五折价）～ ¥1,153（Kimi K3 价）；统计工具自估 $59.38 | 取决于接入方订阅 |
| Kimi Code（K3 系列） | 5.90 亿 | 约 ¥1,846 | Allegretto ¥199/月 |
| ZCode（GLM-5.2 占 89%） | 5.4 亿 | 约 ¥1,364 | GLM Coding Plan Lite ¥118 / Pro ¥538 |
| Antigravity（Gemini 3.x） | 3.89 亿 | 约 $140（按 3.6 Flash 价）～ $200（按 3.1 Pro 价） | Google AI Pro $19.99 / Ultra $99.99 起 |

估算明细：

- **Kimi Code ≈ ¥1,846**：k3-256k（未缓存输入 7.22M × ¥20 + 缓存 284.76M × ¥2 + 输出 1.92M × ¥100）约 ¥906；k3（5.55M / 142.67M / 1.17M）约 ¥514；highspeed（2.00M / 144.73M / 0.44M，按 K2.7 Code HighSpeed 价 ¥13 / ¥2.6 / ¥54）约 ¥426。
- **Claude Code ≈ ¥177–1,153**：未缓存输入 17.78M、缓存命中 290M、输出 2.18M。按 GLM-5.2 价（¥8 / ¥2 / ¥28）约 ¥783；按 Kimi K3 价（¥20 / ¥2 / ¥100）约 ¥1,153；按 MiniMax M3 五折价（¥2.1 / ¥0.42 / ¥8.4）约 ¥177。
- **ZCode ≈ ¥1,364**：5.4 亿按假设结构拆分为输入约 31M、缓存约 506M、输出约 3.8M，按 GLM-5.2 价（¥8 / ¥2 / ¥28）计算。
- **Antigravity ≈ $140–200**：累计上下文 3.83 亿按 94% 缓存命中拆分（新输入约 23M、缓存约 360M），输出 686 万；按 Gemini 3.1 Pro（$2 / $0.20 / $12）约 $200，按 Gemini 3.6 Flash（$1.5 / $0.15 / $7.5）约 $140。

> **结论**
>
> 亿级 token 的月用量按 API 计费约需 ¥1,000–2,000（或 $140–200），而对应订阅只要 ¥100–700（或 $20–100），**订阅制便宜了大约 5–10 倍**。原因在于 Agent 编程场景 94%+ 的 token 走缓存读取，而订阅套餐把这部分成本摊平了——用量越重，订阅越划算；轻度或偶发使用则按 API 计费更省。

## 切换到单一订阅（OpenAI 或 Claude）的额度估算

假设后续把四个工具的用量全部合并到一家，估算需要的套餐档位。

### 当前用量画像

- **总量**：约 18.3 亿 Tokens/月，其中缓存读取占 94%+，实际付费权重高的「新输入 + 输出」约 1.4 亿 Tokens/月。
- **请求频率**：Claude Code 3,302 次 + Kimi Code 5,731 轮 + Antigravity 9,664 轮 ≈ **1.9 万次请求/月，日均 600+ 次**，且多日连续活跃。
- **使用形态**：多工具并行、长上下文 Agent 编程，属于重度个人使用。

### 换算思路（重要前提）

Claude / ChatGPT 订阅的限额按「每 5 小时窗口的请求速率 + 每周上限」控制，官方只公布相对倍数（Pro 为基准，Max/Pro 档 5 倍、20 倍），不公布 token 级额度。因此这里用**请求频率和活跃天数**做锚点，再用 API 等效成本做交叉验证。注意用量合并不是 1:1 平移：单一工具后重复上下文会减少，但模型差异也会影响消耗。

### 只用 Claude

| 套餐 | 价格 | 承载能力判断 |
| --- | --- | --- |
| Pro | $20/月 | 远远不够：面向轻度使用，每天几次到几十次请求即触限，当前日均 600+ 请求的强度会直接卡死 |
| Max 5x | $100/月 | 可承载单一项目的日常开发，但承接全部四个工具的合并用量大概率触顶 |
| **Max 20x** | **$200/月** | **推荐**：面向重度多 Agent 并行用户，与当前用量画像匹配 |

交叉验证：18.3 亿 token 按 Sonnet 5 API 价（含 94% 缓存命中）约 $690/月，按 Opus 5 价约 $1,700/月——Max 20x 的 $200 仍远低于 API 成本，订阅依然划算；若主用 Opus 模型，周限额消耗会更快，20x 是必要的。

### 只用 OpenAI（ChatGPT）

| 套餐 | 价格 | 承载能力判断 |
| --- | --- | --- |
| Plus | $20/月 | 远远不够：Codex 编程智能体仅适合轻中度任务 |
| Pro 5x | $100/月 | 中度使用可试运行，合并全部用量大概率不足 |
| **Pro 20x** | **$200/月** | **推荐**：与 Claude Max 20x 对位，适合当前强度 |

交叉验证：按 GPT-5.6 Terra 牌价（$2 / $12，缓存价未列）粗算，API 等效成本同样在每月数百美元量级，$200 的 Pro 20x 仍是更优解。

### 建议

1. 先订 **Max 5x / Pro 5x（$100/月）试一个月**，观察 5 小时窗口和周限额的触限频率；频繁触限再升级 20x（两家的 20x 都是 $200/月，升级一般按差价结算）。
2. 过渡期保留一个国内低价订阅（如 Kimi Allegretto ¥199 或 GLM Coding Plan）作兜底，应对触限或网络波动。
3. 若用量回落到日均百次请求以内，5x 档即可长期承载。

> **注意**
>
> 两家的订阅限额会不定期调整（如周限额政策），触限表现也与所选模型强相关（Opus / Pro 前沿模型消耗配额更快）。以上判断基于 2026-08 的公开定价和个人用量画像，实际以账户内限额提示为准。
