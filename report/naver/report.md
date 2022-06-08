# Web Performance Report

| Accessibility | Best Practices | Performance | PWA | SEO |
| :---: | :---: | :---: | :---: | :---: |
|  🟢 91 | 🟠 83 | 🔴 48 | 🔴 40 | 🟠 83 |

| Category | Score |
| --- | --- |
| JavaScript execution time | 0.4 s |
| First Contentful Paint | 4.0 s |
| Largest Contentful Paint | 10.6 s |
| Speed Index | 6.1 s |
| Cumulative Layout Shift | 0.056 |
| First Meaningful Paint | 4.0 s |
| Time to Interactive | 9.7 s |
| Initial server response time was short | Root document took 50 ms |
| Total Blocking Time | 300 ms |

### JavaScript execution time

<details><summary>description</summary>
  
  Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn more](https://web.dev/bootup-time/).
  
  </details>

- Unit
  - millisecond
- wastedMs
  - 357.27600000000007

| URL | Total CPU Time | Script Evaluation | Script Parse |
| --- | --- | --- | --- |
|  https://m.naver.com/ | 2407.303999999998 | 5.051999999999998 | 6.827999999999999 |
|  https://mm.pstatic.net/js/build/main.a4cebb6a.js?o=m | 244.99599999999958 | 143.04000000000005 | 7.356 |
|  https://ssl.pstatic.net/tveta/libs/glad/prod/2.0.0/gfp-sentry-bundle-1.0.0.js | 200.51999999999998 | 111.29599999999999 | 1.6599999999999997 |
|  Unattributable | 197.70800000000153 | 5.892 | 0.304 |
|  https://mm.pstatic.net/js/build/vendors.295cfd12.js?o=m | 141.016 | 63.580000000000005 | 12.268 |
|  https://mm.pstatic.net/css/ncache/build/w.58f31592.css | 75.216 | 0 | 0 |
