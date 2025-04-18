"use client";

import { useEffect } from "react";

import AOS from 'aos';
import 'aos/dist/aos.css';

export default function MapContainer() {
    let map: any;

    useEffect(() => {
        AOS.init()

        // 确保代码仅在客户端执行
        import('@amap/amap-jsapi-loader').then(AMapLoader => {
            // @ts-ignore
            window._AMapSecurityConfig = {
                securityJsCode: process.env.NEXT_PUBLIC_GAODE_SECURITYJS_CODE,
            };

            AMapLoader.load({
                key: process.env.NEXT_PUBLIC_GAODE_KEY_CODE!, // 申请好的Web端开发者Key，首次调用 load 时必填
                version: "2.0",
                plugins: ["AMap.Scale", "AMap.Marker"],
            })
                .then((AMap) => {
                    map = new AMap.Map("container", {
                        viewMode: "3D", // 是否为3D地图模式
                        zoom: 7,
                        center: [113.625351, 34.746303], // 初始化地图中心点位置
                    });

                    new AMap.Marker({
                        position: [113.625351, 34.746303], // 标记位置
                        map, // 将标记添加到地图
                    });
                })
                .catch((e) => {
                    console.log(e);
                });

            return () => map?.destroy();
        })
    }, []);

    return (
        <>
            <div data-aos="zoom-in" className="w-full md:w-5/12 flex flex-col mr-0 md:mr-20">
                <div className="text-center text-xl mb-8">我的家乡</div>
                
                <div id="container" className="w-full h-60 sm:h-80 border rounded-3xl"></div>
            </div>
        </>
    );
}