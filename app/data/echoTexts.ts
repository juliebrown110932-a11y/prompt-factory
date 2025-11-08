// Echo 句子模板：用于右侧逐步浮现的短句；不影响生成器
// 优先使用 archetype/relation/world 的精确句，缺失则回退为母类 echo

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
