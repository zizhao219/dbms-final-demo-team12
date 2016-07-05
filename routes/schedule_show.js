var express = require('express');
var router = express.Router();
var Schedule = require('../models/MemberClass');
var async = require('async');

router.get('/', function(req, res) {
  if(!req.session.member) {
    res.redirect('/');
  }

  //var json = JSON.stringify(req.session.member);
  //console.log('j'+json);

Schedule.get(req.session.member.id,function(err,schedule){

    if(err)
    {
      console.log(err);
      next();
    } else {

      res.render('schedule_show', {
        member : req.session.member || null,
        schedule : schedule,
        schedulelist :null
      });
    }
  });

});

router.post('/:show',function(req,res){
  if(!req.session.member) {

    res.redirect('/');

  }

  else{

      Schedule.getAll(function(err,schedulelist){

        if(err) {
          res.status = err.code;
          res.json(err);
        }

        else{
          console.log('list:'+schedulelist);

          res.render('all_schedule',{

            schedulelist: schedulelist
        });

        }
      });

  }

});

module.exports = router;
