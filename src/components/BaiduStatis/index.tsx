'use client';

import Script from 'next/script';

export default () => {
  return (
    <Script
      dangerouslySetInnerHTML={{
        __html: `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "${process.env.NEXT_PUBLIC_BAIDU_SRC_ID}";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
            `
      }}
    />
  )
}
