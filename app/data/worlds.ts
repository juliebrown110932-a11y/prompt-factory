import type { WorldMother } from './schema';

export const WORLDS: WorldMother[] = [
  {
    id: 'modern',
    label: '现代都市',
    tagline: '光亮从不照进所有角落——每盏霓虹下都有不同的规则。',
    summary:
      '这是一座不眠的城市。白天的秩序由制度维持，夜晚的混乱由欲望支配。有人追逐名望，有人藏身角落苟活。爱情在这里既是奢侈品，也是交易筹码。所有人都在表演，唯有情感失控才是真实的瞬间。',
    children: [
      { id: 'modern.light', label: '光明线', branchBrief: '日常现实与人性温度的舞台：办公室、咖啡馆、落日与霓虹。' },
      { id: 'modern.dark',  label: '暗黑线', branchBrief: '权力与秘密的高压世界：阶层壁垒、家族博弈、欲望游戏。' },
      { id: 'modern.mafia', label: '黑道Mafia', branchBrief: '暴力秩序与血色浪漫，忠诚是唯一信仰。' },
    ],
  },
  {
    id: 'campus',
    label: '校园/学园',
    tagline: '青春是最温柔的武器，理想与秘密都藏在制服里。',
    summary:
      '这里是初遇与成长的舞台。在操场阳光、学生会阴影与深夜教室之间，关系被试探、被掩饰、被揭开。一场考试、一次意外、一句未说出口的"喜欢"，足以改变命运。',
    children: [
      { id: 'campus.normal', label: '普通线', branchBrief: '平凡校园的真实与青涩：友情、暗恋，与自我和解。' },
      { id: 'campus.elite',  label: '特权线', branchBrief: '名门学园与出身差距，恋爱是一场秘密游戏。' },
    ],
  },
  {
    id: 'court',
    label: '西幻/宫廷',
    tagline: '王权、阴谋与誓言交织的国度，爱常是最危险的叛逆。',
    summary:
      '帝国的辉煌掩盖着血的代价。骑士为信仰而战，贵族为权力而婚，魔法与阴谋共舞。在金碧辉煌的宫殿与昏暗密室之间，每一句"我爱你"，都可能是一场布局。',
    children: [
      { id: 'court.intrigue', label: '权谋', branchBrief: '政治斗争、贵族婚姻、宫廷密谋：爱是筹码，也是反抗。' },
      { id: 'court.magic',    label: '魔法', branchBrief: '巫师、契约、神明低语：禁术背后总有代价。' },
    ],
  },
  {
    id: 'future',
    label: '赛博/星际',
    tagline: '当人类用数据定义情感，机器也开始学会心动。',
    summary:
      '未来都市闪烁霓虹与金属之光。科技取代信仰，记忆可被编辑，情感可被模拟。在代码与星海之间，身份与意识的界线逐渐模糊。',
    children: [
      { id: 'future.cyber', label: '赛博朋克', branchBrief: '记忆篡改、义体改造、系统监控下的禁恋。' },
      { id: 'future.abo',   label: '星际ABO', branchBrief: '帝国秩序与天生羁绊，无法逃避的本能。' },
    ],
  },
  {
    id: 'apoc',
    label: '废土末世',
    tagline: '在废墟里活下去，比爱更难。',
    summary:
      '文明坍塌后法则重写。生存成为唯一信仰，血、尘土与孤独交织成新的秩序。在荒原的风中，依赖比子弹更致命。',
    children: [
      { id: 'apoc.survival', label: '生存', branchBrief: '资源争夺、联盟与背叛：绝境里的守护与抉择。' },
      { id: 'apoc.virus',    label: '病毒', branchBrief: '感染与恐惧之间的温柔，是最后的人性。' },
    ],
  },
];
