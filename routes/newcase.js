var express = require('express');
var router = express.Router();
var async = require('async');
var Case = require('../models/Case');
var Member = require('../models/Member');

router.get('/',function(req,res){

  if(!global.member) //global
  {
    res.redirect('/');
  }

  res.render('newcase', {
    member : req.session.member || null,
  });

});

router.post('/',function(req,res){

  if(!global.member) //global
  {
    res.redirect('/');
  }
  else
  {
    var newCase = new Case({ //new Case


      CName: req.body.CName,
      Date_1: req.body.Date_1,
      Time:req.body.Time,
      Week:req.body.Week,
      HR:req.body.hr,
      Description:req.body.Description

    }); //({}) ==options


    newCase.record(function(err){

        if(err)
        {
          res.status = err.code;
          res.json(err);
        }
        else
        {
            res.redirect('/');
        }


    }); //use function()= def use
  }

});

module.exports = router;
