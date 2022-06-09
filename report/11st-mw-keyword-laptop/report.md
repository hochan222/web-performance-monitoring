# Web Performance Report

| Accessibility | Best Practices | Performance | PWA | SEO |
| :---: | :---: | :---: | :---: | :---: |
| 🟢 96 | 🟠 75 | 🔴 36 | 🔴 30 | 🟠 74 |

| Category | Score |
| --- | --- |
| **Basic Metrics** | |
| JavaScript execution time | 1.1 s |
| First Contentful Paint | 2.3 s |
| Largest Contentful Paint | 13.4 s |
| Speed Index | 8.2 s |
| Cumulative Layout Shift | 0.002 |
| First Meaningful Paint | 7.1 s |
| Time to Interactive | 11.8 s |
| Reduce initial server response time | Root document took 1,100 ms |
| Total Blocking Time | 860 ms |
| apple touch icon | ❌ |
| **Aria** | |
| [aria-allowed-attr](https://web.dev/aria-allowed-attr/) | ✅ |
| [aria-hidden-body](https://web.dev/aria-hidden-body/) | ✅ |
| [aria-hidden-focus](https://web.dev/aria-hidden-focus/) | ❌ |
| [aria-required-attr](https://web.dev/aria-required-attr/) | ✅ |
| [aria-roles](https://web.dev/aria-roles/) | ✅ |
| [aria-valid-attr](https://web.dev/aria-valid-attr/) | ✅ |
| [aria-valid-attr-value](https://web.dev/aria-valid-attr-value/) | ✅ |
| [button-name](https://web.dev/button-name/) | ✅ |
| [bypass](https://web.dev/bypass/) | ✅ |
| [custom-controls-labels](https://web.dev/custom-controls-labels/) | It is for reference only. |
| [custom-controls-roles](https://web.dev/custom-controls-roles/) | It is for reference only. |
| **HTML** | |
| [charset](https://web.dev/charset/) | ✅ |
| [crawlable-anchors](https://web.dev/crawlable-anchors/) | ❌ |
| [definition-list](https://web.dev/definition-list/) | ✅ |
| [deprecations](https://web.dev/deprecations/) | ✅ |
| [dlitem](https://web.dev/dlitem/) | ✅ |
| [doctype](https://web.dev/doctype/) | ✅ |
| [document-title](https://web.dev/document-title/) | ✅ |
| **Style** | |
| [color-contrast](https://web.dev/color-contrast/) | ❌ |
| [content-width](https://web.dev/content-width/) | ✅ |

### JavaScript execution time

<details><summary>description</summary>
  
  Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn more](https://web.dev/bootup-time/).
  
  </details>

- Unit
  - millisecond
- wastedMs
  - 1127.87

| URL | Total CPU Time | Script Evaluation | Script Parse |
| --- | --- | --- | --- |
| http://search.11st.co.kr/js/searchFront/bundle/vendor~app.chunk.js?v=v_123 | 2976.41 | 886.18 | 8.27 |
| http://search.11st.co.kr/MW/search?searchKeyword=%25EB%2585%25B8%25ED%258A%25B8%25EB%25B6%2581 | 649.96 | 15.86 | 35.39 |
| Unattributable | 387.26 | 4.77 | 0.31 |
| http://m.11st.co.kr/MW/js/rake/rakeLog-mobile-1.0.2.js | 81.24 | 76.22 | 3.18 |
| http://search.11st.co.kr/js/searchFront/bundle/vendor~Kukkuk_v_123~Present_v_123~Review_v_123~Totalv_123.chunk.js | 55.64 | 47.95 | 4.26 |
| http://c.m.011st.com/MW/js/rake/bundle/rake.bundle-0.0.2.js | 53.57 | 44.44 | 1.04 |

### Avoid chaining critical requests

<details><summary>description</summary>
  
  The Critical Request Chains below show you what resources are loaded with a high priority. Consider reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load. [Learn more](https://web.dev/critical-request-chains/).
  
  </details>

7 chains found
|  | duration | length | transferSize |
| :---: | :---: | :---: | :---: |
| longestChain | 1699.3 | 3 | 429993 |

### Ensure CSP is effective against XSS attacks

<details><summary>description</summary>
  
  A strong Content Security Policy (CSP) significantly reduces the risk of cross-site scripting (XSS) attacks. [Learn more](https://web.dev/csp-xss/)
  
  </details>

| Description | Directive | Severity |
| :---: | :---: | :---: |
| No CSP found in enforcement mode | - | High |

### 🔴 Cumulative Layout Shift

<details><summary>description</summary>
  
  Cumulative Layout Shift measures the movement of visible elements within the viewport. [Learn more](https://web.dev/cls/).
  
  </details>

| cumulativeLayoutShiftMainFrame | totalCumulativeLayoutShift |
| :---: | :---: |
| 0.0023193371295928958 | 0.0023193371295928958 |

### Diagnostics

<details><summary>description</summary>
  
  Collection of useful page vitals.
  
  </details>

| mainDocumentTransferSize | maxRtt | maxServerLatency | numFonts | numRequests | numScripts | numStylesheets | numTasks | numTasksOver10ms | numTasksOver25ms | numTasksOver50ms | numTasksOver100ms | numTasksOver500ms | rtt | throughput | totalByteWeight | totalTaskTime |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 88142 | 86.35 | 111.71 | 2 | 128 | 16 | 2 | 4845 | 11 | 5 | 4 | 3 | - | 4.86 | 30020914.49 | 2457943 | 1099.09 |

### 🔴 Avoid an excessive DOM size

<details><summary>description</summary>
  
  A large DOM will increase memory usage, cause longer [style calculations](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations), and produce costly [layout reflows](https://developers.google.com/speed/articles/reflow). [Learn more](https://web.dev/dom-size/).
  
  </details>

| Statistic | Element | Value |
| :---: | :---: | :---: |
| Total DOM Elements | - | 9647 |
| Maximum DOM Depth | dl > div.c-card-item__name > dd > a | 21 |
| Maximum Child Elements | section#cts > div > div.l-grid > ul.l-grid__row | 60 |
