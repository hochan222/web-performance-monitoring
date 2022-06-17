yarn decompress

yarn test l2s --mode once 11st-mw-keyword-airline-ticket "https://search.11st.co.kr/MW/search?searchKeyword=%ED%95%AD%EA%B3%B5%EA%B6%8C" &&
yarn test l2s --mode once 11st-mw-keyword-dyson-airwrap "https://search.11st.co.kr/MW/search?searchKeyword=%EB%8B%A4%EC%9D%B4%EC%8A%A8%20%EC%97%90%EC%96%B4%EB%9E%A9" &&
yarn test l2s --mode once 11st-mw-keyword-bibigo "https://search.11st.co.kr/MW/search?searchKeyword=%EB%B9%84%EB%B9%84%EA%B3%A0" &&
yarn test l2s --mode once 11st-mw-keyword-iPhone-13-pro "https://search.11st.co.kr/MW/search?searchKeyword=iPhone%2013%20Pro" &&
yarn test l2s --mode once 11st-mw-keyword-cake "https://search.11st.co.kr/MW/search?searchKeyword=%EC%BC%80%EC%9D%B4%ED%81%AC" &&
yarn test l2s --mode once 11st-mw-keyword-laptop "https://search.11st.co.kr/MW/search?searchKeyword=%EB%85%B8%ED%8A%B8%EB%B6%81" &&


yarn test l2s --mode once 11st-mw-keyword-airline-ticket "https://search.11st.co.kr/MW/search?searchKeyword=%ED%95%AD%EA%B3%B5%EA%B6%8C" fast &&
yarn test l2s --mode once 11st-mw-keyword-dyson-airwrap "https://search.11st.co.kr/MW/search?searchKeyword=%EB%8B%A4%EC%9D%B4%EC%8A%A8%20%EC%97%90%EC%96%B4%EB%9E%A9" fast &&
yarn test l2s --mode once 11st-mw-keyword-bibigo "https://search.11st.co.kr/MW/search?searchKeyword=%EB%B9%84%EB%B9%84%EA%B3%A0" fast &&
yarn test l2s --mode once 11st-mw-keyword-iPhone-13-pro "https://search.11st.co.kr/MW/search?searchKeyword=iPhone%2013%20Pro" fast &&
yarn test l2s --mode once 11st-mw-keyword-cake "https://search.11st.co.kr/MW/search?searchKeyword=%EC%BC%80%EC%9D%B4%ED%81%AC" fast &&
yarn test l2s --mode once 11st-mw-keyword-laptop "https://search.11st.co.kr/MW/search?searchKeyword=%EB%85%B8%ED%8A%B8%EB%B6%81" fast &&

yarn test 11st-keywords &&
yarn test 11st-keywords fast 

rm -rf persistentData/11st-mw-keyword-airline-ticket
rm -rf persistentData/11st-mw-keyword-airline-ticket-fast
rm -rf persistentData/11st-mw-keyword-dyson-airwrap
rm -rf persistentData/11st-mw-keyword-dyson-airwrap-fast
rm -rf persistentData/11st-11st-mw-keyword-bibigo
rm -rf persistentData/11st-11st-mw-keyword-bibigo-fast
rm -rf persistentData/11st-mw-keyword-iPhone-13-pro
rm -rf persistentData/11st-mw-keyword-iPhone-13-pro-fast
rm -rf persistentData/11st-mw-keyword-cake
rm -rf persistentData/11st-mw-keyword-cake-fast