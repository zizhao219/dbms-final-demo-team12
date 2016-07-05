var express = require('express');
var router = express.Router();
var Case = require('../models/Case');
var async = require('async');

router.get('/', function(req, res) {


  Case.getAll(function(err,caselist){

    if(err) {
      res.status = err.code;
      res.json(err);
    }

    else{
      res.render('caseshow',{
        member : req.session.member || null, //EVEY RENDER WILL NEED member or won't show
        caselist: caselist
    });

    }
  });

});

router.get('/:CID', function(req, res) {

  Case.get(req.params.CID,function(err,cased){

    if(err) {
      res.status = err.code;
      res.json(err);
    }

    else{

      res.render('Acase',{
        member : req.session.member || null, //EVEY RENDER WILL NEED member or won't show
        cased: cased

    });

    }
  });

});

router.post('/',function(req,res){

  console.log('enter');
  console.log(req.body.d);

  Case.dele(req.body.d, function(err){

      if(err)
      {
        res.status = err.code;
        res.json(err);
      }
      else{
        res.redirect('/');
      }

  });





});




module.exports = router;
