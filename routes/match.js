var express = require('express');
var router = express.Router();
var Case = require('../models/Case');
var async = require('async');
var Arr = require('node-array');
var forAllAsync = require('./forAllAsync').forAllAsync;

var items = ['Mon_9_12','Mon_13_17','Tue_9_12','Tue_13_17',
            'Wed_9_12','Wed_13_17','Thu_9_12','Thu_13_17','Fri_9_12','Fri_13_17'];

router.get('/', function(req, res) {
  if(!req.session.member) {
    res.redirect('/');
  }

  res.render('match', {
    member : req.session.member || null
  });
});


router.post('/:matched',function(req, res){

  var mon = [];

  a1= req.body.mon9 ? 0 : 1;
  console.log('a1'+a1);
  a2= req.body.mon13 ? 0 : 1;
  a3= req.body.tue9 ? 0 : 1;
  a4= req.body.tue13 ? 0 : 1;
  a5= req.body.wed9 ? 0 : 1;
  a6= req.body.wed13 ? 0 : 1;
  a7= req.body.thu9 ? 0 : 1;
  a8= req.body.thu13 ? 0 : 1;
  a9= req.body.fri9 ? 0 : 1;
  a10= req.body.fri13 ? 0 : 1;

  var i = 0;
  var concate;
  mon.push(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10);


  forAllAsync([], function () {
    throw new Error("Empty array shouldn't be called");
  }, 4).then(function () {
    console.log('finished empty batch');
  });

  var ci;

  forAllAsync(mon, function (complete,con) {
    //console.log(item);
    console.log('is con'+con);
    //complete();
    ci = con;
  }).then(function (con) {
    //console.log('finished uppercase batch',con, arr2.length);
  });

  var type = ci.substring(0,ci.length-5);
  //console.log('uuuuu'+u);*/
  var j =JSON.stringify(type);

  console.log('c'+type);

  //Case

  Case.match(type,function(err,list){

    if(err)
    {
      res.status = err.code;
      res.json(err);
    }
    else{
      console.log(list);
      console.log(typeof(list));
      console.log('casematch list'+list);

      if(list.code==404)
      {
        console.log('s');
        //var rowlist=null;
        res.render('allmatch',{
            member : req.session.member || null, //EVEY RENDER WILL NEED member or won't show
            rowlist: null
                });
      }
      else
      {
        Case.match2(list,function(err,rowlist){

        console.log('inner row'+rowlist);
        var oo=JSON.stringify(rowlist);
        console.log('c'+oo);
        if(err)
        {
          res.status = err.code;
          res.json(err);
        }
        else{


        res.render('allmatch',{
            member : req.session.member || null, //EVEY RENDER WILL NEED member or won't show
            rowlist: rowlist
                });

          //console.log('row'+rowlist[0]);

        }
        });}



    }


})});

module.exports = router;
