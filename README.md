# nodebird
- sequelize 설치
    - config
    - migrations
    - models
    - seeders

- 폴더 생성
    - view (템플릿 파일)
    - routes (라우터 파일)
    - public (정적 파일)
    - passport (passport 패키지)

- DB 연결
```console
$ npx sequelize db:create

Sequelize CLI [Node: 14.15.4, CLI: 6.2.0, ORM: 6.5.0]

Loaded configuration file "config/config.json".
Using environment "development".
Database nodebird created.
```

- Passport 모듈로 로그인 구현
```console
$ npm i passport passport-local passport-kakao bcrypt
```

- 로그인
    1. 라우터를 통해 로그인 요청이 들어옴
    1. 라우터에서 passport.authenticate 메서드 호출
    1. 로그인 전략 수행 (local / kakao)
    1. 로그인 성공 시 사용자 정보 객체와 함께 req.login 호출
    1. req.login 메서드가 passport.serializeUser 호출
    1. req.session 에 사용자 아이디만 저장
    1. 로그인 완료

- 로그인 이후
    1. 요청이 들어옴
    1. 라우터에 요청이 도달하기 전에 passport.session 미들웨어가  
    passport.deserializeUser 메서드 호출
    1. req.session 에 저장된 아이디로 데이터베이스에서 사용자 조회
    1. 조회된 사용자 정보를 req.user 에 저장
    1. 라우터에서 req.user 객체 사용 가능
