var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Qualify = function(options) {

  this.CID = options.CID;
  this.SID = options.SID;
  this.statu = options.statu; // 0 not yet , 1 succcess

};

Qualify.create = function(cid ,sid,cb){

  db("Qualify").insert({
    CID: cid,
    SID: sid,
    statu: 0
  })
  .then(function(result) {
      cb(null);  }.bind(this))
  .catch(function(err) {
    console.log("MEMBER INSERT", err);
    cb(new GeneralErrors.Database());
  })

}

Qualify.update = function(CID,SID,cb){

  if(CID) {

    db('Qualify')
    .update({
      statu: 1
    })
    .where({
      CID : CID,
      SID :SID
    })
    .then(function() {
        console.log('show');
        cb(null);
      }.bind(this))
      .catch(function(err) {
        console.log(err);
        cb(new GeneralErrors.Database());
      })
  }

};

Qualify.get = function(CID,cb){


  db.select()
    .from('Qualify')
    .where({
      CID : CID
    })
    .map(function(row) {
      //將select出來的資料轉換成Member物件
      return new Member(row);
    })
    .then(function(memberList) {
      if(memberList.length) {
        cb(null, memberList); //FOR EACH
      } else {
        //這邊要產生一個NotFound err給前端，因為error很常用到，我們會獨立出去一個檔案
        cb(new GeneralErrors.NotFound());
      }
    })
    .catch(function(err) {
      cb(err);
    })

};

Qualify.getall =function(cb){

  db().select()
  .from('Qualify')
  .map(function(row){

    return new Qualify(row);

  }).then(function(resultlis){

      cb(null,resultlis);
  }).catch(function(err) {
    cb(new GeneralErrors.Database());
  });



}

Qualify.find = function(CID,SID,cb) {

    db().select()
    .from('Qualify')
    .where({
      CID : CID,
      SID: SID
    })
    .map(function(row){
      var json = JSON.stringify(row);
      console.log('j'+json);
      return row;
    }).then(function(statusList) {
      if(statusList.length) {
        cb(null, statusList[0]);
      } else {
        cb(null,null);
      }

    })
    .catch(function(err) {
      console.log(err);
      cb(new GeneralErrors.Database());
    });
}

Qualify.union = function(CID1, SID, fn){


  db().select()
  .from('Qualify').join('Case',function(){
    this.on('Qualify.CID',db.raw('?',[CID1])).
    andOn('Case.CID',db.raw('?',[CID1]));
  }).join('MemberStatus',function(){

    this.on('Qualify.SID',db.raw('?',[SID])).
    andOn('MemberStatus.SID',db.raw('?',[SID]));

  }).map(function(row){
    var json = JSON.stringify(row);
    console.log('j'+json);

    return row;
  }).then(function(list) {
    if(list.length) {
      fn(null, list[0]);
    } else {
      fn(null, new GeneralErrors.NotFound());
    }

  })
  .catch(function(err) {
    console.log(err);
    fn(new GeneralErrors.Database());
  });


}

Qualify.show = function(SID,fn){

  db().select()
  .from('Qualify').join('Case',function(){
    this.on('Qualify.SID',db.raw('?',[SID]))
    .andOn('Qualify.CID','=','Case.CID');
  }).map(function(row){
    var json = JSON.stringify(row);
    console.log('djd'+json);
    return row;
  }).then(function(list) {
    if(list.length) {
      fn(null, list);
    } else {
      fn(null,null);
    }

  })
  .catch(function(err) {
    console.log(err);
    fn(new GeneralErrors.Database());
  });


}


module.exports = Qualify;
