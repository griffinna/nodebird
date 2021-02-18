const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
    // 템플릿 엔진에서 공통으로 사용하는 값을 res.locals 에 넣음
    res.locals.user = req.user; // 넌적스에서 user 객체를 통해 사용자 정보에 접근 가능
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followerIdList = [];
    next();
});

router.get('/profile', isLoggedIn, (req, res) => {  // isAuthenticated() 가 true 일때 넘어갈 수 있음
    res.render('profile', { title: '내 정보 - Nodebird' });
});

router.get('/join', isNotLoggedIn, (req, res) => {  // isAuthenticated() 가 false 일때 넘어갈 수 있음
    res.render('join', { title: '회원가입 - NodeBird' });
});

router.get('/', (req, res, next) => {
    const twits = [];
    res.render('main', {
        title: 'NodeBird',
        twits,
    });
});

module.exports = router;