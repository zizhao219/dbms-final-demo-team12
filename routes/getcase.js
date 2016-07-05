var express = require('express');
var router = express.Router();
var Status = require('../models/Status');
var Qualify = require('../models/Qualify');

router.post('/', function(req, res, next) {

  if(!req.session.member) {
    res.redirect('/');
  }

  var b= req.session.member.id;

  Status.get(b,function(err,arow){
    var i = req.body.take;
    var d = arow.SID;
    if(err)
    {
      console.log('no enter');
      res.redirect('/');
    }

    else{

      Qualify.find(i,d,function(cb,list){  //exist?

          if(list!=undefined){
            res.redirect('/');
          }
          else{
            Qualify.create(i,d,function(cb){
              if(err)
              {

                res.redirect('/');
              }
              else{
                  res.redirect('/Astatus'); //?? other place?
              }

            }
          );

          }

      });


    }

  });





});

module.exports = router;
