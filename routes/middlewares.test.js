// test(테스트에 대한 설명, 테스트 내용)
// expect(실제 코드).toEqual(예상되는 결괏값)
// test('1 + 1 = 2', () => {
//     expect(1 + 1).toEqual(2);
// })

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

describe('isLoggedIn', () => {

    const res = {
        status: jest.fn(() => res),
        send: jest.fn()
    };
    const next = jest.fn();

    test('로그인이 되어있으면 isLoggedIn 이 next 를 호출', () => {
        const req = {
            isAuthenticated: jest.fn(() => true),
        };
        isLoggedIn(req, res, next);
        expect(next).toBeCalledTimes(1);        // 정확하게 몇 번 호출되었는지를 체크하는 메서드
    });

    test('로그인이 되어있지 않으면 isLoggedIn 이 에러를 응답해야 함', () => {
        const req = {
            isAuthenticated: jest.fn(() => false),
        };
        isLoggedIn(req, res, next);
        expect(res.status).toBeCalledWith(403); // 특정 인수와 함께 호출되었는지 확인
        expect(res.send).toBeCalledWith('로그인 필요');
    });
});

describe('isNotLoggedIn', () => {
    const res = {
        redirect: jest.fn(),
    };
    const next = jest.fn();

    test('로그인이 되어있으면 isNotLoggedIn 이 에러를 응답해야 함', () => {
        const req = {
            isAuthenticated: jest.fn(() => true),
        };
        isNotLoggedIn(req, res, next);
        const message = encodeURIComponent('로그인한 상태입니다.');
        expect(res.redirect).toBeCalledWith(`/?error=${message}`);
    });

    test('로그인이 되어있지 않으면 isNotLoggedIn 이 next 를 호출', () => {
        const req = {
            isAuthenticated: jest.fn(() => false),
        };
        isNotLoggedIn(req, res, next);
        expect(next).toBeCalledTimes(1);
    });
});