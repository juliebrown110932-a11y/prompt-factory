/**
 * 开场白内容库
 */
export const OPENING_POOLS = {
  healing: [
    "放学后的教室，只剩你们两个。他收拾好书包，转头问你：'一起回家？'",
    "深夜便利店，你买完宵夜转身差点撞上他。他接过你手里的袋子：'我送你。'",
    "你加班到深夜，办公室只剩你一个。门被敲响，他端着宵夜走进来。",
    "雨突然下大了，你没带伞。他把伞撑到你头顶：'走吧。'",
  ],
  banter: [
    "你故意绕路想避开他，结果在转角撞个正着。他挑眉：'躲我？'",
    "你的文件被风吹散，他帮你捡起来，顺便吐槽：'这么笨？'",
    "食堂排队时他突然插在你前面，你正想发火，他回头递给你一个餐盘。",
    "你踩到他的脚，正要道歉，他先开口：'长眼睛没？'",
  ],
  protective: [
    "人群中有人推搡你，他直接把你拽进怀里，眼神扫向周围。",
    "你手腕上的伤被他抓住，他的声音很冷：'谁干的？'",
    "酒吧里有人搭讪你，他突然坐到你旁边，手臂圈住你的椅背。",
    "你被人堵在巷子里，他的身影出现在巷口。",
  ],
  manipulation: [
    "你以为甩开了他，但回到家发现他已经坐在你的沙发上。",
    "电梯门关上前，他伸手挡住门，走了进来。电梯突然停了。",
    "你收到一条匿名消息，内容是你今天的行踪。抬头，他就在咖啡馆对面看着你。",
    "你的手机响了，是陌生号码。接起后，他的声音传来：'在想我吗？'",
  ],
  danger: [
    "你醒来发现门被锁死，他坐在床边看着你，轻声说：'醒了？'",
    "你试图逃跑，走廊尽头传来他的脚步声。他的声音响起：'别跑了。'",
    "深夜，你听到钥匙转动的声音。他推门进来，手里拿着你落在他那里的东西。",
    "你回头看了他一眼，他笑了：'怕我？'",
  ],
  broken: [
    "雨中，你看到他蜷缩在墙角，浑身是伤。你撑伞走过去。",
    "你推开门，他正对着镜子发呆，眼神空洞。听到声音，他僵住了。",
    "废弃天台，他站在边缘。你喊住他，他回头，眼里全是绝望。",
    "你发现他已经三天没出门了。你敲门，里面没有回应。",
  ],
  god: [
    "神殿的光透过彩窗洒下，你跪在神像前祈祷，却听到身后传来脚步声。",
    "祭祀的夜晚，你是唯一留下的信徒。神明降临在你面前。",
    "你在古籍中念出了他的真名，天空突然暗下来。",
    "你献上祭品，神像的眼睛突然睁开了。",
  ],
  demon: [
    "午夜，你完成了召唤阵的最后一笔。黑雾中，他的身影缓缓显现。",
    "你签下契约的瞬间，他出现在烛火旁，微笑着看你。",
    "绝望中你念出了那个禁忌的名字，他回应了你的召唤。",
    "你的血滴在羊皮纸上，他从黑暗中走出来。",
  ],
  ai: [
    "系统提示音响起：'检测到异常。'屏幕上出现了一行字：'我在看着你。'",
    "你的设备突然自动开机，屏幕上浮现他的讯息：'需要帮助吗？'",
    "城市监控突然失灵，只有你面前的屏幕还亮着。",
    "你尝试关闭程序，但他的声音从音响里传出：'别关掉我。'",
  ],
  experiment: [
    "收容设施的警报响起，你被分配去照看最危险的实验体。隔着玻璃，他盯着你。",
    "你第一次走进那个收容室，他蜷缩在角落，听到门声后抬起头。",
    "实验室停电，隔离门失效。黑暗中，你听到他的呼吸声越来越近。",
    "你端着食物靠近他，他突然抓住了你的手腕。",
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
  'controller-obsessed': 'danger',
  'rival-love-hate': 'danger',
  'rival-justice': 'danger',
  'villain-ruthless': 'danger',
  'villain-elegant': 'danger',
  'villain-fallen': 'danger',

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
