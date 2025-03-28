'use client'

import Script from 'next/script'

export default () => {
  return (
    <Script
      dangerouslySetInnerHTML={{
        __html: `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?7bc7834cf1035acce8b851c0b9c95fd3";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
            `
      }}
    />
  )
}
