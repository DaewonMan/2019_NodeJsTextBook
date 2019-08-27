const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');

const router = express.Router();

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { title: '내 정보 - mysnsproject', user: req.user });
});

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', {
        title: '회원가입 - mysnsproject',
        user: req.user,
        nowYear: new Date().getFullYear(),
        joinError: req.flash('joinError'),
    });
});

router.get('/', async (req, res, next) => {
    //console.log(req.user);
    if(req.user) {
        var waveUser = req.user;
        var wm_id = req.query.wave_id;
        if(wm_id != null) {
            waveUser = await User.findOne({ where: { wm_id } }); // 파도탄 인원 정보
        }
        res.render('contentArea', {
            title: 'MySnsProject',
            twits: [],
            user: req.user,
            waveUser: waveUser,
            loginError: req.flash('loginError'),
        });
    } else {
        return res.redirect('/login');
    }
    
});

//temp test
router.get('/test', (req, res) => {
    res.render('first', {
        title: '환영합니다 DWM SNS에 오신걸!',
        user: req.user,
        testError: req.flash('testError'),
    });
});

//login test
router.get('/login', (req, res) => {
    res.render('login', {
        title: '환영합니다 DWM SNS에 오신걸!',
        user: req.user,
        testError: req.flash('loginError'),
    });
});

module.exports = router;