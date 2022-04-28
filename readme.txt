1분코딩 - 최소 설정으로 웹팩 써보기
https://github.com/jmyoow/webpack-js-html
https://youtu.be/pzHMT9Jxce0

html별로 js 만들기 참고 링크
① https://github.com/dimorin/webpack-js-html
② 여러 html을 각각 번들링 하기 https://choiyb2.tistory.com/96
③ output - 여러파일 번들링 https://velog.io/@khw970421/Webpack-5%EC%9E%A5-output-%EC%97%AC%EB%9F%AC%ED%8C%8C%EC%9D%BC-%EB%B2%88%EB%93%A4%EB%A7%81
④ Webpack - 7. output 설정 https://youtu.be/dt2xU71pX88
⑤ https://github.com/puikinsh/Adminator-admin-dashboard/blob/master/webpack/plugins/htmlPlugin.js

webpack.config.js 정리 참고링크
https://github.com/puikinsh/Adminator-admin-dashboard

MiniCssExtractPlugin
https://webpack.js.org/plugins/mini-css-extract-plugin/#minimal-example

1. 패키지 설치
터미널에 아래 점선 사이의 내용을 붙여 넣고 엔터를 누르세요.
----------
npm i -D @babel/cli @babel/core @babel/preset-env babel-loader clean-webpack-plugin copy-webpack-plugin core-js cross-env html-webpack-plugin source-map-loader terser-webpack-plugin webpack webpack-cli webpack-dev-server css-loader style-loader sass sass-loader mini-css-extract-plugin
----------
npm i bootstrap
npm i bootstrap-icons
npm i axios
npm i @toast-ui/chart

2. 개발용 서버 구동
터미널에 아래 점선 사이의 내용을 붙여 넣고 엔터를 누르세요.
----------
npm start
----------

3. 빌드(배포용 파일 생성)
터미널에 아래 점선 사이의 내용을 붙여 넣고 엔터를 누르세요.
----------
npm run build
----------

(!)
npm start 또는 npm run build 실행 시 에러가 난다면 Node.js를 LTS 버전(장기 지원 버전)으로 설치 후 다시 시도해 보세요.
터미널에 아래 점선 사이의 내용을 붙여 넣고 엔터를 누르면 설치할 수 있어요.
----------
n lts
----------

(!)
ERROR in unable to locate '경로...'
위와 같은 에러가 발생한다면, webpack.config.js의 CopyWebpackPlugin에 설정된 파일이 있는지 확인해주세요.
CSS나 이미지 폴더 등이 필요하지 않다면 webpack.config.js에서 CopyWebpackPlugin 부분 전체를 주석 처리 해주세요.