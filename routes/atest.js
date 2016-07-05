var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var Status = require('../models/Status');
var Qualify = require('../models/Qualify');
var asyn = require('async');


Qualify.getall(function(err,list){
  console.log(list);
    if(err){
      console.log(err);
    }
    else{

        asyn.each(list,function(aelement,cb){

          Qualify.union(aelement.CID,aelement.SID,function(err,relist){
              console.log('nion');
              if(err){
                console.log(err);
              }
              else{
                aelement.relist = relist;
                cb(null);
              }
            });
            },function(err){

            if(err) {
              //res.status = err.code;
              console.log('ddd');
              console.log(err);
            } else {
              console.log('enter');
              console.log('art'+list[1].relist.Name);
            }

          }

        );


    }

  });
