var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');


var Schedule = function(options) {
  this.SID = options.SID;
  this.Mon_9_12 = options.Mon_9_12;
  this.Mon_13_17 = options.Mon_13_17;
  this.Tue_9_12 = options.Tue_9_12;
  this.Tue_13_17 = options.Tue_13_17;
  this.Wed_9_12 = options.Wed_9_12;
  this.Wed_13_17 = options.Wed_13_17;
  this.Thu_9_12 = options.Thu_9_12;
  this.Thu_13_17 = options.Thu_13_17;
  this.Fri_9_12 = options.Fri_9_12;
  this.Fri_13_17 = options.Fri_13_17;
  this.ID1 = options.ID1; //account

}; // many Schedule

var Member = function(options) {

  this.id = options.id;
  this.name = options.name;
  this.password = options.password;
  this.account = options.account;

};

Schedule.getAll = function(cb) {

  db.select()
    .from('Member_ClassSchedule1')
    .map(function(row) {
      return new Schedule({
        SID: row.SID,
        Mon_9_12: row.Mon_9_12,
        Mon_13_17: row.Mon_13_17,
        Tue_9_12: row.Tue_9_12,
        Tue_13_17: row.Tue_13_17,
        Wed_9_12: row.Wed_9_12,
        Wed_13_17: row.Wed_13_17,
        Thu_9_12: row.Thu_9_12,
        Thu_13_17: row.Thu_13_17,
        Fri_9_12: row.Fri_9_12,
        Fri_13_17:row.Fri_13_17,
        ID1:row.ID1
      });
    })
    .then(function(ScheduleList) {
      cb(null, ScheduleList);
    })
    .catch(function(err) {
      cb(new GeneralErrors.Database());
    });
}


Schedule.get = function(ScheduleId, cb) {  //get file and output
  db.select()
    .from('Member_ClassSchedule1')
    .where({
      ID1 : ScheduleId
    })
    .map(function(row) {
      return new Schedule(row);
    })
    .then(function(ScheduleList) {
      if(ScheduleList.length) {
        cb(null, ScheduleList[0]);
      } else {
        cb(null, new GeneralErrors.NotFound());
      }

    })
    .catch(function(err) {
      console.log(err);
      cb(new GeneralErrors.Database());
    });
}

Schedule.find1 = function(ScheduleId,cb) {

  var a  = 'member.id';
  //var b = member.id;
  console.log('wwww');
    db().select()
    .from('Member_ClassSchedule1').
    join('member',function(){

      this.on(a,db.raw('?',[ScheduleId])).
      andOn('MemberSchedule.ID',db.raw('?',[ScheduleId]))
    })
    .map(function(row){
      var json = JSON.stringify(row);
      console.log('j'+json);

      return row;
    }).then(function(ScheduleList) {
      if(ScheduleList.length) {
        cb(null, ScheduleList[0]);
      } else {
        cb(null, new GeneralErrors.NotFound());
      }

    })
    .catch(function(err) {
      console.log(err);
      cb(new GeneralErrors.Database());
    });
}


Schedule.prototype.record = function (cb) {

  console.log('id'+this.ID1);
  db('Member_ClassSchedule1')
    .insert({
      SID: this.SID,
      Mon_9_12: this.Mon_9_12,
      Mon_13_17: this.Mon_13_17,
      Tue_9_12: this.Tue_9_12,
      Tue_13_17: this.Tue_13_17,
      Wed_9_12: this.Wed_9_12,
      Wed_13_17: this.Wed_13_17,
      Thu_9_12: this.Thu_9_12,
      Thu_13_17: this.Thu_13_17,
      Fri_9_12: this.Fri_9_12,
      Fri_13_17:this.Fri_13_17,
      ID1:this.ID1 })
    .then(function(result) {
        //this.id = result[0]
        cb(null, this);
      }.bind(this))
      .catch(function(err) {
        console.log(err);
        cb(null, new GeneralErrors.Database());
      });

};






module.exports = Schedule;
