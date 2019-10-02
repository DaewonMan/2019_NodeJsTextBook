const express = require('express');
const multer = require('multer');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

//onst Room = require('../schemas/room');
//const Chat = require('../schemas/chat');
const User = require('../schemas/user');

const router = express.Router();

router.get('/join/check', async (req, res, next) => {
  try {
    const userEx = await User.findOne({wst_id: req.query.id});
    //const exitUser = await User.findOne({});
    //var userEx;
    /*
    if (exitUser) {
        userEx = await User.findOne({wst_id: res.body.id});
    } else {
        //userEx = await User.insertOne({id: res.body.id});
        userEx = false;
    }*/
    
    var userResult = "";
    if(userEx) {
        userResult = "NO";
    } else {
        userResult = "OK";
    }
    return res.json(userResult);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//const upload = multer();
//router.get('/join/do', isNotLoggedIn, upload.none(), async (req, res, next) => {
  router.get('/join/do', isNotLoggedIn, async (req, res, next) => {
    try {
        //const hash = await bcrypt.hash(req.body.pw, 12);
        const hash = await bcrypt.hash(req.query.pw, 12);
        const user = new User({
            wst_id: req.query.id,
            wst_password: hash,
          });
          const newUser = await User.create(user);

          var userResult = "";
        if(newUser) {
            userResult = "OK";
        } else {
            userResult = "NO";
        }
        return res.json(userResult);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

  router.post('/login', (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
      if (authError) {
        console.error(authError);
        return next(authError);
      }
      if (!user) {
        req.flash('loginError', info.message);
        return res.redirect('/login');
      }
      return req.login(user, (loginError) => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        return res.redirect('/');
      });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
  });
  
  //router.get('/logout', isLoggedIn, (req, res) => {
  router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
  });
  
  /*
  router.get('/kakao', passport.authenticate('kakao'));
  
  router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
  }), (req, res) => {
    res.redirect('/');
  });
*/
module.exports = router;