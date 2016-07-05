var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');


var Status = function(options) {
  this.SID = options.SID;
  this.Name = options.Name;
  this.Department = options.Department;
  this.Grade = options.Grade;
  this.Sex = options.Sex;
  this.Phone = options.Phone;
  this.Email = options.Email;
  this.myhr = options.myhr;
  this.ID = options.ID; //account

}; // many status


Status.getAll = function(cb) {

  db.select()
    .from('MemberStatus')
    .map(function(row) {
      return new Status({
        SID : row.SID,
        Name : row.Name,
        Department : row.Department,
        Grade : row.Grade,
        Sex : row.Sex,
        Phone :row.Phone,
        Email : row.Email,
        myhr: row.myhr,
        ID : row.ID
      });
    })
    .then(function(statusList) {
      cb(null, statusList);
    })
    .catch(function(err) {
      cb(new GeneralErrors.Database());
    });
}


Status.get = function(statusId, cb) {  //get file and output

  db.select()
    .from('MemberStatus')
    .where({
      ID : statusId
    })
    .map(function(row) {
      return new Status(row);

    })
    .then(function(statusList) {
      if(statusList.length) {
        cb(null, statusList[0]);
      } else {
        cb(null, new GeneralErrors.NotFound());
      }

    })
    .catch(function(err) {
      console.log(err);
      cb(new GeneralErrors.Database());
    });
}

Status.find1 = function(statusId,cb) {

  var a  = 'member.id';

    db().select()
    .from('MemberStatus').
    join('member',function(){

      this.on(a,db.raw('?',[statusId])).
      andOn('MemberStatus.ID',db.raw('?',[statusId]))
    })
    .map(function(row){
      var json = JSON.stringify(row);
      console.log('j'+json);

      return row;
    }).then(function(statusList) {
      if(statusList.length) {
        cb(null, statusList[0]);
      } else {
        cb(null, new GeneralErrors.NotFound());
      }

    })
    .catch(function(err) {
      console.log(err);
      cb(new GeneralErrors.Database());
    });
}


Status.prototype.record = function (cb) {

  console.log('id'+this.id);
  db('MemberStatus')
    .insert({
    SID : this.SID,
    Name : this.Name,
    Department : this.Department,
    Grade : this.Grade,
    Sex : this.Sex,
    Phone :this.Phone,
    Email : this.Email,
    myhr: this.myhr,
    ID : this.ID})
    .then(function(result) {
        //this.id = result[0]
        cb(null, this);
      }.bind(this))
      .catch(function(err) {
        console.log(err);
        cb(null, new GeneralErrors.Database());
      });

};

Status.prototype.upday = function (cb) {

  if(this.ID) {

    db('MemberStatus')
    .update({
      Name : this.Name,
      Grade : this.Grade,
      Phone :this.Phone,
      Email : this.Email
    })
    .where({
      ID : this.ID
    })
    .then(function() {
        cb(null);
      }.bind(this))
      .catch(function(err) {
        console.log(err);
        cb(null, new GeneralErrors.Database());
      })
  }

};

Status.hrupdate = function (SID,hr,cb) {

  if(SID) {

    db.select()
      .from('MemberStatus')
      .where({
        SID : SID
      })
      .map(function(row) {
        return new Status(row);
      }).then(function(result) {
        
        var hr1 =result[0].myhr+hr;

        db('MemberStatus')
        .update({
          myhr : hr1
        })
        .where({
          SID : SID
        })
        .then(function() {
            cb(null);
          }.bind(this))
          .catch(function(err) {
            console.log(err);
            cb(null, new GeneralErrors.Database());
          })
        }.bind(this));




  }

};




module.exports = Status;
