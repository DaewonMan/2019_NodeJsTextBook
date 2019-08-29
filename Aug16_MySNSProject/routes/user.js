const express = require('express');

const { isLoggedIn } = require('./middlewares');
const { User, Post } = require('../models');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    await user.addFollowing(parseInt(req.params.id, 10));
    res.send('success');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/* 파도타기 */
router.get('/wave', async (req, res, next) => {
  //console.log(req.user);
  if(req.user) {
      var waveUser = req.user;
      var wm_id = req.query.wave_id;
      var wp_id = req.user.wm_id;
      var posts;
      if(wm_id != null) {
          wp_id = req.query.wave_id; // 파도탄 인원의 아이디로 변경
          waveUser = await User.findOne({ where: { wm_id } }); // 파도탄 인원 정보
      }
      posts = await Post.findAll({ where: { wp_id } });
      
      res.render('contentArea', {
          title: 'MySnsProject',
          twits: [],
          user: req.user,
          waveUser: waveUser,
          post: posts,
          loginError: req.flash('loginError'),
      });
  } else {
      return res.redirect('/login');
  }
  
});

module.exports = router;