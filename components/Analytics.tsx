'use client'

import Script from 'next/script'

// БИОМЕТРИЯ: Яндекс.Метрика + Google Analytics + цели
// ЗАМЕНИ 'XXXXXX' на ID Яндекс.Метрики (metrika.yandex.ru)
// ЗАМЕНИ 'G-XXXXXXXXXX' на ID Google Analytics (analytics.google.com)

const YANDEX_METRIKA_ID = 'XXXXXX'
const GA_TRACKING_ID = 'G-XXXXXXXXXX'

export default function Analytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_TRACKING_ID}',{page_path:window.location.pathname});`}
      </Script>
      <Script id="ym-init" strategy="afterInteractive">
        {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${YANDEX_METRIKA_ID},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true,ecommerce:"dataLayer"});`}
      </Script>
      <noscript><div><img src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`} style={{position:'absolute',left:'-9999px'}} alt="" /></div></noscript>
    </>
  )
}

export function reachGoal(goalName: string) {
  if (typeof window !== 'undefined' && (window as any).ym) {
    ;(window as any).ym(YANDEX_METRIKA_ID, 'reachGoal', goalName)
  }
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', goalName)
  }
}
