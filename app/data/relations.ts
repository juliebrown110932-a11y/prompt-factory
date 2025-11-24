// 关系动态层级数据结构

export type RelationArc = {
  id: string;      // e.g. 'etl.standard'
  label: string;   // 曲线名（标准线/慢热线…）
  start: string;   // 起点
  turn: string;    // 转折
  end: string;     // 终点
};

export type RelationTheme = {
  id:
    | 'daily_companionship'
    | 'care_mutual'
    | 'childhood_friends'
    | 'ambiguous_testing'
    | 'bickering_lovers'
    | 'forbidden'
    | 'contract_marriage'
    | 'cat_mouse'
    | 'care_grooming'
    | 'enemies_to_lovers'
    | 'power_imbalance'
    | 'pretend_to_real'
    | 'redemption'
    | 'second_chance'
    | 'forced_bond'
    | 'amnesia';
  label: string;         // 主题名（UI 一级）
  description?: string;  // 一句话解释（预览用）
  arcs: RelationArc[];   // UI 二级
};

export const RELATIONS: RelationTheme[] = [
  // 第一梯队：日常甜向
  {
    id: 'daily_companionship',
    label: '日常陪伴',
    description: '在琐碎中相爱，平凡却不可替代。',
    arcs: [
      {
        id: 'dc.standard',
        label: '在琐碎中相爱',
        start: '平淡相处，没有惊心动魄的开始',
        turn:  '在琐碎日常中发现依赖——他不在时，总觉得少了什么',
        end:   '成为彼此的习惯，平凡却不可替代'
      }
    ],
  },
  {
    id: 'care_mutual',
    label: '照顾与被照顾',
    description: '一方需要帮助，另一方伸出手。',
    arcs: [
      {
        id: 'cm2.standard',
        label: '从依赖到相互支撑',
        start: '一方需要帮助，另一方伸出手',
        turn:  '发现这种依赖很甜——被需要和被照顾，都是幸福',
        end:   '从单向付出到互相支撑，成为彼此的依靠'
      }
    ],
  },
  {
    id: 'childhood_friends',
    label: '青梅竹马',
    description: '从小一起长大，习惯了彼此的存在。',
    arcs: [
      {
        id: 'cf.standard',
        label: '从朋友到恋人',
        start: '从小一起长大，习惯了彼此的存在',
        turn:  '某个瞬间意识到——这不只是朋友的感觉',
        end:   '捅破窗户纸，从\'我们\'变成\'我们俩\''
      }
    ],
  },
  {
    id: 'ambiguous_testing',
    label: '暧昧试探',
    description: '若即若离的距离，试探性的靠近。',
    arcs: [
      {
        id: 'at.standard',
        label: '从暧昧到明朗',
        start: '若即若离的距离，试探性的靠近',
        turn:  '某个瞬间心动，但谁也不敢先说破',
        end:   '终于有人先开口，暧昧变成明朗'
      }
    ],
  },
  {
    id: 'bickering_lovers',
    label: '欢喜冤家',
    description: '见面就斗嘴，却谁也离不开谁。',
    arcs: [
      {
        id: 'bl.standard',
        label: '吵着吵着就喜欢上了',
        start: '见面就斗嘴，谁也不服谁',
        turn:  '发现吵架也是一种在意——不在乎的人，连吵都懒得吵',
        end:   '在打闹中确认心意，\'我最烦你了\'变成\'我只烦你一个人\''
      }
    ],
  },

  // 第二梯队：轻度张力
  {
    id: 'forbidden',
    label: '禁忌/背德',
    description: '越是不能，越是想要；爱与规则对撞。',
    arcs: [
      {
        id: 'fbd.break',
        label: '越界沉沦',
        start: '压抑欲望：身份/伦理/制度阻隔一切',
        turn:  '秘密爆发：一次越界引燃全部克制',
        end:   '代价与救赎：学会承担爱与罪'
      }
    ],
  },
  {
    id: 'contract_marriage',
    label: '契约婚姻',
    description: '冷协议之下的感情萌芽，从场面话到真心话。',
    arcs: [
      {
        id: 'cm.cool',
        label: '冷到热',
        start: '利益协议：理性交易，明确界限',
        turn:  '情感渗透：生活细节溶解防线',
        end:   '真情告白：契约失效，爱成唯一理由'
      }
    ],
  },
  {
    id: 'cat_mouse',
    label: '猫鼠游戏',
    description: '追与逃的博弈，欲望与理智拉扯。',
    arcs: [
      {
        id: 'cm.hunt',
        label: '狩猎反转',
        start: '狩猎游戏：彼此试探、挑衅',
        turn:  '角色反转：猎人与猎物的界线模糊',
        end:   '共坠深渊：他们成了彼此的瘾'
      }
    ],
  },
  {
    id: 'care_grooming',
    label: '养成',
    description: '依附与教育交织，从保护到占有再到选择。',
    arcs: [
      {
        id: 'cg.depend',
        label: '依赖平衡',
        start: '守护姿态：一方居高临下给予照顾',
        turn:  '依赖滋生：被照顾者学会回应或反抗',
        end:   '权力平衡：从监护者变恋人，从依赖变选择'
      }
    ],
  },

  // 第三梯队：重度张力
  {
    id: 'enemies_to_lovers',
    label: '从敌到爱',
    description: '敌意与吸引并存，从对抗到信任，从锋芒到依赖。',
    arcs: [
      {
        id: 'etl.standard',
        label: '标准线',
        start: '对立与误解：立场冲突、互不相让',
        turn:  '共同危机：被迫协作、彼此破防',
        end:   '命运绑定：相互选择、不再后退'
      },
      {
        id: 'etl.slowburn',
        label: '慢热线',
        start: '针锋相对：嘴硬逞强',
        turn:  '互相救助：心软与心动同时出现',
        end:   '不愿分离：承认在意并放下戒备'
      },
    ],
  },
  {
    id: 'power_imbalance',
    label: '权力不均',
    description: '控制与被控制，从支配走向互相影响。',
    arcs: [
      {
        id: 'pi.taming',
        label: '驯化/觉醒',
        start: '绝对掌控：一方制定规则，另一方被动接受',
        turn:  '情感动摇：权力让位于真实情绪',
        end:   '共存关系：权力被亲密重新定义'
      }
    ],
  },
  {
    id: 'pretend_to_real',
    label: '假戏真做',
    description: '带目的的伪装，最终成为真实的情感。',
    arcs: [
      {
        id: 'ptr.standard',
        label: '入戏过深',
        start: '协定关系：出于利益或隐瞒假扮恋人',
        turn:  '情感失控：界线模糊，角色代入太深',
        end:   '真相揭晓：谎言结束，却再也回不去'
      }
    ],
  },
  {
    id: 'redemption',
    label: '救赎',
    description: '一个人坠落，一个人伸手——从互伤到疗愈。',
    arcs: [
      {
        id: 'rd.broken',
        label: '破碎重生',
        start: '绝望边缘：他/她已放弃被爱',
        turn:  '痛苦互救：一次次把彼此拉回边缘',
        end:   '情感重生：在对方身上找到活下去的意义'
      }
    ],
  },
  {
    id: 'second_chance',
    label: '破镜重圆',
    description: '曾爱过的人再次相遇，旧伤与心动并存。',
    arcs: [
      {
        id: 'sc.reunion',
        label: '重逢修复',
        start: '久别重逢：时间与误会让两人疏远',
        turn:  '重新靠近：旧情被触发，伤口未愈',
        end:   '再次选择：这一次学会如何相爱'
      }
    ],
  },
  {
    id: 'forced_bond',
    label: '被迫捆绑',
    description: '外部事件将双方绑在一起，从排斥到共存。',
    arcs: [
      {
        id: 'fb.mission',
        label: '任务搭档',
        start: '被迫协作：任务/事故/契约将两人捆在一起',
        turn:  '并肩作战：在磨合中看见对方的人性',
        end:   '依赖成瘾：从合作到不愿分离'
      }
    ],
  },
  {
    id: 'amnesia',
    label: '失忆',
    description: '当记忆被抹去，爱是否还能重来。',
    arcs: [
      {
        id: 'am.rebuild',
        label: '重建爱意',
        start: '失去过去：情感被清空，一切回到原点',
        turn:  '重新相识：旧的熟悉感不请自来',
        end:   '记忆重构：爱在失忆中重生'
      }
    ],
  },
];
