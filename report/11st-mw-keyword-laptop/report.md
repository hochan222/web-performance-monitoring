# Web Performance Report

| Accessibility | Best Practices | Performance | PWA | SEO |
| :---: | :---: | :---: | :---: | :---: |
| 🟢 96 | 🟠 75 | 🔴 36 | 🔴 30 | 🟠 73 |

| Category | Score |
| --- | --- |
| **Basic Metrics** | |
| JavaScript execution time | 1.0 s |
| First Contentful Paint | 2.4 s |
| Largest Contentful Paint | 14.5 s |
| Speed Index | 9.4 s |
| Cumulative Layout Shift | 0.002 |
| First Meaningful Paint | 7.1 s |
| Time to Interactive | 12.5 s |
| Reduce initial server response time | Root document took 1,250 ms |
| Total Blocking Time | 810 ms |
| apple touch icon | ❌ |
| **Aria** | |
| aria-allowed-attr | ✅ |
| aria-hidden-body | ✅ |
| aria-hidden-focus | ❌ |
| aria-required-attr | ✅ |
| aria-roles | ✅ |
| aria-valid-attr | ✅ |
| aria-valid-attr-value | ✅ |

### JavaScript execution time

<details><summary>description</summary>
  
  Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn more](https://web.dev/bootup-time/).
  
  </details>

- Unit
  - millisecond
- wastedMs
  - 960.06

| URL | Total CPU Time | Script Evaluation | Script Parse |
| --- | --- | --- | --- |
| http://search.11st.co.kr/js/searchFront/bundle/vendor~app.chunk.js?v=v_123 | 3032.42 | 858.14 | 10.36 |
| http://search.11st.co.kr/MW/search?searchKeyword=%25EB%2585%25B8%25ED%258A%25B8%25EB%25B6%2581 | 403.15 | 12.7 | 25.9 |
| Unattributable | 370.52 | 5.76 | 0.3 |
| http://c.m.011st.com/MW/js/rake/bundle/rake.bundle-0.0.2.js | 52.6 | 45.93 | 0.97 |
