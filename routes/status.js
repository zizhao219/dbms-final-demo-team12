var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var Status = require('../models/Status');
var Schedule = require('../models/MemberClass');
var async = require('async');

router.get('/', function(req, res) {

  if(!req.session.member) {
    res.redirect('/');
  }

  res.render('status', {
    member : req.session.member || null,

  });
});


router.post('/', function(req, res) {
// id doesn't exist in newmember at the begin
    if(!req.session.member) {

    res.redirect('/');
  }

  var msid = req.body.SID;
  var mid = req.session.member.id;


  var newStatus = new Status({
    SID : msid,
    Name : req.body.Name,
    Department : req.body.Department,
    Grade : req.body.Grade,
    Sex : req.body.Sex,
    Phone :req.body.Phone,
    Email : req.body.Email,
    myhr: 0,
    ID: mid
  });

  var newSchedule = new Schedule({
    SID : msid,
    Mon_9_12: req.body.mon9 ? 1 : 0,
    Mon_13_17: req.body.mon13 ? 1 : 0,
    Tue_9_12: req.body.tue9 ? 1 : 0,
    Tue_13_17: req.body.tue13 ? 1 : 0,
    Wed_9_12: req.body.wed9 ? 1 : 0,
    Wed_13_17: req.body.wed13 ? 1 : 0,
    Thu_9_12: req.body.thu9 ? 1 : 0,
    Thu_13_17: req.body.thu13 ? 1 : 0,
    Fri_9_12: req.body.fri9 ? 1 : 0,
    Fri_13_17:req.body.fri13 ? 1 : 0,
    ID1: mid
  });

  newStatus.record(function(err) {
    if(err) {
      res.status = err.code;
      res.json(err);
    } else {
      newSchedule.record(function(err) {

        if(err) {
          res.status = err.code;
          res.json(err);
        } else {
          global.nexist =null;
          res.redirect("/");
        }
      });
    }
  });


});




module.exports = router;
