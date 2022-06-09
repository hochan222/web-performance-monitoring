# Web Performance Report

| Accessibility | Best Practices | Performance | PWA | SEO |
| :---: | :---: | :---: | :---: | :---: |
|  🟢 91 | 🟠 83 | 🟠 50 | 🔴 40 | 🟠 84 |

| Category | Score |
| --- | --- |
| JavaScript execution time | 0.3 s |
| First Contentful Paint | 4.0 s |
| Largest Contentful Paint | 14.1 s |
| Speed Index | 6.1 s |
| Cumulative Layout Shift | 0.042 |
| First Meaningful Paint | 4.0 s |
| Time to Interactive | 9.9 s |
| Initial server response time was short | Root document took 80 ms |
| Total Blocking Time | 220 ms |

### JavaScript execution time

<details><summary>description</summary>
  
  Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn more](https://web.dev/bootup-time/).
  
  </details>

- Unit
  - millisecond
- wastedMs
  - 346.28

| URL | Total CPU Time | Script Evaluation | Script Parse |
| --- | --- | --- | --- |
|  https://m.naver.com/ | 2106.94 | 5.4 | 7.68 |
|  https://mm.pstatic.net/js/build/main.a4cebb6a.js?o=m | 252.52 | 136.38 | 13.96 |
|  Unattributable | 170.98 | 6.36 | 0.36 |
|  https://mm.pstatic.net/js/build/vendors.295cfd12.js?o=m | 151.78 | 62.34 | 7.28 |
|  https://ssl.pstatic.net/tveta/libs/glad/prod/2.0.0/gfp-sentry-bundle-1.0.0.js | 125.8 | 104.78 | 1.74 |
|  https://mm.pstatic.net/css/ncache/build/w.58f31592.css | 102.54 | 0 | 0 |
