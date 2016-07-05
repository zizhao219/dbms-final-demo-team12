var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var Status = require('../models/Status');
var async = require('async');

router.get('/', function(req, res) {
  if(!req.session.member) {
    res.redirect('/');
  }

  res.render('statusupdate', {
    member : req.session.member || null
  });
});


router.post('/', function(req, res) {
// id doesn't exist in newmember at the begin
    if(!req.session.member) {

    res.redirect('/');
  }

  console.log('here'+req.session.member.id);
  var newStatus = new Status({
    Name : req.body.Name,
    Grade : req.body.Grade,
    Phone :req.body.Phone,
    Email : req.body.Email,
    ID: req.session.member.id
  });

  console.log('enter');
  newStatus.upday(function(err) {
    if(err) {
      res.status = err.code;
      res.json(err);
    } else {
      res.redirect("/");
    }
  });
});


module.exports = router;
