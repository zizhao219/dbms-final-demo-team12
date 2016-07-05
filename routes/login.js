var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var Article = require('../models/Article');
var Used = require('../models/used');
var async = require('async');
var used = new Used();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    member : null,

  });
});


router.get('/members/:memberId', function(req, res) {
  //console.log('d');
  //console.log(req.params);
  Member1.get(req.params.memberId, function(err, member) {
    if(err) {
      res.status(err.code);
      res.json(err);
    } else {
      res.json(member);
    }
  })

});


router.post('/', function(req, res, next) {

  console.log(req.body.account);
  var newMember = new Member({
    account : req.body.account,
    password : req.body.password
  });

  newMember.check(function(err,member2) {
    if(err) {
      next(err);
    } else {
      //再重新導向之前，我們要讓使用者登入，因此我們需要使用到session
      if(member2!=undefined)
      {

      req.session.member = member2;
      global.nexist = null;
      if(member2.account ==1) //admin
      {
      global.member = member2;

      }

      res.redirect('/');
    }

      else {
          req.session.member = null;

          res.locals.used =used; //locals -> ejs
            res.render('login', {
              member : null,


            });

      }
    }
  });


});

router.post('/logout', function(req, res, next) {
  req.session.member = null;
  delete global.member;
  res.redirect('/');
});


module.exports = router;
