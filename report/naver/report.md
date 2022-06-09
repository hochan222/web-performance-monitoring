# Web Performance Report

| Accessibility | Best Practices | Performance | PWA | SEO |
| :---: | :---: | :---: | :---: | :---: |
|  🟢 91 | 🟠 83 | 🟠 52 | 🔴 40 | 🟠 84 |

| Category | Score |
| --- | --- |
| JavaScript execution time | 0.3 s |
| First Contentful Paint | 3.9 s |
| Largest Contentful Paint | 14.1 s |
| Speed Index | 6.0 s |
| Cumulative Layout Shift | 0 |
| First Meaningful Paint | 4.3 s |
| Time to Interactive | 9.7 s |
| Initial server response time was short | Root document took 30 ms |
| Total Blocking Time | 210 ms |

### JavaScript execution time

<details><summary>description</summary>
  
  Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn more](https://web.dev/bootup-time/).
  
  </details>

- Unit
  - millisecond
- wastedMs
  - 334.7800000000003

| URL | Total CPU Time | Script Evaluation | Script Parse |
| --- | --- | --- | --- |
|  https://m.naver.com/ | 2008.2920000000008 | 5.683999999999998 | 7.816 |
|  https://mm.pstatic.net/js/build/main.a4cebb6a.js?o=m | 274.56399999999957 | 141.52000000000032 | 6.944 |
|  Unattributable | 168.62400000000076 | 5.732 | 0.328 |
|  https://ssl.pstatic.net/tveta/libs/glad/prod/2.0.0/gfp-sentry-bundle-1.0.0.js | 131.08000000000004 | 97.36000000000004 | 1.8159999999999998 |
|  https://mm.pstatic.net/js/build/vendors.295cfd12.js?o=m | 120.62399999999998 | 59.743999999999986 | 7.836 |
|  https://mm.pstatic.net/css/ncache/build/w.58f31592.css | 96.708 | 0 | 0 |
