# Web Performance Report

| Accessibility | Best Practices | Performance | PWA | SEO |
| :---: | :---: | :---: | :---: | :---: |
|  96 | 75 | 31 | 30 | 73 |

| Category | Score |
| --- | --- |
| JavaScript execution time | 1.2 s |
| First Contentful Paint | 2.3 s |
| Largest Contentful Paint | 13.9 s |
| Speed Index | 9.6 s |
| Cumulative Layout Shift | 0.002 |
| First Meaningful Paint | 7.1 s |
| Time to Interactive | 12.5 s |
| Reduce initial server response time | Root document took 950 ms |
| Total Blocking Time | 1,230 ms |

### JavaScript execution time

<details><summary>description</summary>
  
  Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn more](https://web.dev/bootup-time/).
  
  </details>

- Unit
  - millisecond
- wastedMs
  - 1188.3519999999535

| URL | Total CPU Time | Script Evaluation | Script Parse |
| --- | --- | --- | --- |
|  http://search.11st.co.kr/js/searchFront/bundle/vendor~app.chunk.js?v=v_123 | 4105.507999999952 | 963.5079999999534 | 8.292 |
|  Unattributable | 420.2119999999861 | 6.0520000000000005 | 0.332 |
|  http://search.11st.co.kr/MW/search?searchKeyword=%25EB%2585%25B8%25ED%258A%25B8%25EB%25B6%2581&decSearchKeyword=%25EB%2585%25B8%25ED%258A%25B8%25EB%25B6%2581 | 376.6919999999999 | 12.056000000000001 | 25.8 |
|  http://m.11st.co.kr/MW/js/rake/rakeLog-mobile-1.0.2.js | 73.516 | 68.636 | 3.068 |
|  http://c.m.011st.com/MW/js/rake/bundle/rake.bundle-0.0.2.js | 55.536 | 47.888000000000005 | 0.968 |
|  http://search.11st.co.kr/js/searchFront/bundle/vendor~Kukkuk_v_123~Present_v_123~Review_v_123~Totalv_123.chunk.js | 55.42799999999998 | 47.40399999999998 | 4.348 |
