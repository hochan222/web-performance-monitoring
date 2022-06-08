# Web Performance Report

| Accessibility | Best Practices | Performance | PWA | SEO |
| :---: | :---: | :---: | :---: | :---: |
|  🟢 91 | 🟠 83 | 🔴 24 | 🔴 40 | 🟠 84 |

| Category | Score |
| --- | --- |
| JavaScript execution time | 0.8 s |
| First Contentful Paint | 4.2 s |
| Largest Contentful Paint | 13.5 s |
| Speed Index | 7.6 s |
| Cumulative Layout Shift | 0.067 |
| First Meaningful Paint | 4.2 s |
| Time to Interactive | 11.3 s |
| Initial server response time was short | Root document took 30 ms |
| Total Blocking Time | 1,690 ms |

### JavaScript execution time

<details><summary>description</summary>
  
  Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn more](https://web.dev/bootup-time/).
  
  </details>

- Unit
  - millisecond
- wastedMs
  - 757.6600000000008

| URL | Total CPU Time | Script Evaluation | Script Parse |
| --- | --- | --- | --- |
|  https://ssl.pstatic.net/tveta/libs/glad/prod/2.0.0/gfp-sentry-bundle-1.0.0.js | 8305.631999999678 | 309.7520000000006 | 1.7519999999999998 |
|  https://m.naver.com/ | 3358.5479999999984 | 4.367999999999999 | 6.492 |
|  https://mm.pstatic.net/js/build/main.a4cebb6a.js?o=m | 298.28800000000007 | 141.20000000000022 | 12.62 |
|  https://ssl.pstatic.net/melona/libs/assets/js/mo/main/min/mocoplex_image_extension_nnmain.min.js?20220407 | 215.564 | 193.788 | 0.396 |
|  Unattributable | 186.56000000000336 | 5.420000000000001 | 0.276 |
|  https://mm.pstatic.net/js/build/vendors.295cfd12.js?o=m | 140.008 | 74.10000000000001 | 7.496 |
|  https://mm.pstatic.net/css/ncache/build/w.58f31592.css | 72.44800000000001 | 0 | 0 |
