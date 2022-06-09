#! /bin/bash
yarn decompress-folder
yarn test l2s --mode once naver https://www.naver.com &&
yarn test l2s --mode once 11st-mw-keyword-laptop http://search.11st.co.kr/MW/search?searchKeyword=%25EB%2585%25B8%25ED%258A%25B8%25EB%25B6%2581&decSearchKeyword=%25EB%2585%25B8%25ED%258A%25B8%25EB%25B6%2581#_filterKey=1648181889888 
yarn compress-folder