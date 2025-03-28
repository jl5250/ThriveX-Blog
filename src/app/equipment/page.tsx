const list = [
    {
        category: "正在使用的装备",
        description: "这些是我的核心生产力设备",
        items: [
            {
                name: "MacBook Air M4",
                image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mba13-skyblue-select-202503?wid=904&hei=840&fmt=jpeg",
                description: "目前在为我创造价值的东西",
                price: 8757,
            },
            {
                name: "iPhone 16 Pro Max",
                image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-naturaltitanium?wid=5120&hei=2880&fmt=webp&qlt=70&.v=eUdsd0dIb3VUOXdtWkY0VFUwVE8vbEdkZHNlSjBQRklnaFB2d3I5MW94NkkwYXJHRXdBd0xZTDNUS0M2eUNlY0pOZTBYalh5Vk90cEc1K2wwRzFGejRMeXJHUnUva2huMjl4akFHOXNwVjA0YXFmK3VWSWZuRE9oVEFyUFR0T2h6UkM0eXdTUkFqNnFqYk5ZcGUzV2tB&traceId=1",
                description: "第一次用苹果，感觉除了流畅些，其他的都不如安卓 [:狗头]",
                price: 8299,
                color: "#F6F6F8",
            },
            {
                name: "Redmi A27U 4K 显示器",
                image: "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1736388499.01483010.png",
                description: "4K 显示屏性价比天花板",
                price: 1399,
            },
            {
                name: "Magic Keyboard",
                image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MXK93?wid=1144&hei=1144&fmt=jpeg",
                description: "习惯了用触控板，自然少不了这个",
                price: 599,
            },
            {
                name: "洛斐小顺青春版",
                image: "https://bu.dusays.com/2025/03/25/67e28aded4653.jpeg",
                description: "目前我的主力键盘",
                price: 399,
            },
            {
                name: "京东京造 K3 Max",
                image: "https://bu.dusays.com/2025/03/25/67e28b24c5353.jpeg",
                description: "比小顺手感略差些",
                color: "#E9E9E9",
                price: 379,
            },
            {
                name: "HUAWEI FreeBuds SE 2 海岛蓝",
                image: "https://res2.vmallres.com/pimages/uomcdn/CN/pms/202405/gbom/6942103104039/428_428_85111776E033FD73B02D7781416437A6mp.png",
                description: "已经丢了 3 个耳机了，所以这次买了个便宜的 😂",
                price: 175,
            },
            {
                name: "联想拯救者无线鼠标 M7",
                image: "https://p2.lefile.cn/product/adminweb/2022/10/19/8BlUh9hL1iU9FudPwlI3iAT2u-2520.jpg",
                description: "外观和手感都不错，尤其是滚轮支持无极滚动",
                price: 199,
            }
        ]
    },
    {
        category: "以往的设备",
        description: "这些设备已经退役，但它们曾经陪伴我度过了一段美好的时光",
        items: [
            {
                name: "MacBook Air M2",
                image: "https://gw.alicdn.com/imgextra/i3/786576394/O1CN01xbLPfM1x6VIKZYkgD_!!786576394.png",
                description: "第四台电脑， 用了半年以 6k 价位卖给了同学， 几乎每个月亏损 1k 🥺",
                price: 10017,
            },
            {
                name: "华硕灵耀 14",
                image: "https://n.sinaimg.cn/sinakd20230105s/0/w1200h1200/20230105/42c0-6e23c093d09cac33628425e873b21ae8.png",
                description: "我的第三台电脑，我比较看重这台电脑的屏幕显示效果。可不知道为什么电脑各方面配置还不错，但经常死机，不夸张的说一天能死机最起码 5 次，只能强制重启。最终用了半年多以 4k 出掉了 😤",
                price: 6596,
            },
            {
                name: "联想拯救者 R900k",
                image: "https://gw.alicdn.com/imgextra/i4/1610713866/O1CN01oqBSRV1eQgAhsW7DX_!!1610713866.jpg",
                description: "我的第二台电脑，买来之后几乎没打过游戏，每天在教室搬来搬去 用了一年左右干脆 5k 卖掉了",
                price: 9298,
            },
            {
                name: "联想小新 14",
                image: "https://gw.alicdn.com/imgextra/O1CN01XNtSbe2FLJMw6NOpz_!!2213856588863.jpg",
                description: "我的第一台电脑，用了 2 年以 2700 卖掉，还挺保值的 😌",
                price: 4279,
            },
            {
                name: "小米 14 Pro",
                image: "https://gw.alicdn.com/imgextra/i1/2697545629/O1CN01e5zi0I1rS8OrkJADS_!!2697545629.jpg",
                description: "我的第三款小米手机",
                price: 4999,
            },
            {
                name: "小米 13",
                image: "https://gw.alicdn.com/imgextra/i3/3848593912/O1CN012krxUg1elkPjYM7Oo_!!3848593912.jpg",
                description: "我的第二款小米手机",
                price: 3920,
            },
            {
                name: "小米 10 至尊纪念版",
                image: "https://gw.alicdn.com/bao/uploaded/i4/6000000001531/O1CN0151j4hC1NBFAUFLdlK_!!6000000001531-0-remus.jpg_.webp",
                description: "我的第一款小米手机，用了 2 年以 1500 元卖掉了",
                price: 5599,
            },
            {
                name: "Vivo X23",
                image: "https://gw.alicdn.com/imgextra/i4/2215219031167/O1CN01apiKGN1KUX0tEoF4t_!!2215219031167.jpg",
                description: "我的第一款安卓手机",
                price: 2100,
            },
            {
                name: "iPhone SE",
                image: "https://gw.alicdn.com/imgextra/i1/2771525200/O1CN016fLppI1oHeXLA6ULU_!!2771525200.jpg",
                description: "第一次用苹果 🤩",
                price: 0,
            },
            {
                name: "漫步者 LOLLI3 ANC",
                image: "https://gw.alicdn.com/imgextra/i4/2591257935/O1CN01n0EqwN28UHcaif2aY_!!0-item_pic.jpg",
                description: "最终还是丢了 😭，以后不会再买这么贵的耳机了",
                price: 469,
                color: "#829887"
            },
            {
                name: "小度降噪耳机 Pro",
                image: "https://gw.alicdn.com/bao/uploaded/i1/360865098/O1CN012BkZRv1nWw6Cwzfll_!!360865098.jpg_.webp",
                description: "丢了 😭",
                price: 438,
            },
            {
                name: "漫步者 LolliPods plus",
                image: "https://img.alicdn.com/imgextra/i2/346884669/O1CN01M2tNH41kMRrUFAt6x_!!346884669.jpg_200x200.jpg",
                description: "丢了 😭",
                price: 279,
            },
            {
                name: "腹灵 MK800",
                image: "https://img.alicdn.com/imgextra/i1/2207283785015/O1CN01JCgKdB1muv2GSbGhq_!!2207283785015.jpg_.webp",
                description: "做工和外观都不错，只是按压偏重适合打游戏，最终以 200 元卖给了同学",
                price: 449,
            },
            {
                name: "RK987",
                image: "https://img.alicdn.com/imgextra/i4/1574573460/O1CN01mRpY2P1bQjOWWB0tv_!!1574573460.jpg_.webp",
                description: "键盘进水导致部分按键失灵，但不影响打游戏，后来以 20 元送给了同学",
                price: 273,
            },
            {
                name: "联想拯救者 M600",
                image: "https://n.sinaimg.cn/spider2020417/474/w728h546/20200417/3ccf-iskepxt1620110.jpg",
                description: "手感还不错，只是过保就坏😠，修的话也不划算就扔掉了",
                price: 205,
            }
        ]
    }
];

export default () => {
    return (
        <>
            <title>我的设备 - 工欲善其事必先利其器</title>
            <meta name="description" content="分享我的生产力工具" />

            <div className="pt-20 pb-10">
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