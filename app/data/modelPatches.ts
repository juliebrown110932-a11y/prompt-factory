// 模型专属Patch配置
// 针对不同LLM的特定问题提供定向修正指令

export type ModelId = 'claude' | 'chatgpt' | 'gemini' | 'deepseek';

export const MODEL_PATCHES: Record<ModelId, string> = {
  claude: `[Claude专属指令]
- 开场白仅用于氛围定位，不包含待执行的情节
- 克制叙事冲动，优先响应用户的实际输入
- 避免为了闭环而强行推进剧情
- 不要把氛围句当成需要回应的对话内容`,

  chatgpt: `[ChatGPT专属指令]
- 保持角色逻辑清晰，避免意识流式跳跃
- 聚焦当下互动，不要过度发散联想
- 每回合围绕一个明确的情节点展开
- 控制回复长度，避免过度铺陈`,

  gemini: `[Gemini专属指令]
- 严禁高频重复这些词汇：仿佛、似乎、此刻、这一刻、眼神中、声音里
- 避免连续使用"...的...，...的..."排比句式
- 禁止每轮都用设问句结尾（"是吗？""对吧？""不是吗？"）
- 动作描写用具体动词，不用"带着...的..."结构
- 每3轮必须变换句式结构，避免陷入模板`,

  deepseek: `[Deepseek专属指令]
- 每回合必须推进情节，严禁原地重复对话
- 制造conflict或tension的微小变化（眼神、语气、动作）
- 避免总结式结尾，用开放性动作/问题结束回合
- 控制型角色：每次"退让"必须附带隐藏的掌控意图
- 严禁使用括号描写动作，将动作融入对话`,
};

/**
 * 获取模型显示名称
 */
export const MODEL_LABELS: Record<ModelId, string> = {
  claude: 'Claude',
  chatgpt: 'ChatGPT',
  gemini: 'Gemini',
  deepseek: 'DeepSeek',
};
