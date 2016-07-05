var async = require('async');

var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');
var forAllAsync = require('../routes/forAllAsync').forAllAsync;
var async = require('async');
var util = require('util');

searchwords ='11qqq';
db().select()
.from('Case')
.where(function(){this.where('CName','like','%'+searchwords+'%')
.orWhere('Date_1','like','%'+searchwords+'%').orWhere('Time','like','%'+searchwords+'%')
.orWhere('Week','like','%'+searchwords+'%')})
.map(function(row){
  console.log('11');
  console.log(row);
  return row;
  //return new Case(row); //new
})
.then(function(Caseresult){
  if(Caseresult.length){
    console.log('11ssss');
    console.log(Caseresult);
    //cb(null,Caseresult[0]);
  }
  else{

    console.log('uuuu');
    cb(null, null);
  }
})
.catch(function(err) {
  console.log(err);
  //cb(new GeneralErrors.Database());
});
