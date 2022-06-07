const VALID_SITES = new Map([
  [
    '11st-laptop',
    'http://search.11st.co.kr/MW/search?searchKeyword=%25EB%2585%25B8%25ED%258A%25B8%25EB%25B6%2581&decSearchKeyword=%25EB%2585%25B8%25ED%258A%25B8%25EB%25B6%2581#_filterKey=1648181889888',
  ],
  ['naver', 'https://www.naver.com'],
  ['google', 'https://www.google.com'],
]);

const COLLECTED_METRICS = new Map(['bootup-time', 'first-contentful-paint'].map((x) => [x, null]));

module.exports = {
  VALID_SITES,
  COLLECTED_METRICS,
};
