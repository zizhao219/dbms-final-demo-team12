var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var Status = require('../models/Status');
var Qualify = require('../models/Qualify');
var async = require('async');

router.get('/', function(req, res) {
  if(!req.session.member) {
    res.redirect('/');
  }

Status.find1(req.session.member.id,function(err,status){

  var json = JSON.stringify(status);
  console.log('11j'+json);
  //console.log('execute2');
    if(err)
    {
      console.log(err);
      next();
    } else {

      Qualify.show(status.SID,function(err,casename){
        if(err)
        {
          console.log(err);
          next();
        }

        else{
            console.log('case'+casename);
            if(casename ==null || casename ==undefined)
            {
              res.render('AStatus', {
              member : req.session.member || null,
              status : status,
              casename : null
              });
            }

            else{


            console.log('case'+casename);
            console.log('case'+casename[0]);
            console.log('caseCC'+casename[0].CID);
              res.render('AStatus', {
              member : req.session.member || null,
              status : status,
              casename : casename
              });
              }
          }

      });


    }
  });

});

router.post('/', function(req, res) {
  if(!req.session.member) {
    res.redirect('/');
  }
    console.log(req.body.change);
    console.log(req.body.pwd2);

     if(!req.body.pwd2)
    {
      console.log('hg');
        res.redirect('/AStatus');
    }

    else{
    Member.upday(req.body.change,req.body.pwd2,function(err){

      if(err){
        console.log(err);
        next();
      }
      else{
        res.redirect('/AStatus');
      }


  })}

});

module.exports = router;
