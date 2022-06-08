# Web Performance Report

| Category | Score |
| --- | --- |
| JavaScript execution time | 1.1 s |
| First Contentful Paint | 2.3 s |
| Largest Contentful Paint | 14.4 s |
| Speed Index | 9.8 s |
| Cumulative Layout Shift | 0.002 |
| First Meaningful Paint | 7.3 s |
| Time to Interactive | 12.5 s |
| Reduce initial server response time | Root document took 1,030 ms |
| Total Blocking Time | 1,560 ms |

### JavaScript execution time

<details><summary>description</summary>
  
  Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn more](https://web.dev/bootup-time/).
  
  </details>

- Unit
  - millisecond
- wastedMs
  - 1117.475999999954

| URL | Total CPU Time | Script Evaluation | Script Parse |
|  --- | --- | --- | --- |
 http://search.11st.co.kr/js/searchFront/bundle/vendor~app.chunk.js?v=v_123 | 5473.371999999954 | 870.427999999954 | 9.54 |
 http://search.11st.co.kr/MW/search?searchKeyword=%25EB%2585%25B8%25ED%258A%25B8%25EB%25B6%2581&decSearchKeyword=%25EB%2585%25B8%25ED%258A%25B8%25EB%25B6%2581 | 582.9240000000001 | 13.703999999999995 | 29.316000000000003 |
 Unattributable | 390.4639999999988 | 19.908 | 0.964 |
 http://m.11st.co.kr/MW/js/rake/rakeLog-mobile-1.0.2.js | 75.33200000000002 | 70.46400000000001 | 3.052 |
 http://c.m.011st.com/MW/js/rake/bundle/rake.bundle-0.0.2.js | 58.8 | 50.168000000000006 | 0.996 |
 http://search.11st.co.kr/js/searchFront/bundle/vendor~Kukkuk_v_123~Present_v_123~Review_v_123~Totalv_123.chunk.js | 52.92399999999999 | 44.931999999999995 | 4.004 |