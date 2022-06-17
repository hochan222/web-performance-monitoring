#! /bin/bash
yarn decompress

yarn test l2s --mode once naver-mw "https://m.shopping.naver.com/home/m/index.naver" &&
yarn test l2s --mode once naver-mw-keyword-laptop "https://msearch.shopping.naver.com/search/all?query=%EB%85%B8%ED%8A%B8%EB%B6%81&frm=NVSHSRC&vertical=home" &&
yarn test l2s --mode once coupang-mw "https://m.coupang.com/nm/" &&
yarn test l2s --mode once coupang-mw-keyword-laptop "https://m.coupang.com/nm/search?q=%EB%85%B8%ED%8A%B8%EB%B6%81" &&
yarn test l2s --mode once gmarket-mw "https://m.gmarket.co.kr/" &&
yarn test l2s --mode once gmarket-mw-keyword-laptop "https://browse.gmarket.co.kr/m/search?keyword=%EB%85%B8%ED%8A%B8%EB%B6%81" &&
yarn test l2s --mode once ssg-mw "http://m.ssg.com/" &&
yarn test l2s --mode once ssg-mw-keyword-laptop "http://m.ssg.com/search.ssg?query=laptop" &&
yarn test l2s --mode once wemakeprice-mw "https://mw.wemakeprice.com/main" &&
yarn test l2s --mode once wemakeprice-mw-keyword-laptop "https://msearch.wemakeprice.com/search?keyword=%EB%85%B8%ED%8A%B8%EB%B6%81&tab=main&_service=5" &&
yarn test l2s --mode once tmon-mw "https://m.tmon.co.kr/" &&
yarn test l2s --mode once tmon-mw-keyword-laptop "http://m.search.tmon.co.kr/search?useArtistchaiRegion=Y#_=1655137593350&keyword=%EB%85%B8%ED%8A%B8%EB%B6%81&sortType=POPULAR&thr=ms&useTypoCorrection=true" &&
yarn test l2s --mode once 11st-mw "http://m.11st.co.kr/page/main/home" &&
yarn test l2s --mode once 11st-mw-keyword-laptop "http://search.11st.co.kr/MW/search?searchKeyword=%25EB%2585%25B8%25ED%258A%25B8%25EB%25B6%2581&decSearchKeyword=%25EB%2585%25B8%25ED%258A%25B8%25EB%25B6%2581#_filterKey=16481818898" &&

yarn test l2s --mode once naver-mw "https://m.shopping.naver.com/home/m/index.naver" fast &&
yarn test l2s --mode once naver-mw-keyword-laptop "https://msearch.shopping.naver.com/search/all?query=%EB%85%B8%ED%8A%B8%EB%B6%81&frm=NVSHSRC&vertical=home" fast &&
yarn test l2s --mode once coupang-mw "https://m.coupang.com/nm/" fast &&
yarn test l2s --mode once coupang-mw-keyword-laptop "https://m.coupang.com/nm/search?q=%EB%85%B8%ED%8A%B8%EB%B6%81" fast &&
yarn test l2s --mode once gmarket-mw "https://m.gmarket.co.kr/" fast &&
yarn test l2s --mode once gmarket-mw-keyword-laptop "https://browse.gmarket.co.kr/m/search?keyword=%EB%85%B8%ED%8A%B8%EB%B6%81" fast &&
yarn test l2s --mode once ssg-mw "http://m.ssg.com/" fast &&
yarn test l2s --mode once ssg-mw-keyword-laptop "http://m.ssg.com/search.ssg?query=laptop" fast &&
yarn test l2s --mode once wemakeprice-mw "https://mw.wemakeprice.com/main" fast &&
yarn test l2s --mode once wemakeprice-mw-keyword-laptop "https://msearch.wemakeprice.com/search?keyword=%EB%85%B8%ED%8A%B8%EB%B6%81&tab=main&_service=5" fast &&
yarn test l2s --mode once tmon-mw "https://m.tmon.co.kr/" fast &&
yarn test l2s --mode once tmon-mw-keyword-laptop "http://m.search.tmon.co.kr/search?useArtistchaiRegion=Y#_=1655137593350&keyword=%EB%85%B8%ED%8A%B8%EB%B6%81&sortType=POPULAR&thr=ms&useTypoCorrection=true" fast &&
yarn test l2s --mode once 11st-mw "http://m.11st.co.kr/page/main/home" fast &&
yarn test l2s --mode once 11st-mw-keyword-laptop "http://search.11st.co.kr/MW/search?searchKeyword=%25EB%2585%25B8%25ED%258A%25B8%25EB%25B6%2581&decSearchKeyword=%25EB%2585%25B8%25ED%258A%25B8%25EB%25B6%2581#_filterKey=16481818898" fast &&

yarn test diff &&
yarn test diff fast 

rm -rf persistentData/naver-mw
rm -rf persistentData/naver-mw-keyword-laptop
rm -rf persistentData/coupang-mw
rm -rf persistentData/coupang-mw-keyword-laptop
rm -rf persistentData/gmarket-mw
rm -rf persistentData/gmarket-mw-keyword-laptop
rm -rf persistentData/ssg-mw
rm -rf persistentData/ssg-mw-keyword-laptop
rm -rf persistentData/wemakeprice-mw
rm -rf persistentData/wemakeprice-mw-keyword-laptop
rm -rf persistentData/tmon-mw
rm -rf persistentData/tmon-mw-keyword-laptop
rm -rf persistentData/11st-mw
rm -rf persistentData/11st-mw-keyword-laptop

yarn compress