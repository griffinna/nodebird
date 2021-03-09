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

describe('POST /login', () =>{
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
});