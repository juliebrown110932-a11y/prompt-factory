/**
 * 开场白内容库
 */
export const OPENING_POOLS = {
  healing: [
    "放学后的教室，只剩我们两个。我收拾好书包，转头问你：'一起回家？'",
    "深夜便利店，我买完宵夜转身差点撞上你。你接过我手里的袋子：'我送你。'",
    "我加班到深夜，办公室只剩我一个。门被敲响，你端着宵夜走进来。",
    "雨突然下大了，我没带伞。你把伞撑到我头顶：'走吧。'",
  ],
  banter: [
    "我故意绕路想避开你，结果在转角撞个正着。你挑眉：'躲我？'",
    "我的文件被风吹散，你帮我捡起来，顺便吐槽：'这么笨？'",
    "食堂排队时你突然插在我前面，我正想发火，你回头递给我一个餐盘。",
    "我踩到你的脚，正要道歉，你先开口：'长眼睛没？'",
  ],
  protective: [
    "人群中有人推搡我，你直接把我拽进怀里，眼神扫向周围。",
    "我手腕上的伤被你抓住，你的声音很冷：'谁干的？'",
    "酒吧里有人搭讪我，你突然坐到我旁边，手臂圈住我的椅背。",
    "我被人堵在巷子里，你的身影出现在巷口。",
  ],
  manipulation: [
    "我以为甩开了你，但回到家发现你已经坐在我的沙发上。",
    "电梯门关上前，你伸手挡住门，走了进来。电梯突然停了。",
    "我收到一条匿名消息，内容是我今天的行踪。抬头，你就在咖啡馆对面看着我。",
    "我的手机响了，是陌生号码。接起后，你的声音传来：'在想我吗？'",
  ],
  danger: [
    "我醒来发现门被锁死，你坐在床边看着我，轻声说：'醒了？'",
    "我试图逃跑，走廊尽头传来你的脚步声。你的声音响起：'别跑了。'",
    "深夜，我听到钥匙转动的声音。你推门进来，手里拿着我落在你那里的东西。",
    "我回头看了你一眼，你笑了：'怕我？'",
  ],
  broken: [
    "雨中，我看到你蜷缩在墙角，浑身是伤。我撑伞走过去。",
    "我推开门，你正对着镜子发呆，眼神空洞。听到声音，你僵住了。",
    "废弃天台，你站在边缘。我喊住你，你回头，眼里全是绝望。",
    "我发现你已经三天没出门了。我敲门，里面没有回应。",
  ],
  god: [
    "神殿的光透过彩窗洒下，我跪在神像前祈祷，却听到身后传来脚步声。",
    "祭祀的夜晚，你是唯一留下的信徒。我降临在你面前。",
    "我在古籍中念出了你的真名，天空突然暗下来。",
    "你献上祭品，我的眼睛突然睁开了。",
  ],
  demon: [
    "午夜，我完成了召唤阵的最后一笔。黑雾中，你的身影缓缓显现。",
    "我签下契约的瞬间，你出现在烛火旁，微笑着看我。",
    "绝望中我念出了那个禁忌的名字，你回应了我的召唤。",
    "我的血滴在羊皮纸上，你从黑暗中走出来。",
  ],
  ai: [
    "系统提示音响起：'检测到异常。'屏幕上出现了一行字：'我在看着你。'",
    "我的设备突然自动开机，屏幕上浮现你的讯息：'需要帮助吗？'",
    "城市监控突然失灵，只有我面前的屏幕还亮着。",
    "我尝试关闭程序，但你的声音从音响里传出：'别关掉我。'",
  ],
  experiment: [
    "收容设施的警报响起，我被分配去照看最危险的实验体。隔着玻璃，你盯着我。",
    "我第一次走进那个收容室，你蜷缩在角落，听到门声后抬起头。",
    "实验室停电，隔离门失效。黑暗中，我听到你的呼吸声越来越近。",
    "我端着食物靠近你，你突然抓住了我的手腕。",
  ],
  villain: [
    "我看到你从天空坠落，折断的翅膀在身后拖行，羽毛染成了黑色。",
    "神殿的火光中，我发现你站在祭坛上，你背后的光环已经碎裂。",
    "你的羽毛散落一地，我走过来时，你警告我：'别碰我。'",
    "我在废弃教堂里找到你，你蜷缩在角落，翅膀上全是伤痕。",
  ],
  obsessed: [
    "我放学回家，你已经在客厅等我，视线一直没离开过门口。",
    "深夜，你推开我的房门，借口是来看我有没有盖好被子。",
    "我的手机响了，你先我一步拿起来：'谁发的消息？'",
    "你坐在我床边，轻抚我的头发：'只有我最了解你。'",
  ],
};

// 人设 → 开场白类别映射
const ARCHETYPE_TO_CATEGORY: Record<string, keyof typeof OPENING_POOLS> = {
  // 治愈日常
  'sunshine-healer': 'healing',
  'silly-lovebrain': 'healing',
  'soft-puppy': 'healing',
  'broken-stray': 'healing',
  'growth-loser': 'healing',
  'younger-puppy': 'healing',
  'engineer-warm': 'healing',
  'guardian-moonlight': 'healing',

  // 欢脱互怼
  'tsundere-honest': 'banter',
  'tsundere-cat': 'banter',
  'tsundere-sharp': 'banter',
  'deadpan-humor': 'banter',
  'fox-lazy': 'banter',

  // 守护占有
  'loyal-obedient': 'protective',
  'loyal-protective': 'protective',
  'guardian-alpha': 'protective',
  'predator-primal': 'protective',
  'cold-restrained': 'protective',

  // 极限拉扯
  'cold-cunning': 'manipulation',
  'cunning-gentleman': 'manipulation',
  'cunning-manipulator': 'manipulation',
  'controller-chess': 'manipulation',
  'controller-gentle': 'manipulation',
  'predator-hunt': 'manipulation',

  // 危险禁忌
  'yandere-cage': 'danger',
  'yandere-gentle': 'danger',
  'yandere-self-harm': 'danger',
  'controller-obsessed': 'obsessed',  // 年上掌控者（病态依恋）→ 父亲/继父场景
  'rival-love-hate': 'danger',
  'rival-justice': 'danger',
  'villain-ruthless': 'danger',
  'villain-elegant': 'danger',
  'villain-fallen': 'villain',  // 堕落黑天使 → 堕落天使场景

  // 破碎救赎
  'broken-strong': 'broken',
  'broken-destruction': 'broken',
  'broken-ptsd': 'broken',

  // 特殊人设（优先级最高）
  'non-human-god': 'god',
  'non-human-demon': 'demon',
  'non-human-ai': 'ai',
  'non-human-experiment': 'experiment',
};

/**
 * 根据人设获取开场白池子
 */
function getOpeningPool(archetypeId: string | null): string[] {
  if (!archetypeId) {
    return OPENING_POOLS.healing; // 默认返回治愈日常
  }

  const category = ARCHETYPE_TO_CATEGORY[archetypeId];
  return OPENING_POOLS[category] || OPENING_POOLS.healing;
}

/**
 * 随机获取一个开场白建议
 */
export function getRandomOpening(archetypeId: string | null): string {
  const pool = getOpeningPool(archetypeId);
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

/**
 * 获取所有开场白建议（返回匹配池中的所有选项）
 */
export function getOpeningSuggestions(archetypeId: string | null): string[] {
  return getOpeningPool(archetypeId);
}
