// test(테스트에 대한 설명, 테스트 내용)
// expect(실제 코드).toEqual(예상되는 결괏값)
// test('1 + 1 = 2', () => {
//     expect(1 + 1).toEqual(2);
// })

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

describe('isLoggedIn', () => {
    test('로그인이 되어있으면 isLoggedIn 이 next 를 호출', () => {
        
    });

    test('로그인이 되어있지 않으면 isNotLoggedIn 이 next 를 호출', () => {
        
    });
});

describe('isNotLoggedIn', () => {
    test('로그인이 되어있으면 isLoggedIn 이 next 를 호출', () => {
        
    });

    test('로그인이 되어있지 않으면 isNotLoggedIn 이 next 를 호출', () => {
        
    });
});