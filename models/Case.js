var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');
var forAllAsync = require('../routes/forAllAsync').forAllAsync;
var async = require('async');


var Case = function(options){

  this.CID = options.CID;
  this.CName= options.CName;
  this.Date_1= options.Date_1;
  this.Time= options.Time;
  this.Week= options.Week;
  this.HR = options.HR;
  this.Description= options.Description;


};

Case.get = function(transferCID,cb){

  db().select()
  .from('Case')
  .where({
    CID :transferCID
  })
  .map(function(row){

    return new Case(row); //new
  })
  .then(function(Caseresult){
    if(Caseresult.length){

      cb(null,Caseresult[0]);
    }
    else{
      cb(null, new GeneralErrors.NotFound());
    }
  })
  .catch(function(err) {
    console.log(err);
    cb(new GeneralErrors.Database());
  });

};

Case.getAll = function(cb){
  console.log('ss')
    db().select()
    .from('Case')
    .map(function(row){
      console.log(row)
      return new Case(row); //row.CID.,row.
    })
    .then(function(Caselist){
      console.log(Caselist);
      cb(null,Caselist);
    })
    .catch(function(err){
      cb(new GeneralErrors.Database());
    });

};

Case.search =function(searchwords,cb){

  db().select()
  .from('Case')
  .where(function(){this.where('CName','like','%'+searchwords+'%')
  .orWhere('Date_1','like','%'+searchwords+'%').orWhere('Time','like','%'+searchwords+'%')
  .orWhere('Week','like','%'+searchwords+'%')
  .orWhere('Description','like','%'+searchwords+'%')})
  .map(function(row){
    return new Case(row); //new
  })
  .then(function(Caseresult){
    if(Caseresult.length){

      cb(null,Caseresult);
    }
    else{
      cb(null, null);
    }
  })
  .catch(function(err) {
    console.log(err);
    cb(new GeneralErrors.Database());
  });


};

Case.match = function(type, cb) {

  db.select('SID')
    .from('Member_ClassSchedule1')
    .whereRaw(type)
    .map(function(row) {
      return row.SID; //rtable sid
    })
    .then(function(statusList) {

      //console.log('s'+statusList);

      //console.log(statusList[0]);

      if(statusList.length) {
        cb(null, statusList);
      } else {
        cb(null, new GeneralErrors.NotFound());
      }

    })
    .catch(function(err) {
      console.log(err);
      cb(new GeneralErrors.Database());
    });
}


Case.match2 = function(list,cb)
{

  var arr=[];
  async.forEach(list,function(i,cb){

    db().select()
      .from('MemberStatus').
      join('Member_ClassSchedule1',function(){

        this.on('MemberStatus.SID',db.raw('?',i)).
        andOn('Member_ClassSchedule1.SID',db.raw('?',i));
      })
      .map(function(row){
        //var json = JSON.stringify(row);
        //console.log('j'+json);
        return row;
      }).then(function(List) {
        if(List.length) {

          arr.push(List); //use push to seperate
          cb(null);
        } else {
          cb(null, new GeneralErrors.NotFound());
        }

      })
      .catch(function(err) {
        console.log(err);
        cb(new GeneralErrors.Database());
      });


  },function(err){
    if(err) {
      console.log(err);
      cb(new GeneralErrors.Database());
    }
    else{
      //console.log('re'+result);
      //console.log('re'+a);
      cb(null,arr);
    }
  }

);

}

Case.dele = function(did,fn){

  if(!global.member)
  {
    res.rediect('/');
  }

  else{

  db('Case')
  .where('CID',did)
  .del()
  .then(function(){
    fn(null);
  }).catch(function(err) {
    console.log(err);
    cb(new GeneralErrors.Database());
  });

  }

}


Case.prototype.record  = function(cb){ //def use =func

    db('Case')
    .insert({

      CName: this.CName,
      Date_1 : this.Date_1,
      Time:this.Time,
      Week:this.Week,
      HR : this.HR,
      Description:this.Description
    })
    .then(function(result){
      console.log('to here');
      cb(null,this);
    }) //bind this
    .catch(function(err){
      console.log(err);
      cb(null, new GeneralErrors.Database());
    })
};



module.exports = Case;
