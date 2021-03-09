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

// 로그인
describe('POST /login', () =>{
    test('가입되지 않은 회원', async (done) => {
        const message = encodeURIComponent('가입되지 않은 회원입니다.');
        request(app)
            .post('/auth/login')
            .send({
                email: 'test1@test.com',
                password: 'test1',
            })
            .expect('Location', `/?loginError=${message}`)
            .expect(302, done);
    });

    test('로그인 수행', async (done) => {
        request(app)
            .post('/auth/login')
            .send({
                email: 'test@test.com',
                password: 'test',
            })
            .expect('Location', '/')
            .expect(302, done);
    });

    test('비밀번호 틀림', async (done) => {
        const message = encodeURIComponent('비밀번호가 일치하지 않습니다.');
        request(app)
            .post('/auth/login')
            .send({
                email: 'test@test.com',
                password: 'wrong',
            })
            .expect('Location', `/?loginError=${message}`)
            .expect(302, done);
    });
});

// 로그아웃
describe('GET /logout', () => {
    test('로그인되어 있지 않으면 403', async (done) => {
        request(app)
            .get('/auth/logout')
            .expect(403, done);
    });

    const agent = request.agent(app);
    beforeEach((done) => {
        agent
            .post('/auth/login')
            .send({
                email: 'test@test.com',
                password: 'test',
            })
            .end(done);
    });

    test('로그아웃 수행', async (done) => {
        const message = encodeURIComponent('비밀번호가 일치하지 않습니다.');
        agent
            .get('/auth/logout')
            .expect('Location', '/')
            .expect(302, done);
    });
});

afterAll(async () => {
    // 테이블 재생성
    await sequelize.sync({ force: true });
});