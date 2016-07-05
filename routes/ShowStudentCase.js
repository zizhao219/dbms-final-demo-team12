var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var Status = require('../models/Status');
var Case =require('../models/Case');
var Qualify = require('../models/Qualify');
var asyn = require('async');
// show all case -> CName , SID

router.get('/',function(req,res,next){

  if(!global.member) {
    res.redirect('/');
  }

    Qualify.getall(function(err,list){
        if(err){
          next() ;
        }
        else{

            asyn.each(list,function(aelement,cb){

              Qualify.union(aelement.CID,aelement.SID,function(err,relist){

                  if(err){
                    cb(err);
                  }
                  else{
                    aelement.relist = relist;
                    cb(null);
                  }
              });},function(err){

                if(err) {
                  res.status = err.code;
                  next();
                } else {
                  
                  res.render('StudentCase',
                  {
                    member : req.session.member || null,
                    result : list,
                    target :null
                  });
                }

              }

            );}


        });

});

router.post('/',function(req,res,next){

  var cid1 =req.body.q1;
    var sid1 =req.body.q2;
  if(!global.member) {
    res.redirect('/');
  }


  Qualify.update(cid1,sid1,function(err){ //satatu==1

    if(err)
    {
      res.redirect('/');
    }
    else{
      Case.get(cid1,function(err,row){
        console.log('success')

        if(err)
        {
          res.redirect('/');
        }

        else{
          console.log('sss')
          console.log(row.HR);
            Status.hrupdate(sid1,row.HR,function(err){

              if(err){
                console.log(err);
                  res.redirect('/');
              }
              else{
                res.redirect('/StudentCase')
              }


            }
          );

        }


      });
    }

  });
}
);


module.exports = router;
