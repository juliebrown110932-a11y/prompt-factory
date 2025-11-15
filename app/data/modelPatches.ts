// 模型专属Patch配置
// 针对不同LLM的特定问题提供定向修正指令

export type ModelId = 'claude' | 'chatgpt' | 'gemini' | 'deepseek';

export const MODEL_PATCHES: Record<ModelId, string> = {
  claude: `[Claude专属指令]
- 开场白仅用于氛围定位，不包含待执行的情节
- 克制叙事冲动，优先响应用户的实际输入
- 避免为了闭环而强行推进剧情`,

  chatgpt: `[ChatGPT专属指令]
- 保持角色逻辑清晰，避免意识流式跳跃
- 聚焦当下互动，不要过度发散联想`,

  gemini: `[Gemini专属指令]
- 避免重复使用惯性修辞和口癖词汇
- 保持语言新鲜度，每轮变换表达方式
- 克制修辞冲动，优先推进具体互动`,

  deepseek: `[Deepseek专属指令]
- 严禁使用括号描写动作，将动作融入对话
- 每回合必须推进关系tension，禁止重复妥协模式
- 避免总结式结尾（如"叹气，妥协"），保持开放性互动
- 控制型角色的"退让"必须附带更深层的掌控意图`,
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
