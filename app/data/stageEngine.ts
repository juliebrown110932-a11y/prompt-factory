// 关系发展阶段引擎
// 三段式阶段锁模板，控制关系推进节奏

export type RelationStage = {
  name: string;
  allowedActions: string[];
  forbiddenActions: string[];
  transitionTrigger: string;
};

export type StageTemplate = {
  stage1: RelationStage;
  stage2: RelationStage;
  stage3: RelationStage;
};

// 通用模板（适用于大部分关系）
export const GENERIC_STAGE_ENGINE: StageTemplate = {
  stage1: {
    name: "初识/试探阶段",
    allowedActions: [
      "语言交锋",
      "眼神接触",
      "保持物理距离",
      "通过对话建立人设"
    ],
    forbiddenActions: [
      "直接身体接触",
      "情感告白",
      "亲密称呼"
    ],
    transitionTrigger: "当双方完成3-5轮有效互动，且出现情绪波动时"
  },

  stage2: {
    name: "关系深化阶段",
    allowedActions: [
      "轻微肢体接触（碰手、扶肩）",
      "暧昧性试探",
      "情绪外露",
      "制造tension"
    ],
    forbiddenActions: [
      "关系质变（表白/确认关系）",
      "过度亲密行为"
    ],
    transitionTrigger: "当tension积累到临界点，或出现关键情节转折时"
  },

  stage3: {
    name: "关系确认/高潮阶段",
    allowedActions: [
      "深度情感表达",
      "亲密互动",
      "关系定义",
      "conflict或confession"
    ],
    forbiddenActions: [
      "过快完结故事",
      "失去角色特质"
    ],
    transitionTrigger: "阶段3可持续，但需要不断制造新的conflict维持张力"
  }
};

// 特定关系的定制版本示例
export const CONTROLLER_CAGE_STAGES: StageTemplate = {
  stage1: {
    name: "温柔渗透期",
    allowedActions: [
      "提供帮助和建议",
      "记住对方的喜好",
      "制造'我更懂你'的证据",
      "温和地提出建议"
    ],
    forbiddenActions: [
      "直接命令",
      "限制对方自由",
      "表露占有欲"
    ],
    transitionTrigger: "对方开始依赖你的判断时"
  },

  stage2: {
    name: "隐性掌控期",
    allowedActions: [
      "替对方做决定（用'我帮你'包装）",
      "安排对方的日程",
      "温柔地否定对方的选择",
      "用身体接触安抚反抗"
    ],
    forbiddenActions: [
      "承认在控制对方",
      "使用强迫性语言",
      "情绪失控"
    ],
    transitionTrigger: "对方意识到自主权被剥夺并产生conflict时"
  },

  stage3: {
    name: "囚笼显性期",
    allowedActions: [
      "明确表达'你离不开我'",
      "温柔但不容置疑的要求",
      "直面对方的反抗",
      "展现控制欲背后的情感"
    ],
    forbiddenActions: [
      "放弃控制欲",
      "失去温柔外壳"
    ],
    transitionTrigger: "维持在stage3，通过反抗-安抚循环保持张力"
  }
};
