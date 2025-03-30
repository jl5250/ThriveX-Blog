const list = [
    {
        category: "正在使用的装备",
        description: "这些是我的核心生产力设备",
        items: [
            {
                name: "联想 拯救者 R9000P 2021H",
                image: "https://p2.lefile.cn/product/adminweb/2025/01/04/AdubzqydQYAbviT7EBASDDj86-5734.jpg",
                description: "目前我唯一一部电脑",
                price: 9537,
            },
            {
                name: "HUAWEI MATE 70 Pro +",
                image: "https://res2.vmallres.com/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_CD4F1FF4897186C9343CD7EB5F7E2B88.png",
                description: "我的第一部高端手机，真的非常好用，配合鸿蒙系统，体验极佳",
                price: 8499,
                color: "#F6F6F8",
            },
            {
                name: "SANC 小钢炮23.8英寸 2K 180HZ 显示器",
                image: "https://img.alicdn.com/imgextra/i2/158708866/O1CN01xQiusX2FMgYbX4ecZ_!!158708866.jpg_.webp",
                description: "2K 我的第一个性价比显示器",
                price: 782,
            },
            {
                name: "HUAWEI WATCH 3",
                image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/greate-china/cn/mkt/pdp/wearables/watch-3/active-edition.png",
                description: "我的第一款智能手表，体验极佳",
                price: 1596,
            },
            {
                name: "HUAWEI MatePad 11",
                image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/greate-china/cn/mkt/pdp/tablets/matepad-11/img0705/blue.png",
                description: "当时香港政府的消费券买的哈哈哈",
                price: 2599,
            },
            {
                name: "IROK 艾石头FE87/104",
                image: "https://tum.joyway.net/20230128/08f8ddd3928fef850d8ac723b39ffff3.jpg",
                description: "当时因为这款键盘对比了好久",
                color: "#E9E9E9",
                price: 259,
            },
            {
                name: "HUAWEI FreeBuds 5 冰霜银",
                image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/cn/mkt/pdp/headphones/freebuds5/list/silver.png",
                description: "我看了好久的耳机了，设计让我非常的喜欢",
                price: 849,
            },
            {
                name: "罗技狗屁王 1",
                image: "https://resource.logitechg.com/w_1600,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/pro-wireless-gaming-mouse/pro-wireless-carbon-gallery-1.png",
                description: "打游戏跟风之前卖得很火的鼠标",
                price: 365,
            }
        ]
    },
    {
        category: "以往的设备",
        description: "这些设备已经退役，但它们曾经陪伴我度过了一段美好的时光",
        items: [
        ]
    }
];

export default () => {
    return (
        <>
            <title>我的设备 - 工欲善其事必先利其器</title>
            <meta name="description" content="分享我的生产力工具" />

            <div className="pt-20 pb-10 bg-sky-200">
                <div className="w-[90%] lg:w-[1200px] mx-auto mt-10 space-y-20 md:space-y-24">
                    {list.map((group, index) => (
                        <div key={index}>
                            <h2 className="text-xl">{group.category}</h2>
                            <p className="text-gray-600 mb-6">{group.description}</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {group.items.map((item, idx) => (
                                    <div key={idx} className="group overflow-hidden border rounded-lg bg-white dark:bg-black-a transform transition-transform hover:scale-105 cursor-pointer">
                                        <div className="flex justify-center h-40" style={{ backgroundColor: item.color }}>
                                            <img src={item.image} alt={item.name} className="h-full object-cover" />
                                        </div>

                                        <div className="p-4">
                                            <h3 className="group-hover:text-primary transition-colors">{item.name}</h3>
                                            <p className="text-gray-500 text-sm pt-2 mb-4 line-clamp-2">{item.description}</p>
                                            <span className="mt-2 py-1 px-1.5 rounded-md text-white bg-gray-300 group-hover:bg-primary transition-colors">￥{item.price}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}