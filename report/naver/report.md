# Web Performance Report

| Accessibility | Best Practices | Performance | PWA | SEO |
| :---: | :---: | :---: | :---: | :---: |
|  🟢 91 | 🟠 83 | 🔴 43 | 🔴 40 | 🟠 83 |

| Category | Score |
| --- | --- |
| JavaScript execution time | 0.5 s |
| First Contentful Paint | 4.1 s |
| Largest Contentful Paint | 7.6 s |
| Speed Index | 6.4 s |
| Cumulative Layout Shift | 0.042 |
| First Meaningful Paint | 4.1 s |
| Time to Interactive | 9.9 s |
| Initial server response time was short | Root document took 40 ms |
| Total Blocking Time | 460 ms |

### JavaScript execution time

<details><summary>description</summary>
  
  Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn more](https://web.dev/bootup-time/).
  
  </details>

- Unit
  - millisecond
- wastedMs
  - 506.892

| URL | Total CPU Time | Script Evaluation | Script Parse |
| --- | --- | --- | --- |
|  https://m.naver.com/ | 3039.051999999998 | 14.063999999999995 | 8.2 |
|  https://ssl.pstatic.net/tveta/libs/glad/prod/2.0.0/gfp-sentry-bundle-1.0.0.js | 261.312 | 222.636 | 1.924 |
|  Unattributable | 246.1200000000027 | 6.7360000000000015 | 0.352 |
|  https://mm.pstatic.net/js/build/main.a4cebb6a.js?o=m | 245.09200000000004 | 137.30000000000007 | 6.828 |
|  https://mm.pstatic.net/js/build/vendors.295cfd12.js?o=m | 183.80399999999997 | 89.10399999999996 | 19.748 |
|  https://mm.pstatic.net/css/ncache/build/w.58f31592.css | 116.06799999999998 | 0 | 0 |
