var express = require('express');
var User = require('../schemas/user');
var Comment = require('../schemas/comment'); // 내가 추가
var router = express.Router();

router.get('/', function (req, res, next) {
  User.find({})
    .then((users) => {
      res.render('mongoose', { users });
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.get('/', function (req, res, next) {
  // 내가 comment 이벤트 추가
  Comment.find({})
    .then((comments) => {
      res.render('mongoose', { comments });
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;