const request = require('supertest');   // app.listen 을 수행하지 않고도 서버 라우터를 실행가능
const { sequelize } = require('../models');
const app = require('../app');

// beforeAll: 테스트를 실행하기 전에 수행되는 코드
// afterAll: 모든 테스트가 끝난 후
// beforeEach: 각각의 테스트 수행 전
// afterEach: 각각의 테스트 수행 후
beforeAll(async() => {
    await sequelize.sync(); // 데이터베이스에 테이블을 생성
});

// 회원가입 테스트
describe('POST /join', () =>{
    test('로그인 안 했으면 가입', (done) => {
        request(app)
            .post('/auth/join')
            .send({
                email: 'test@test.com',
                nick: 'tester',
                password: 'test',
            })
            .expect('Location', '/')
            .expect(302, done);
    });
});

// 로그인 한 상태에서 회원가입 시도 테스트
describe('POST /login', () =>{
    // agent: 하나 이상의 요청에서 재사용 가능
    const agent = request.agent(app);
    beforeEach((done) => {
        agent
            .post('/auth/login')
            .send({
                email: 'test@test.com',
                password: 'test',
            })
            .end(done); // .end(done) : beforeEach 함수가 마무리되었음을 알림
    });

    test('이미 로그인했으면 redirect /', async (done) => {
        const message = encodeURIComponent('로그인한 상태입니다.');
        // 로그인 된 agent 로 회원가입 테스트를 진행
        agent
            .post('/auth/join')
            .send({
                email: 'test@test.com',
                nick: 'tester',
                password: 'test',
            })
            .expect('Location', `/?error=${message}`)
            .expect(302, done);
    });
});

afterAll(async () => {
    // 테이블 재생성
    await sequelize.sync({ force: true });
});