'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function XuePage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 500], [1, 0])
  const scale = useTransform(scrollY, [0, 500], [1, 0.8])
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedAlbum, setSelectedAlbum] = useState<(typeof albums)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isModalOpen])

  const albums = [
    {
      title: '守村人',
      year: '2024-11-22',
      desc: '第二十一张专辑',
      cover: 'https://pic1.imgdb.cn/item/6809e15458cb8da5c8c862c9.jpg',
      songs: [
        '守村人',
        '银河少年',
        'AI',
        'Nothing',
        '崇拜',
        '情书',
        '租购',
        '解解闷',
        '在那天回不去的路上',
        '念'
      ],
      intro:
        '孤行不问回头路 守村莫忘天地游\n' +
        '因为珍贵 所以不忘 世间无语 时间有雨\n' +
        '船长去路已远 守村可有星光 进退一念之间 远近都是孤单\n' +
        '少年望眼欲穿 返老不如流放\n' +
        '仔细听 下一个人的脚步声\n' +
        '嗡嗡作响\n' +
        '守着不肯输拿桩镇守村落的勇敢守村人\n' +
        '守着不怕痛一心拯救世界的漂浮银河少年\n' +
        '守着不够快世界的独一无二按键编码的AI妖怪\n' +
        '守着不一定能呼喊某一次得到或失去了光阴的Nothing\n' +
        '守着不幼稚就没法成为童话的决心是否能在火中开花的崇拜\n' +
        '守着不善于寄送只能隐约落笔而终于上瘾孤柱一掷的情书\n' +
        '守着不怪谁但与某某曾经摇摇欲坠诉说天长地久的租购\n' +
        '守着不认真可是唬人竞速飘移但求多瞧一眼尾灯的解解闷\n' +
        '守着不回去而结拜一两位孤魂野鬼无畏举杯的在那天回不去的路上\n' +
        '守着不丢脸的那句抱歉去对抗世界换来放下尊严的念\n' +
        '十种守 十个村 十类人\n' +
        '九样人生 九句金言 九问世间\n' +
        '八方追真梦 八段任我行 八趟过山车\n' +
        '七枚命运指环 七双友情筷子 七只陶瓷酒杯\n' +
        '六类孤单的游戏 六对亲密的陌路 六页困局的情书\n' +
        '五小时数码谜语 五分钟黑白对奕 五秒钟思考生命\n' +
        '四张红绿筹码 四桢考古残卷 四片枯黄树叶\n' +
        '三天恨情歌 三月曾来过 三年望日月\n' +
        '二人世界 二次人生 二手寂寞\n' +
        '一棵树 一张脸 一颗心\n' +
        '去时不知天宽地阔 来时不觉泪眼如雨\n' +
        '攻其不备 守于无畏'
    },
    {
      title: '无数',
      year: '2022-09-20',
      desc: '薛之谦第二十张专辑',
      cover: 'https://pic1.imgdb.cn/item/6809e25c58cb8da5c8c863a7.png',
      songs: [
        '无数',
        '凤毛麟角',
        '变废为宝',
        '你不是一个人',
        '可',
        '男二号',
        '守候',
        '洛城',
        '被人',
        '关于你'
      ],
      intro:
        '无数的我们在墨黑的世界被压缩成一枚黑团\n' +
        '无声的对峙虐待自己的孤单\n' +
        '无用的大喊苦苦等到的回声只是力气放尽的绝望\n' +
        '无光的天空告诉不了地球人类任何一种渺小可能的远方\n' +
        '无光的星空告诉不了地球人类任何一种渺小可能的远方\n' +
        '无语的季节中你我的眼泪养不活绿芽尖的希望\n' +
        '无边的压抑最后似乎隐约点燃躲在内心仅存的摇滚冥想\n' +
        '无知的黑云在信念的边界挑战平静的月亮\n' +
        '无人的海边哪里需要什么海浪\n' +
        '无泪的憋屈缝成了一张隐形披风偶而还能抵挡酷寒\n' +
        '无双的爱情有可能只是失忆者的幻想\n' +
        '无路的森林也许终点会有一线施舍给旅人的阳光\n' +
        '无数 没把光放进口袋的旅行者 蒙着眼 冥想下一个故事 会有一艘名叫远方的船\n' +
        '听说 能一边走一边呑下这枚带了苦味名叫无助的灵丹妙药\n' +
        '还能勇敢挺进的人凤毛麟角\n' +
        '当时 她塞给我一双在缺氧天空逃生的翅膀\n' +
        '却没说 变废为宝的那些摔破的曾经 如今降落在哪\n' +
        '后来 雨声学会了弹钢琴 喊着 别怕 你不是一个人\n' +
        '一滴一滴各自代表 亲情 爱情 友情 无情 终于 敲进 人心深海 最后被蒸发\n' +
        '你问 可有一部无散场的电影 可来一次不虚假的试镜\n' +
        '可能在伦敦之眼赏星 可去纪念那年下雪的北京 我说 可\n' +
        '等到 登机证在掌心 似乎察觉自己挺像男二号的杀青终局\n' +
        '眼泪 叹气 对戏 入定\n' +
        '下一次开镜 以后什么表情 不知道 没关系\n' +
        '那么 坚持的一颗心还在守候什么 问问天空 我们是不是往事的对手\n' +
        '似乎 多年前我和她在泛着光晕中的洛城失去联络\n' +
        '好一段渗入细胞然后熵减的光阴 头也不回的遇见 热烈 无言 痊愈\n' +
        '之后 我懂了 一个人 在旅途中被人喊了一声 也并不会成为 我们\n' +
        '多谢 这一路竟然如此安静 所以来点故事 既使单独关于你 也行\n' +
        '无数的悲伤从心而降 往心海坠落成敲碎理智的千斤重担\n' +
        '无路可逃的自我只能在半空中自弹自唱 无畏无惧 孤芳自赏\n' +
        '无眠蹲在黑暗里等待 那些万中无一绣上微光的希望\n' +
        '薛之谦的第 12 号初秋奏鸣曲'
    },
    {
      title: '你不是一个人',
      year: '2022-08-18',
      desc: '薛之谦第十九张专辑',
      cover: 'https://pic1.imgdb.cn/item/6809e1de58cb8da5c8c86338.png',
      songs: ['你不是一个人'],
      intro:
        '星河在天，回旋白光闪烁\n' +
        '印于心口，不问来往何方\n' +
        '“ 情歌王子 ”张信哲与薛之谦首度合作全新单曲《你不是一个人》\n' +
        '一向擅长演绎情歌的两位歌手，此次合作将创作中的情感以“镜像”的概念呈现 , 突破以往合唱歌曲惯有的互动演绎模式 , 两位歌手并非在互唱深刻的的情感 , 更像是共谱一场充满层层惊喜的乐音互动 , 以镜像般“反射”式的声线交错带来丰富的感官享受 !\n' +
        '在演唱的诠释上 , 张信哲细腻明亮却坚定有力 , 薛之谦深邃诚挚饱满着叙事张力，两人以强烈的、执着的嗓音，为听者带来细腻却带有温度的炙热情感。\n' +
        '人声鼎沸，寂寞着炽热的灵魂，\n' +
        '人山人海，陌生着彼此的身影。\n' +
        '身处情感漩涡中的每个人，简单也坎坷地踏上人生的路途，我们一起不得要领的奋力狂奔，肆意张扬着心中的笃定，小心翼翼着脚下的荆棘。\n' +
        '时间在变，所追求的一切总有答案。每个人或许都曾在此处迷茫，\n' +
        '但始终，都不是一个人。\n' +
        '《你不是一个人》由薛之谦与新世代音乐人胡斯汉共同创作，编曲透过如薄雾般的电气层次感，以钢琴键入音乐与情感的氛围，吉他、打击乐器与弦乐等元素仿若情感的旁观者，将情绪框架不断推强，展现在深情之外对于真爱一往无前的勇气 , 坚定不移为前行架海擎天的信念！'
    },
    {
      title: '天外来物',
      year: '2020-12-31',
      desc: '薛之谦第十八张专辑',
      cover: 'https://pic1.imgdb.cn/item/6809e1aa58cb8da5c8c86305.jpg',
      songs: [
        '天外来物',
        '迟迟',
        '把你揉碎捏成苹果',
        '野心',
        '彩券',
        '不爱我',
        '潘金莲',
        '耗尽',
        '小尖尖',
        '纸船'
      ],
      intro:
        '薛之谦 2020 天外来物\n' +
        '天外本无物\n' +
        '因爱惹情埃\n' +
        '2020 软禁万物于时空胶囊 一人一心 仰望天外求旷世奇珍\n' +
        '无视身上的记忆条形码 无畏时间的透明框架\n' +
        '我们依然聚在人间的乌云中任性等待洁白的音乐初雪\n' +
        '如果真心像彩券漂移人间 你爱我不爱我就像空气若有似无\n' +
        '耗尽所有精神 无奈没有归途\n' +
        '蓝色纸船漂浮在无字的银河 没有人应该私自以为非我不可\n' +
        '复古的月牙小尖尖 是一滴鲁珀特之泪\n' +
        '虚实相依 无量无形\n' +
        '最初无数酸甜往事的纪念品 最后都是念念不忘的违禁品\n' +
        '迟迟没有顿悟的心耳 无法听见潘金莲的梦境诉说\n' +
        '既使苦中把你揉碎捏成苹果作乐 又怎能按捺丘比特的野心勃勃\n' +
        '思念如此前后纵横穿梭于心 音符难怪经纬相恋如影随形\n' +
        '天 外 飞 来 物\n' +
        '外 天 飞 物 来\n' +
        '飞 飞 飞 飞 飞\n' +
        '来 物 飞 天 外\n' +
        '物 来 飞 外 天\n' +
        '薛之谦冬日箴言 飞来 续命'
    },
    {
      title: '一首歌一个故事',
      year: '2020-09-17',
      desc: '薛之谦第十七张专辑',
      cover: 'https://pic1.imgdb.cn/item/6809e1de58cb8da5c8c86339.png',
      songs: [
        '致我们终将逝去的青春 (2020重唱版)',
        '世界上不存在的歌 (2020重唱版)',
        '清风徐来 (2020重唱版)',
        '这就是命 (2020重唱版)',
        '像小强一样活着 (2020重唱版)',
        '我一定会回来的 (2020重唱版)',
        '守候 (2020重唱版)',
        '天灵灵 (2020重唱版)',
        '万万 (2020重唱版)',
        '悟空传 (2020重唱版)',
        '给妈咪 (2020重唱版)',
        '塑料袋 (2020重唱版)',
        '方的言 (2020重唱版)'
      ],
      intro:
        '【听】一首歌\n' +
        '【说】一个故事\n' +
        '赵英俊某些作品重唱企划\n' +
        '聚合13位华语乐坛优秀音乐人  数组幕后音乐制作团队鼎力支持\n' +
        '重新演绎【电影票房吉祥物】赵英俊的走心之作\n' +
        '****\n' +
        '2020年，有种感受特别强烈，就是总觉得自己有些歌，值得被再唱一遍的，就像每首歌的背后都藏着一个故事，换一个讲述者，便会有不同的感受，熟悉且意外。这个想法由最初的一个念叨，变成今天这般阵仗，受宠若惊的同时，也感叹这是何等的传奇。中间那些可遇而不可求的事，和那些我要永恒感激的人，都留给我来慢慢讲述吧，而每首歌曲背后的故事，也就是那些我创作的前提和依据，请沉醉在每位艺术家重新演绎的时候，再听我娓娓道来。\n' +
        '故事，是生活的比喻——罗伯特.麦基\n' +
        '一首歌，一个故事，你准备好了吗？\n' +
        '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0——赵英俊\n' +
        '****\n' +
        '盛夏，在电影院逐步恢复元气的时刻\n' +
        '让我们先回味一下这些属于大银幕的悠然之音    回想那些一幕幕闪过的美好时刻'
    },
    {
      title: '尘',
      year: '2019-12-27',
      desc: '薛之谦第十六张专辑',
      cover: 'https://pic1.imgdb.cn/item/6809e2fa58cb8da5c8c86430.png',
      songs: [
        '木偶人',
        '慢半拍',
        '这么久没见',
        '笑场',
        '病态',
        '尘',
        '陪你去流浪',
        '配合',
        '环',
        '聊表心意'
      ],
      intro:
        '薛之谦 第十张实体唱片《尘》\n' +
        '音乐十年 一《尘》释出\n' +
        '薛之谦第十张专辑《尘》 正式发行\n' +
        '尘世堆砌成沙 模糊鹿与马\n' +
        '世人多曆风雨 无意真与假\n' +
        '病态的时代里 配合谎与花\n' +
        '未来总有期许 守护爱无价\n' +
        '薛之谦2019发行第十张专辑《尘》，专注音乐内涵的思考，以及音乐性与视觉的高度融合，将音乐的抽象语言引入视觉体验，定格时间的艺术。专辑封面由几何图形构成，以抽象风格表达思想内涵，加入数字、字母、几何边框等图像形式，寓意“薛之谦的第十张专辑”。而概念化处理的“沙丘”、突出的“鹿”和“马”元素，黑色与红色的色彩对比，则寓意尘世的繁複庞杂与现实是非混淆的境况，矛盾但充满希望。视觉创意与音乐内涵相映成彰，充满思辨意味，赋予旋律更为深刻的哲学意蕴。\n' +
        '他 以音乐灵魂\n' +
        '探讨现世各式命题'
    },
    {
      title: '为了遇见你',
      year: '2019-07-03',
      desc: '薛之谦第十五张专辑',
      cover: 'https://pic1.imgdb.cn/item/6809e1ca58cb8da5c8c8631e.jpg',
      songs: ['为了遇见你'],
      intro: ''
    },
    {
      title: '怪咖',
      year: '2018-12-31',
      desc: '薛之谦第十四张专辑',
      cover: 'https://pic1.imgdb.cn/item/6809e40758cb8da5c8c86532.png',
      songs: [
        '摩天大楼',
        '怪咖',
        '肆无忌惮',
        '狐狸',
        '天份',
        '最好',
        '醒来',
        '哑巴',
        '那是你离开了北京的生活',
        '违背的青春'
      ],
      intro:
        '何为怪咖？\n' +
        '是霓虹幻影后面嬉笑怒骂的群像？\n' +
        '是风平浪静里面歇斯里地的疯狂？\n' +
        '不是平庸的平庸，不是普通的普通，怪咖不怪，只是被人们理解为意义上的“怪”\n' +
        '长年累月的麻木，按部就班的旋转，\n' +
        '抹掉了鲜艳，砍掉了棱角\n' +
        '按下了恣意生长的姿态\n' +
        '凝固了开怀上扬的嘴角\n' +
        '放弃挣扎，丢掉筹码，仰望着惩罚\n' +
        '时代之宽广，生命之深远，\n' +
        '从未定义谁，应该生长为流水线上既定的模样。\n' +
        '逆行的路上绝非孤身一人，\n' +
        '声音的方向正在同化顺流的尽头。\n' +
        '规整的框架给予我们明辨是非的眼睛，\n' +
        '躁动的时代吸纳你们千变万化的心声\n' +
        '嘈杂之下掩盖着别样的璀璨，用心感受，或许共鸣\n' +
        '你听……'
    },
    {
      title: '渡',
      year: '2017-11-28',
      desc: '薛之谦第十三张专辑',
      cover: 'https://pic1.imgdb.cn/item/6809e1de58cb8da5c8c86337.jpg',
      songs: [
        '动物世界',
        '暧昧',
        '像风一样',
        '高尚',
        '骆驼',
        '别',
        '火星人来过',
        '背过手',
        '渡',
        '我害怕'
      ],
      intro:
        '2017年华语音乐圈最受期待唱片作品\n' +
        '全能唱作奇才薛之谦掏心力作 \n' +
        '昨日渡往明日\n' +
        '从回忆渡往梦想\n' +
        '从现实渡往幻境\n' +
        '薛之谦【渡 The Crossing】正式发行\n' +
        '献给所有风雨同路的渡人们\n' +
        '薛之谦 郭顶 赵靖 郑伟 周以力 甘世佳 陈迪 韩星洲 赵英俊 张宝宇\n' +
        '华语音乐圈顶级阵容打造薛之谦又一经典神专【渡 The Crossing 】\n' +
        '献给风雨同路的渡人们\n' +
        '历时整整三个月的薛之谦【我好像在哪见过你】演唱会，在几乎十个城市留下足迹，也在广大歌迷朋友心中留下完美的印记。薛之谦的音乐实力和人气魅力持续延烧。演唱会前后陆续曝光的歌曲如「动物世界」、「暧昧」、「高尚」、「我害怕」、「火星人来过」等等风格迥异但同样精彩的单曲在音乐圈引起热烈回响。为了让支持薛之谦的歌迷朋友可以完整拥有这些单曲，此次新专辑【渡 The Crossing】重新收录已曝光的这些歌曲，再加收了全新创作的新歌如「渡」、「别」、「像风一样」、「骆驼」与「背过手」。专辑音乐人阵容除了薛之谦贡献了多首词曲佳作之外，也囊括了诸位一线音乐人前来打造。计有郭顶、赵靖、郑伟、周以力、甘世佳、陈迪、韩星洲、赵英俊、张宝宇等大师级大将打造薛之谦全方位音乐风貌。无论是华丽宁静的「渡」、都市寓言「骆驼」，抑或薛情歌如「我害怕」、「像风一样」、「别」，都力求做到精致入微！这张新专辑忠实纪录了薛之谦这一路走来的心情轨迹，也作为一份诚意满满的礼物，献给一直与它风雨同路的你们！\n' +
        '金曲奖视觉强手苏益良与方序中联袂呈现薛之谦【渡 The Crossing】专辑美学完美刻画了禅意渗透及内涵丰盈的全新薛之谦\n' +
        '薛之谦的最新专辑【渡 The Crossing】的封面视觉邀请了台湾最顶尖的美术团队-设计匠人方序中与摄影大师苏益良精心打造。专辑封面中的薛之谦以神秘摆渡人的姿态现身。拍摄当天美术团队精心订制了一艘一等一比例的大船，作工精美绝伦，犹如好莱坞电影场景。薛之谦身穿黑色神秘风格的高级订制服完美诠释了一个在辽阔汪洋中等待渡人的寂寞摆渡人。摄影现场特意布置了烟雾弥漫的虚幻世界，让现场工作人员有如置身世外仙境般。此次视觉团队紧抓着孤独遗世的摆渡人的这个主轴，辅以设计师想透露的玄妙禅意，打造一个你从未见过，更成熟内敛的薛之谦。专辑内页另一组照片则以数字射灯为主要元素，让薛之谦在万丈光芒的折射下表演内心的孤独感。谈起云雾袅袅的视觉效果，苏益良与方序中大师异口同声表示他们想要透露的讯息除了是“渡”这首歌的意涵以外，也暗藏了“真相藏在云雾中”这个概念，往往唯有心如明镜才会看得到事情最原始的样貌。\n' +
        '他还是要继续唱歌给你听\n' +
        '薛之谦2017年末首播微酸单曲「别」\n' +
        '触动你心里最柔软的地方'
    },
    {
      title: '来日方长',
      year: '2016-09-12',
      desc: '薛之谦第十二张专辑',
      cover: 'https://pic1.imgdb.cn/item/6809e1d758cb8da5c8c86330.jpg',
      songs: ['来日方长'],
      intro:
        '薛之谦黄龄携手献唱冯导新作  《我不是潘金莲》推广曲全网上线\n' +
        '冯导新作《我不是潘金莲》推广曲首发  薛之谦黄龄默契演绎《来日方长》\n' +
        '近日，由女神范冰冰领衔主演，郭涛、大鹏、张嘉译、于和伟、张译、李宗翰、赵立新、范伟、刘桦等“大叔级”实力派演员倾情加盟，根据刘震云同名小说改编，由著名导演冯小刚执导的喜剧电影《我不是潘金莲》即将上映，影片方圆版推广曲《来日方长》也于今日全网上线。\n' +
        '超人气“段子手”薛之谦携手实力唱将“转音歌姬”黄龄亲情演绎。歌曲由著名音乐人常石磊担任制作人并领衔创作，而薛之谦黄龄这对“老搭档”的深情与默契也在歌曲中展露无遗，细腻而温暖，轻呢而悠然，弥漫着缓缓时光的醇静味道。'
    },
    {
      title: '初学者',
      year: '2016-07-18',
      desc: '薛之谦第十一张专辑',
      cover: 'https://pic1.imgdb.cn/item/6809e34458cb8da5c8c86457.jpg',
      songs: [
        '初学者',
        '刚刚好',
        '我好像在哪见过你',
        '演员',
        '绅士',
        '一半',
        '小孩',
        'Stay Here',
        '花儿和少年',
        '下雨了'
      ],
      intro:
        '2016年华语乐坛杀出重围冠军作\n' +
        '薛之谦 《初学者》\n' +
        '重拾初心 勇往直前\n' +
        '在梦想丛林抱持初生之勇\n' +
        '做变幻世界最后的初学者\n' +
        '7/17 正式发行\n' +
        '亚洲最火的段子手薛之谦 不忘初心强势回归乐坛\n' +
        '薛之谦、郑伟、赵英俊、李荣浩、郭顶等等王牌音乐人联手制作\n' +
        '2016年华语乐坛杀出重围冠军作－《初学者》'
    },
    {
      title: '一半',
      year: '2015-10-19',
      desc: '薛之谦第十张专辑',
      cover: 'https://pic1.imgdb.cn/item/6809e34258cb8da5c8c8644e.jpg',
      songs: ['一半', '小孩', 'Stay Here'],
      intro:
        '2015 1/2的薛之谦 EP 《一半》\n' +
        '纪念我倔强的性格 已逝的爱情\n' +
        '一半的我，不完整，\n' +
        '一半的人生，差一半。\n' +
        '一半的我用心的唱故事给你听，\n' +
        '一半的你是否能够感知到？\n' +
        '《一半》的我很逞强，一半的我是个《小孩》，只希望你《stay here》，不要离开。\n' +
        '2015年正式签约海蝶音乐的薛之谦，比起以往多了一个制作人的身份，也就有了更多参与自己音乐制作的空间。此张EP取名《一半》，也是2015年度薛之谦出的第二张EP大碟。这张EP同上一张一样，也由薛之谦亲自担任制作人，做起自己的音乐来也就格外用心。这张EP里收录了他精心演绎的三首新歌：《一半》、《stay here》和《小孩》。\n' +
        '成年的世界里，爱有时候没有绝对的完整。爱一半，伤一半，再骄傲的人，也有说不出的话语和隐痛的伤口。或许能像孩童那般纯粹地去爱，便不再会有如此复杂的心绪。这三首歌，不是普通的感怀伤秋，也不是为了写歌而写歌所诞生的EP，历经时间的洗礼，薛之谦终于将过去的情感伤痛放下，也终于能够将它们呈现在歌里。纯粹、悲伤、决绝、挣扎、怀念、遗憾……他唱出了男人的爱，男人的痛，以及男人内心深处温情的柔软角落。\n' +
        '薛之谦在这张EP中担任了两首歌的词，一直对音乐认真到有点“处女座”的他，此次也同样怀着十二分的专注。不光是选到了自己中意的曲，他反复琢磨、通宵达旦写出的《一半》和《stay here》，也在里面注入了自己的真实感触；而当听到郭顶词曲的《小孩》，更是觉得符合了自己的心境。有时候男人就像一个小孩，一个长不大的小孩。\n' +
        '于是，真实的故事用真情唱，当你听到谦谦的情歌，也不由心中一痛。时而忍不住去猜，究竟是怎样，造就了如今的薛之谦。这个倔强的男人，用自己逝去的真实情感经历，惹掉了无数人的眼泪。'
    },
    {
      title: '绅士',
      year: '2015-06-05',
      desc: '薛之谦第九张专辑',
      cover: 'https://pic1.imgdb.cn/item/6809e34158cb8da5c8c8644d.jpg',
      songs: ['演员', '绅士', '下雨了'],
      intro:
        '当那背影离去 仿佛也可以 脱下礼帽 深情致敬 全唱作把『心』交出来 最认真的 薛之谦 再次穿越感官最后防线突破抑制 尽情泪流 2015全唱作 NO.7概念EP『绅士』6/5 海蝶音乐诚意发行 从带上面具的《丑八怪》到摘下礼帽的《绅士》 这，都是薛之谦 这，都是用优雅到极限来诠释伤悲的爱情寓言 3首全唱作谦谦情歌 令每一个爱过的人都痛到慰藉 让每一个爱着的人也为之黯然 出道10年，2015年正式签约海蝶音乐，首次担当制作人的薛之谦，包揽了这张概念EP的所有词曲，仅3首唱作曲目，但是100%的薛之谦。从上一张专辑到《绅士》经历了19个月，往返北京、上海、台北……好好做“音乐”是薛之谦最认真的梦想，不遗余力，甚至有些强迫症。 从《认真的雪》到《你还要我怎样》，薛之谦的情歌，听着总是让人不由的纠结和悲伤。“相对于作曲，我更加喜欢填词。”这一次作为EP总制作人的他，是这样评价自己的。 “在爱情面前，我不是一位《演员》，但愿成为一名《绅士》。” 翻开歌词本，带上耳机，听完这三首歌，你会发现，这里住着一位“心里下着雨”的薛之谦。'
    },
    {
      title: '意外',
      year: '2013-11-11',
      desc: '薛之谦第八张专辑',
      cover: 'https://pic1.imgdb.cn/item/6809e34258cb8da5c8c86450.jpg',
      songs: [
        '丑八怪',
        '意外',
        '你还要我怎样',
        '有没有',
        '潮流季',
        '等我回家',
        '我想起你了',
        '其实',
        '方圆几里',
        '方圆几里（吉他版）'
      ],
      intro:
        '人生本就是一场意外，纵横交错的际遇遍布着生活的每个角落。\n' +
        '每天都在遇见不同的人，经历不同的风景，行走不同的轨迹。\n' +
        '面对未知的生活，我们一直都在寻寻觅觅中快步疾行，很多人擦身而过，很多事过眼烟云。抓不住，放不下，在患得患失中我们不停地迷失、遗忘、错过。\n' +
        '你惧怕意外吗？还是害怕无法预料的将来？\n' +
        '我们常常否定现状，假设未来。但生活依旧不断前行。\n' +
        '遇见你是一场意外，但是如果没有遇见你，我又将去往何方？\n' +
        '一个人去静静流浪，亦或颠覆过往，来一回彻底的刺激疯狂。\n' +
        '沿途风景匆匆倒退，当一切终归尘埃落定，\n' +
        '你是否还会站在原处，陪我一起看那最初的风景。\n' +
        '一本书上曾说：旅行，能让你遇见那个更好的自己。\n' +
        '对于正式步入而立之年的薛之谦来说，“人气偶像”、“内地乐坛音乐才子”、“乐坛情歌王子”以及“薛老板”的种种头衔，是外界的口碑肯定也是薛之谦本人不断努力的成果。\n' +
        '其实，一直以来，薛之谦都在暗自寻求着改变。\n' +
        '薛之谦不是只会唱歌，于是他在演唱会上跳起了劲舞。\n' +
        '薛之谦不是只会当艺人，于是他下海经商还大获成功。\n' +
        '但是，音乐始终，是他的一生执着。于是这次，他想要改变更多，发自内心的，一次重新自省，一种重新认识。\n' +
        '依旧是娓娓道来的“薛氏情歌”，依旧是深情执着的音乐才子\n' +
        '但更豁达，更成熟，更态度，一个完完全全的更好的薛之谦。'
    },
    {
      title: '方圆几里',
      year: '2012-12-27',
      desc: '薛之谦第七张专辑',
      cover: 'https://pic1.imgdb.cn/item/6809e34e58cb8da5c8c8645a.png',
      songs: ['方圆几里', '方圆几里（吉他版）'],
      intro: '薛之谦2013年全新单曲\n' + '年度催泪巨弹 微电影《最熟悉的陌生人》主题曲'
    },
    {
      title: '几个薛之谦',
      year: '2012-08-15',
      desc: '薛之谦第六张专辑',
      cover: 'https://pic1.imgdb.cn/item/6809e35058cb8da5c8c8645c.png',
      songs: [
        '我知道你都知道',
        '几个你',
        '伏笔',
        '为什么',
        '我终于成了别人的女人',
        '敷衍',
        '我们爱过就好',
        '楚河汉界',
        '为了遇见你'
      ],
      intro:
        '《几个薛之谦》于7月17日生日当天发行，其中第二波深情主打《我知道你都知道》全面曝光，这首薛之谦的最新创作歌曲也被湖南卫视最新大戏《胜女的代价》收为主插曲，随着剧情的铺垫将逐渐带领观众入戏。'
    },
    {
      title: '我们爱过就好',
      year: '2010-10-31',
      desc: '薛之谦第五张专辑',
      cover: 'https://pic1.imgdb.cn/item/6809e38558cb8da5c8c86471.png',
      songs: ['我们爱过就好'],
      intro: ''
    },
    {
      title: '未完成的歌',
      year: '2009-12-11',
      desc: '薛之谦第四张专辑',
      cover: 'https://pic1.imgdb.cn/item/6809e39758cb8da5c8c86497.png',
      songs: [
        '未完成的歌',
        '我的雅典娜',
        '传说',
        '马戏小丑',
        '你过得好吗',
        '红尘女子',
        'Memory',
        '倾城',
        '我们的世界',
        '给我的爱人',
        '爱的期限',
        '黄色枫叶',
        '认真的雪',
        '爱我的人 谢谢你'
      ],
      intro:
        '创作小天王薛之谦 即将于秋末发行自己的第一张个人新歌加精选专辑，首播个人创作主打歌《未完成的歌 》CD版。《未完成的歌 》是薛之谦逾一年的创作，甚至创作早于上张专辑的同名主打歌《深深爱过你》，而为何迟迟没有发表，薛之谦 表示：“一直没有很好的词来配合这首曲，所以我一直在等，终于等到让我觉得感动的歌词。 '
    },
    {
      title: '深深爱过你',
      year: '2008-11-26',
      desc: '薛之谦第三张专辑',
      cover: 'https://pic1.imgdb.cn/item/6809e39558cb8da5c8c86493.png',
      songs: [
        '传说',
        '深深爱过你（前世）',
        'Let You Go',
        '给我的爱人',
        '我们的世界',
        '流星的眼泪',
        '星河之役',
        '深深爱过你（今生）',
        '梦开始的原点'
      ],
      intro:
        '薛之谦 2008全新个人创作专辑《深深爱过你》11月26日震撼发行\n' +
        'CD集合了全媒体PK热曲之专辑同名主打《深深爱过你》前世、今生双版本，各电台榜首之中国风单曲《传说》，薛之谦首度尝试韩国劲爆热舞曲目《Let You Go》《星河之役》 重新演绎上张专辑主打歌曲《苏黎世的从前》回响奥运曲目《梦开始的原点》等。DVD更收录3支情歌MV，《深深爱过你》前世、今生MV感人情节延续上演。'
    },
    {
      title: '你过得好吗',
      year: '2007-07-31',
      desc: '薛之谦第二张专辑',
      cover: 'https://pic1.imgdb.cn/item/6809e39458cb8da5c8c86491.png',
      songs: [
        '苏黎世的从前',
        '你过得好吗',
        '爱情宣判',
        '朋友你们还好吗',
        '爱的期限',
        '马戏小丑',
        '倾城',
        '丢手绢',
        '续雪',
        '你过得好吗(伴奏)'
      ],
      intro:
        '薛之谦黄龄携手献唱冯导新作  《我不是潘金莲》推广曲全网上线\n' +
        '冯导新作《我不是潘金莲》推广曲首发  薛之谦黄龄默契演绎《来日方长》\n' +
        '近日，由女神范冰冰领衔主演，郭涛、大鹏、张嘉译、于和伟、张译、李宗翰、赵立新、范伟、刘桦等“大叔级”实力派演员倾情加盟，根据刘震云同名小说改编，由著名导演冯小刚执导的喜剧电影《我不是潘金莲》即将上映，影片方圆版推广曲《来日方长》也于今日全网上线。\n' +
        '超人气“段子手”薛之谦携手实力唱将“转音歌姬”黄龄亲情演绎。歌曲由著名音乐人常石磊担任制作人并领衔创作，而薛之谦黄龄这对“老搭档”的深情与默契也在歌曲中展露无遗，细腻而温暖，轻呢而悠然，弥漫着缓缓时光的醇静味道。'
    },
    {
      title: '薛之谦',
      year: '2006-06-09',
      desc: '薛之谦首张专辑',
      cover: 'https://pic1.imgdb.cn/item/6809e38258cb8da5c8c86470.jpg',
      songs: [
        '王子归来',
        '认真的雪',
        '红尘女子',
        '爱不走',
        '快乐帮',
        '我的Show',
        '黄色枫叶',
        '钗头凤',
        'MEMORY',
        '我的Show(伴奏)'
      ],
      intro:
        '⊙我型我SHOW"人气天王 2006年乐坛最具爆发力的"新优质偶像" \n' +
        '⊙数码行业的领导品牌--爱国者近日将与中国最大的家电零售连锁企业--国美电器，联手举办以“爱我 爱正版”为主题歌友签售会，签售会将于2006年6月18日在国美电器白石桥店举行。届时，人气偶像薛之谦将出席此次签售会，为广大歌迷朋友带来其最新专辑。另外，爱国者下属的爱国者数码音乐网、爱国者数码音频等部门将参与该次活动，明星产品如"视尚MP3太阳镜F566"也将在活动中亮相。 \n' +
        '⊙作为时尚音乐的代表力量，薛之谦自出道以来便让数以万计的歌迷朋友们关心着迷，帅气外表、创作天赋和深情表演是薛之谦的必杀三计，不论爱才或爱貌，全面俘获。在拿到东方风云榜之东方新人银奖之后，谦迷们齐聚，誓要帮助偶像夺下百事音乐风云榜最受欢迎男歌手，而薛之谦则谦然表示身为新人并非以拿奖为目的，更重要的是积累和学习。不是冠军，却有实力聚集巨大人气；未发专辑，却已入围最强阵容。 \n' +
        '⊙薛之谦在最近推出的新书《谦君一发》大获成功之后，便紧锣密鼓地进行此次签售会的相关工作。据悉，各地的"谦丝"们已经迫不及待，为与自己偶像的见面作着最后的准备。作为一名新生艺人，薛之谦可以说是利用其得天独厚的优势迅猛飞速成长，人气一路看涨。此次，薛之谦将为广大歌迷朋友们带来其最新同名专辑《薛之谦》，据薛之谦介绍，新专辑共收录了9首歌曲，其中6首为个人原创，以慢歌为主。除了《黄色枫叶》、《王子归来》和《认真的雪》之外，专辑中还收录了他和君君合唱的《MY SHOW》。 \n' +
        '⊙在此次歌友会活动中，主办方之一的爱国者数码音乐网为诸多音乐爱好者尤其是"谦"迷们准备了大量的优秀数码产品和歌友会门票。只要您在6月18日之前购买爱国者数码音乐网99元点卡一张，即可获得薛之谦演唱会门票一张；或者购买爱国者数码MP3-F566（眼镜）即可获得薛之谦演唱会门票两张。鉴于门票数量有限，想零距离接触偶像的朋友们需抓紧抢票。 \n' +
        '⊙音乐使我陶醉，偶像让人痴迷，2006年6月18日，除了万众期待的新专辑外，还要你擦亮眼睛，见证一个全新人气偶像的成长。'
    }
  ]

  const concert = [
    {
      src: 'https://pic1.imgdb.cn/item/6809e6cf58cb8da5c8c8663f.png'
    },
    {
      src: 'https://pic1.imgdb.cn/item/6809e6cf58cb8da5c8c8663e.png'
    },
    {
      src: 'https://pic1.imgdb.cn/item/6809e71f58cb8da5c8c86663.png'
    },
    {
      src: 'https://pic1.imgdb.cn/item/6809e71f58cb8da5c8c86665.png'
    }
  ]

  const itemsPerPage = 3
  const totalPages = Math.ceil(albums.length / itemsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const handleAlbumClick = (album: (typeof albums)[0]) => {
    setSelectedAlbum(album)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedAlbum(null)
  }

  return (
    <div className="relative w-full">
      {/* 背景图片容器 */}
      <div className="fixed inset-0">
        <Image
          src="https://pic1.imgdb.cn/item/6809e71f58cb8da5c8c86664.jpg"
          alt="背景图片"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      {/* 第一页：全屏视频介绍 */}
      <div className="relative h-screen w-full overflow-hidden z-20">
        <motion.div className="absolute top-0 left-0 w-full h-full" style={{ opacity, scale }}>
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            autoPlay
          >
            <source src="https://api.starlightpathserver.fun/static/upload/video/xue.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center flex-col">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl font-bold text-white mb-4"
            >
              薛之谦
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-2xl text-white"
            >
              音乐诗人 · 创作才子
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* 第二页：专辑展示 */}
      <div className="relative z-10 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto py-20 px-8"
        >
          <h2 className="text-4xl font-bold mb-12 text-center text-white">专辑作品</h2>

          {/* 专辑展示区域 */}
          <div className="relative">
            {/* 左箭头 */}
            <button
              onClick={prevPage}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* 右箭头 */}
            <button
              onClick={nextPage}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* 专辑卡片容器 */}
            <div className="relative h-[600px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {albums
                    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                    .map((album) => (
                      <motion.div
                        key={album.title}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleAlbumClick(album)}
                        className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                      >
                        {/* 专辑封面 */}
                        <div className="relative aspect-square">
                          <Image
                            src={album.cover}
                            alt={album.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                            <svg
                              className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                        {/* 专辑信息 */}
                        <div className="p-4">
                          <h3 className="text-xl font-semibold text-white mb-1">{album.title}</h3>
                          <p className="text-gray-300 text-sm mb-2">
                            {album.year} · {album.desc}
                          </p>
                          <div className="space-y-1">
                            {album.songs.slice(0, 3).map((song, index) => (
                              <p key={index} className="text-gray-400 text-sm truncate">
                                {index + 1}. {song}
                              </p>
                            ))}
                            {album.songs.length > 3 && (
                              <p className="text-gray-400 text-sm">
                                +{album.songs.length - 3} 更多歌曲
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 分页指示器 */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentPage === index ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* 专辑详情弹窗 */}
      <AnimatePresence>
        {isModalOpen && selectedAlbum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* 背景遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={closeModal}
            />

            {/* 弹窗内容 */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl"
            >
              {/* 关闭按钮 */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                {/* 左侧：专辑封面和基本信息 */}
                <div className="space-y-6">
                  <div className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={selectedAlbum.cover}
                      alt={selectedAlbum.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-white mb-2">{selectedAlbum.title}</h3>
                    <p className="text-gray-300 text-lg">
                      {selectedAlbum.year} · {selectedAlbum.desc}
                    </p>
                  </div>
                </div>

                {/* 右侧：专辑介绍和歌曲列表 */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">专辑介绍</h4>
                    <div className="relative">
                      <div className="max-h-[200px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                          {selectedAlbum?.intro}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">歌曲列表</h4>
                    <div className="space-y-2 overflow-y-auto max-h-[500px]">
                      {selectedAlbum.songs.map((song, index) => (
                        <div
                          key={index}
                          className="flex items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <span className="text-gray-400 w-8">{index + 1}</span>
                          <span className="text-white flex-1">{song}</span>
                          <button className="text-gray-400 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 第三页：演唱会精彩瞬间 */}
      <div className="relative z-10 min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto py-20 px-8"
        >
          <h2 className="text-4xl font-bold mb-12 text-center text-white">演唱会精彩瞬间</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {concert.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="relative h-80 rounded-xl overflow-hidden"
              >
                <Image src={item.src} alt={`演唱会照片 ${index}`} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <p className="text-white text-xl font-semibold">点击查看详情</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 第四页：粉丝留言墙 */}
      <div className="relative z-10 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto py-20 px-8"
        >
          <h2 className="text-4xl font-bold mb-12 text-center text-white">粉丝留言墙</h2>
          <div className="space-y-6">
            {[
              { name: '谦友小A', content: '从《认真的雪》开始喜欢你，到现在已经15年了！' },
              { name: '音乐爱好者', content: '你的每一首歌都唱进了我的心里，感谢你的音乐陪伴。' },
              { name: '谦谦的迷妹', content: '演唱会现场真的太震撼了，期待下次见面！' },
              { name: '音乐诗人', content: '你的歌词总是那么有深度，每一句都值得细细品味。' }
            ].map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md text-white"
              >
                <h3 className="text-xl font-semibold mb-2">{message.name}</h3>
                <p className="text-gray-200">{message.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 第五页：最新动态 */}
      <div className="relative z-10 min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto py-20 px-8"
        >
          <h2 className="text-4xl font-bold mb-12 text-center text-white">最新动态</h2>
          <div className="space-y-8">
            {[
              {
                date: '2024-04-20',
                title: '新专辑《音乐诗人》即将发布',
                content: '薛之谦全新创作专辑即将与大家见面，敬请期待！'
              },
              {
                date: '2024-04-15',
                title: '巡回演唱会启动',
                content: '2024年"音乐诗人"巡回演唱会正式启动，首站上海！'
              },
              {
                date: '2024-04-10',
                title: '新歌《诗人的眼泪》发布',
                content: '薛之谦最新单曲《诗人的眼泪》正式上线各大音乐平台。'
              }
            ].map((news, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg text-white"
              >
                <p className="text-gray-300 mb-2">{news.date}</p>
                <h3 className="text-2xl font-semibold mb-2">{news.title}</h3>
                <p className="text-gray-200">{news.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
