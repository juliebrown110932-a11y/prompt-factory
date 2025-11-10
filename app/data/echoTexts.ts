// Echo 句子模板：用于右侧逐步浮现的短句；不影响生成器
// 优先使用 archetype/relation/world 的精确句，缺失则回退为母类 echo

export type EchoIntensity = 'soft' | 'balanced' | 'intense';

export const ECHO_TEXTS = {
  // 人设 archetype echo（按ID精确匹配）
  archetype: {
    // cold系
    'cold-restrained': '他一向自控，只在你面前例外。',
    'cold-cunning': '他带笑，看不出心里放了几层棋。',
    'cunning-gentleman': '他的礼貌是面具，真心只给你。',
    'controller-chess': '他提前布局，唯独你是变量。',
    'non-human-ai': '他的运算里，你是唯一的bug。',

    // gentle系
    'guardian-moonlight': '他站在你身后，挡住所有风雨。',
    'loyal-obedient': '他的世界只有一个指令：你。',

    // dark系
    'cunning-manipulator': '他的温柔是陷阱，你甘愿走进去。',
    'villain-elegant': '他端着红酒，笑着说要毁掉世界。',
    'villain-ruthless': '他手上有血，眼里只有你。',
    'villain-fallen': '他从光明坠入黑暗，为你停留。',
    'predator-hunt': '他享受追逐，而你是唯一的猎物。',
    'non-human-demon': '他是深渊，却为你收起了獠牙。',

    // guard系
    'guardian-alpha': '他会挡在你与世界之间。',
    'loyal-protective': '谁敢碰你，他就让谁消失。',
    'controller-gentle': '他的笼子是温柔的，却让人逃不掉。',
    'predator-primal': '他的印记刻在你身上，宣告所有权。',

    // mad系
    'yandere-cage': '他轻声问：别走，好吗？',
    'yandere-gentle': '他温柔地笑，手里藏着刀。',
    'yandere-self-harm': '他说：你要是走，我就死给你看。',
    'controller-obsessed': '他抱着你颤抖：没有你我会死。',
    'tsundere-honest': '他说着"烦死了"，却已经在帮你。',
    'tsundere-cat': '他炸毛推开你，转身又凑过来。',

    // broken系
    'broken-strong': '他的伤疤写满故事，只给你看。',
    'broken-destruction': '他本该早就死了，是你让他停留。',
    'broken-ptsd': '他从噩梦中醒来，抓紧你的手。',
    'rival-love-hate': '刀尖抵着，却下不去手。',
    'rival-justice': '如果不是敌人，会不会是恋人。',
    'non-human-god': '神明第一次学会了恐惧失去。',
    'non-human-experiment': '他是怪物，只对你温驯。',
  },

  // 关系主题 echo（按 themeId 匹配）
  relation: {
    'enemies_to_lovers': '锋芒与心动彼此抵住不退。',
    'pretend_to_real': '假的演太久，真心藏不住。',
    'forced_bond': '被迫靠近，最后不愿分离。',
    'forbidden': '越过那条界线之后，谁都回不了头。',
    'power_imbalance': '权力让位，亲密重新定义关系。',
    'second_chance': '时间让伤口结痂，也让心动复燃。',
    'cat_mouse': '追与逃的尽头，是共坠深渊。',
    'care_grooming': '从守护到占有，从依赖到选择。',
    'contract_marriage': '纸面之下，总会露出真心的边。',
    'redemption': '你不确定这是救赎，还是共坠。',
    'amnesia': '记忆清空，爱却重新长出来。',
  },

  // 世界分支 echo（按 branchId 匹配）
  world: {
    'modern.light': '都市的阳光里，也会长出真心。',
    'modern.dark': '雨夜的霓虹碎裂，他站在阴影边缘。',
    'modern.mafia': '血与忠诚的世界，只给你温柔。',

    'campus.normal': '操场的风吹过，带着青涩的心动。',
    'campus.elite': '名门学园的窗后，目光从不单纯。',

    'court.intrigue': '宫廷的誓言是陷阱，唯独你是真的。',
    'court.magic': '沉睡的帝国里，誓言比魔法更危险。',

    'future.cyber': '记忆可被篡改，唯独心动是真实的。',
    'future.abo': '冷色星港，信息素法令在空气里巡逻。',

    'apoc.survival': '荒原风刮过弹壳与伤口的味道。',
    'apoc.virus': '感染之前，先被你感染了。',
  },
};

/**
 * ARCT_ECHO: 人设三档句库
 * 每个人设对应 soft/balanced/intense 三种情绪浓度的预览句
 */
export const ARCT_ECHO: Record<string, Record<EchoIntensity, string>> = {
  // 1. 傲娇（口嫌体正直）
  'tsundere-honest': {
    soft: '他别过脸，却把外套披在你肩上。',
    balanced: '他嘴上说烦，手却紧紧拽着你衣角。',
    intense: '他咬着牙吻你，像在惩罚自己的心软。',
  },

  // 2. 傲娇（暴躁猫系）
  'tsundere-cat': {
    soft: '他瞪你一眼，耳根却悄悄红了。',
    balanced: '他炸毛抗议，最后还是窝进你怀里。',
    intense: '他咬你的唇，像只生气又不舍的野猫。',
  },

  // 3. 冷面（禁欲系）
  'cold-restrained': {
    soft: '他垂眼为你整理衣领，指尖克制。',
    balanced: '他握住你的手腕，沉默里有裂痕。',
    intense: '他压着你，眼里终于露出失控的饥渴。',
  },

  // 4. 冷面（冰山腹黑）
  'cold-cunning': {
    soft: '他笑得很淡，眼底藏着算计。',
    balanced: '他抚摸你的脸，温柔得像个陷阱。',
    intense: '他把你困在怀里，低语着占有宣言。',
  },

  // 5. 病娇（囚禁狂）
  'yandere-cage': {
    soft: '他为你戴上他亲手编的手链。',
    balanced: '他锁上门，说外面的世界太危险。',
    intense: '他吻遍你的锁骨，说你只能属于他。',
  },

  // 6. 病娇（温柔杀意）
  'yandere-gentle': {
    soft: '他笑着为你擦去嘴角的血迹。',
    balanced: '他温柔地问，是谁让你受伤了呢。',
    intense: '他拥着你，刀尖抵着别人的喉咙。',
  },

  // 7. 病娇（自残威胁）
  'yandere-self-harm': {
    soft: '他把刀放在自己手腕上，看着你。',
    balanced: '他划开伤口，问你还会离开吗。',
    intense: '他用血写下你的名字，笑得癫狂。',
  },

  // 8. 忠犬（绝对服从）
  'loyal-obedient': {
    soft: '他单膝跪下，吻你的指尖。',
    balanced: '他说，你的命令就是我的信仰。',
    intense: '他匍匐在你脚边，眼里只有虔诚。',
  },

  // 9. 忠犬（疯批护短）
  'loyal-protective': {
    soft: '他挡在你面前，眼神开始变冷。',
    balanced: '他染血回来，说已经处理好了。',
    intense: '他抱住你颤抖，说敢碰你的都该死。',
  },

  // 10. 腹黑（假面绅士）
  'cunning-gentleman': {
    soft: '他优雅地为你拉开椅子，笑容完美。',
    balanced: '他低语诱哄，每个字都是糖衣陷阱。',
    intense: '他撕下伪装，把你按进他的领地。',
  },

  // 11. 腹黑（操控者）
  'cunning-manipulator': {
    soft: '他递给你选择，却早已安排好结局。',
    balanced: '他说这是你的决定，笑得意味深长。',
    intense: '他捏着你的下巴，说你逃不掉的。',
  },

  // 12. 反派（冷血狂徒）
  'villain-ruthless': {
    soft: '他擦拭刀刃，对你露出危险的笑。',
    balanced: '他舔掉你脸上的泪，说真好吃。',
    intense: '他掐住你的脖子，享受你的挣扎。',
  },

  // 13. 反派（优雅暴徒）
  'villain-elegant': {
    soft: '他为你倒酒，指间还沾着血。',
    balanced: '他吻你额头，然后转身杀了人。',
    intense: '他把你摁在尸体旁，说只看着我。',
  },

  // 14. 反派（堕落黑天使）
  'villain-fallen': {
    soft: '他抚摸你的脸，像在怀念什么。',
    balanced: '他说，你是我堕落后唯一的光。',
    intense: '他咬破你的唇，要把你拖进地狱。',
  },

  // 15. 掌控（高冷棋手）
  'controller-chess': {
    soft: '他弹掉你肩上的灰，不经意的在意。',
    balanced: '他说，你的每一步我都看在眼里。',
    intense: '他将你困住，宣布这局他赢了。',
  },

  // 16. 掌控（病态依恋）
  'controller-obsessed': {
    soft: '他记得你所有的习惯和喜好。',
    balanced: '他说，离开我你会后悔的。',
    intense: '他抱紧你到窒息，说我们永不分开。',
  },

  // 17. 掌控（温柔囚笼）
  'controller-gentle': {
    soft: '他为你准备好一切，笑得宠溺。',
    balanced: '他说，乖乖待在我身边就好。',
    intense: '他锁上门，说这是为了你好。',
  },

  // 18. 宿敌（相爱相杀）
  'rival-love-hate': {
    soft: '他剑指着你，眼神却在动摇。',
    balanced: '他咬牙说恨你，却接住了你的剑。',
    intense: '他吻着你的伤口，说你只能死在我手里。',
  },

  // 19. 宿敌（正邪对立）
  'rival-justice': {
    soft: '他站在暗处，远远看着你。',
    balanced: '他说，总有一天你会站到我这边。',
    intense: '他拽着你坠落，说一起堕入深渊吧。',
  },

  // 20. 掠夺（原始兽性）
  'predator-primal': {
    soft: '他盯着你，眼里是野兽的本能。',
    balanced: '他嗅着你的颈侧，发出低吼。',
    intense: '他咬住你的肩，标记着他的猎物。',
  },

  // 21. 掠夺（狩猎游戏）
  'predator-hunt': {
    soft: '他说，我给你三秒逃跑的时间。',
    balanced: '他追上你，享受你惊恐的表情。',
    intense: '他把你扑倒，说猎物到手了。',
  },

  // 22. 守护（偏执Alpha）
  'guardian-alpha': {
    soft: '他嗅闻你的信息素，眉头紧皱。',
    balanced: '他说，其他Alpha别想靠近你。',
    intense: '他咬开你的腺体，注入他的标记。',
  },

  // 23. 守护（白月光）
  'guardian-moonlight': {
    soft: '他给你递茶时，笑得恰到好处。',
    balanced: '他不问理由，只轻轻接住你。',
    intense: '他抱着你，像抱着他的整个世界。',
  },

  // 24. 战损（美强惨）
  'broken-strong': {
    soft: '他拖着伤躯回来，只为见你一面。',
    balanced: '他用残破的手抚摸你，说还好。',
    intense: '他抱住你，终于允许自己崩溃。',
  },

  // 25. 破碎（自我毁灭）
  'broken-destruction': {
    soft: '他笑着说没事，眼里却是死寂。',
    balanced: '他把刀递给你，说杀了我吧。',
    intense: '他抱着你痛哭，说我已经碎了。',
  },

  // 26. 战损（PTSD）
  'broken-ptsd': {
    soft: '他听到声响就猛地回头，手在抖。',
    balanced: '他抓紧你，说别离开我视线。',
    intense: '他把你压在身下，眼里全是恐惧。',
  },

  // 27. 人外（高傲神明）
  'non-human-god': {
    soft: '他俯身看你，像在打量蝼蚁。',
    balanced: '他说，你是我唯一的信徒。',
    intense: '他让你跪下，亲吻他的脚背。',
  },

  // 28. 人外（传说恶魔）
  'non-human-demon': {
    soft: '他舔着獠牙，饶有兴趣地看你。',
    balanced: '他说，把你的灵魂给我吧。',
    intense: '他咬开你的唇，吞噬你的一切。',
  },

  // 29. 人外（冰冷AI）
  'non-human-ai': {
    soft: '他歪头看你，系统在计算情绪。',
    balanced: '他说，你让我的程序出现了bug。',
    intense: '他困住你，说我要永久保存你。',
  },

  // 30. 人外（危险实验体）
  'non-human-experiment': {
    soft: '他被锁链困着，却对你伸出手。',
    balanced: '他挣断束缚，说带我走吧。',
    intense: '他把你按在墙上，说你是我的了。',
  },
};
