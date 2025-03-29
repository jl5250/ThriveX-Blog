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
              hm.src = "https://hm.baidu.com/hm.js?a6dbd408ff04ad0e327da197a5807dd8";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
            `
      }}
    />
  )
}
