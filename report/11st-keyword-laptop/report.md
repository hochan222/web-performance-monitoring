# Web Performance Report

| Accessibility | Best Practices | Performance | PWA | SEO |
| :---: | :---: | :---: | :---: | :---: |
|  🟢 96 | 🟠 75 | 🔴 38 | 🔴 30 | 🟠 73 |

| Category | Score |
| --- | --- |
| JavaScript execution time | 1.1 s |
| First Contentful Paint | 2.3 s |
| Largest Contentful Paint | 12.8 s |
| Speed Index | 8.9 s |
| Cumulative Layout Shift | 0.002 |
| First Meaningful Paint | 4.9 s |
| Time to Interactive | 12.2 s |
| Reduce initial server response time | Root document took 770 ms |
| Total Blocking Time | 710 ms |

### JavaScript execution time

<details><summary>description</summary>
  
  Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn more](https://web.dev/bootup-time/).
  
  </details>

- Unit
  - millisecond
- wastedMs
  - 1082.0719999999512

| URL | Total CPU Time | Script Evaluation | Script Parse |
| --- | --- | --- | --- |
|  http://search.11st.co.kr/js/searchFront/bundle/vendor~app.chunk.js?v=v_123 | 2607.411999999952 | 814.6359999999513 | 13.156 |
|  http://search.11st.co.kr/MW/search?searchKeyword=%25EB%2585%25B8%25ED%258A%25B8%25EB%25B6%2581 | 543.7680000000003 | 17.523999999999997 | 32.56 |
|  Unattributable | 445.0079999999972 | 19.196 | 2.672 |
|  http://m.11st.co.kr/MW/js/rake/rakeLog-mobile-1.0.2.js | 84.56799999999996 | 79.64399999999996 | 3.088 |
|  http://c.m.011st.com/MW/js/rake/bundle/rake.bundle-0.0.2.js | 56.54399999999998 | 47.55199999999999 | 1.16 |
|  http://search.11st.co.kr/js/searchFront/bundle/vendor~Kukkuk_v_123~Present_v_123~Review_v_123~Totalv_123.chunk.js | 54.932 | 46.608 | 4.276 |
