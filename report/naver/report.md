# Web Performance Report

| Accessibility | Best Practices | Performance | PWA | SEO |
| :---: | :---: | :---: | :---: | :---: |
|  🟠 85 | 🟠 83 | 🔴 33 | 🔴 40 | 🟠 76 |

| Category | Score |
| --- | --- |
| JavaScript execution time | undefined |
| First Contentful Paint | 4.1 s |
| Largest Contentful Paint | 8.6 s |
| Speed Index | 6.4 s |
| Cumulative Layout Shift | 0.101 |
| First Meaningful Paint | 4.1 s |
| Time to Interactive | 10.5 s |
| Initial server response time was short | Root document took 30 ms |
| Total Blocking Time | 800 ms |

### JavaScript execution time

<details><summary>description</summary>
  
  Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn more](https://web.dev/bootup-time/).
  
  </details>

- Unit
  - millisecond
- wastedMs
  - 511.264000000001

| URL | Total CPU Time | Script Evaluation | Script Parse |
| --- | --- | --- | --- |
|  https://ssl.pstatic.net/tveta/libs/glad/prod/2.0.0/gfp-sentry-bundle-1.0.0.js | 3371.4439999997235 | 265.0360000000007 | 1.6399999999999997 |
|  https://m.naver.com/ | 2482.9120000000003 | 5.211999999999998 | 7.368 |
|  https://mm.pstatic.net/js/build/main.a4cebb6a.js?o=m | 848.9120000000031 | 143.07200000000032 | 13.512 |
|  Unattributable | 188.03600000000014 | 5.32 | 0.288 |
|  https://mm.pstatic.net/js/build/vendors.295cfd12.js?o=m | 135.50799999999998 | 62.03999999999999 | 7.776 |
|  https://mm.pstatic.net/css/ncache/build/w.58f31592.css | 92.72800000000001 | 0 | 0 |
