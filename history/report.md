# Web Performance Report

| Accessibility | Best Practices | Performance | PWA | SEO |
| :---: | :---: | :---: | :---: | :---: |
|  🟢 96 | 🟠 75 | 🔴 36 | 🔴 30 | 🟠 74 |

| Category | Score |
| --- | --- |
| JavaScript execution time | 1.1 s |
| First Contentful Paint | 2.2 s |
| Largest Contentful Paint | 10.5 s |
| Speed Index | 9.0 s |
| Cumulative Layout Shift | 0.002 |
| First Meaningful Paint | 7.0 s |
| Time to Interactive | 10.1 s |
| Reduce initial server response time | Root document took 670 ms |
| Total Blocking Time | 930 ms |

### JavaScript execution time

<details><summary>description</summary>
  
  Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn more](https://web.dev/bootup-time/).
  
  </details>

- Unit
  - millisecond
- wastedMs
  - 1094.7919999999592

| URL | Total CPU Time | Script Evaluation | Script Parse |
| --- | --- | --- | --- |
|  http://search.11st.co.kr/js/searchFront/bundle/vendor~app.chunk.js?v=v_123 | 3459.11599999996 | 920.7359999999593 | 8.396 |
|  Unattributable | 558.8199999999944 | 5.9479999999999995 | 0.368 |
|  http://search.11st.co.kr/MW/search?searchKeyword=%25EB%2585%25B8%25ED%258A%25B8%25EB%25B6%2581&decSearchKeyword=%25EB%2585%25B8%25ED%258A%25B8%25EB%25B6%2581 | 481.072 | 10.232 | 25.036 |
|  http://m.11st.co.kr/MW/js/rake/rakeLog-mobile-1.0.2.js | 81.55200000000005 | 74.81200000000004 | 2.896 |
|  http://c.m.011st.com/MW/js/rake/bundle/rake.bundle-0.0.2.js | 54.212 | 44.71600000000001 | 1.652 |
