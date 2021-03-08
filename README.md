# nodebird
> [시퀄라이즈 문서](https://sequelize.org/)  
[데이터베이스 설명](https://ko.wikipedia.org/wiki/데이터베이스)  
[MySQL 매뉴얼](https://dev.mysql.com/doc/refman/8.0/en)  
[워크벤치 매뉴얼](https://dev.mysql.com/doc/workbench/en)

## 추가기능
- [x] 팔로잉 끊기
- [x] 프로필 정보 변경하기
- [ ] 게시글 좋아요 누르기 및 좋아요 취소하기
- [x] 게시글 삭제하기
- [ ] deserializeUser 캐싱하기

---
## sequelize 설치  
* config
* migrations
* models
* seeders

## 폴더 생성
* view (템플릿 파일)
* routes (라우터 파일)
* public (정적 파일)
* passport (passport 패키지)

## DB 연결
```console
$ npx sequelize db:create

Sequelize CLI [Node: 14.15.4, CLI: 6.2.0, ORM: 6.5.0]

Loaded configuration file "config/config.json".
Using environment "development".
Database nodebird created.
```
* 로컬 mysql
```console
$ brew services start mysql

# 콘솔 접속
$ mysql -h localhost -u root -p
```

## Passport 모듈로 로그인 구현
```console
$ npm i passport passport-local passport-kakao bcrypt
```

1. 로그인
    1. 라우터를 통해 로그인 요청이 들어옴
    1. 라우터에서 passport.authenticate 메서드 호출
    1. 로그인 전략 수행 (local / kakao)
    1. 로그인 성공 시 사용자 정보 객체와 함께 req.login 호출
    1. req.login 메서드가 passport.serializeUser 호출
    1. req.session 에 사용자 아이디만 저장
    1. 로그인 완료

2.  로그인 이후
    1. 요청이 들어옴
    1. 라우터에 요청이 도달하기 전에 passport.session 미들웨어가  
    passport.deserializeUser 메서드 호출
    1. req.session 에 저장된 아이디로 데이터베이스에서 사용자 조회
    1. 조회된 사용자 정보를 req.user 에 저장
    1. 라우터에서 req.user 객체 사용 가능


## 카카오 로그인 
[카카오 로그인용 애플리케이션 등록](https://deveoplers.kakao.com)
- 로그인 > 내 애플리케이션 > **애플리케이션 추가하기**
- 앱 생성 후 화면에서 **REST API 키**를 복사하여 .env 파일에 저장
> KAKAO_ID=c551234555......22afd1d35bd
- 앱 설정 > 플랫폼 > Web 플랫폼 등록 (사이트 도메인 입력)
> http://localhost:8001
- 제품설정 > 카카오 로그인 > 활성화 설정 **ON**
- Redirect URL 설정  
(kakaoStrategy.js 의 callbackURL)
> http://localhost:8001/auth/kakao/callback
- 제품설정 > 카카오 로그인 > 동의항목 > 로그인 동의항목 작성  
예제에서는 email 이 반드시 필요  
감ㅅ이 없는 경우를 대비해 **카카오 계정으로 정보 수집 후 제공** 체크 후 저장

# 테스트코드
## 테스트 커버리지
- 스크립트 추가
```json
"scripts": {
    ..
    "coverage": "jest --coverage"
  },
```
- 실행
> $ npm run coverage

- Result
```console
-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------|---------|----------|---------|---------|-------------------
All files        |      84 |      100 |      60 |      84 |                   
 controllers     |     100 |      100 |     100 |     100 |                   
  user.js        |     100 |      100 |     100 |     100 |                   
 models          |   33.33 |      100 |       0 |   33.33 |                   
  user.js        |   33.33 |      100 |       0 |   33.33 | 5-49              
 routes          |     100 |      100 |     100 |     100 |                   
  middlewares.js |     100 |      100 |     100 |     100 |                   
-----------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        1.978 s, estimated 2 s
```
