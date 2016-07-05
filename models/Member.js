
 //這是一個Member Model
var db = require('../libs/db'); //引入我們的sql builder
var GeneralErrors = require('../errors/GeneralErrors');
var bcrypt = require('bcryptjs');
var Q = require('q');
var Member = function(options) {

  this.id = options.id;
  this.name = options.name;
  this.password = options.password;
  this.account = options.account;

};


//Class Function
Member.get = function(memberId, cb) {
  //這邊是當傳入一個memberId時，進入資料庫查出相對應的member資料

  db.select()
    .from('member')
    .where({
      id : memberId
    })
    .map(function(row) {
      //將select出來的資料轉換成Member物件
      return new Member(row);
    })
    .then(function(memberList) {
      if(memberList.length) {

        cb(null, memberList[0]);
      } else {
//這邊要產生一個NotFound err給前端，因為error很常用到，我們會獨立出去一個檔案
        cb(new GeneralErrors.NotFound());
      }
    })
    .catch(function(err) {
      cb(err);
    })
}


//我們接下來嘗試是否可以正確取得資料
//接下來完成其他會用到的function
//Instance Function

Member.prototype.save = function (cb) {

var n = this.name;
var a = this.account;
var p = this.password;

db.select()
    .from('member')
    .where({
      account : this.account //save only in one field
    })
    .map(function(row) {
      console.log(row);
    })
    .then(function(row){
      if(row.length) //row has sth
      {
        cb(null,null);
      }
      else{
        console.log(this.name+""+ this.account+""+this.password);
      db("member").insert({
        name: n,
        account: a,
        password: p
      })
      .then(function(result) {
        console.log('texs');
            cb(null, this,result);}.bind(this))
      .catch(function(err) {
        console.log("MEMBER INSERT", err);
        cb(new GeneralErrors.Database());
      })
    }
  }
  );
}

Member.upday = function (ID1,newwords,cb) {

  if(ID1) {

    db('member')
    .update({
      password: newwords
    })
    .where({
      ID : ID1
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
  //save的概念是當物件不存在時新增，存在時對DB做更新

//  cb(null, member1);
// when cb(sth) => cb back to func ->save
//callback sthing  null &this to fun register

Member.norepeat = function(input, cb){


 db("member")
    .where({
      account : input
    })
    .map(function(row)
    {
      console.log('u'+row);
      return new Member(row);

    }).
    then(function(Member) {
      console.log('a'+Member);
      if(Member.length) {
        console.log(Member[0]);
        cb(null, Member[0]);
      } else {
        //這邊要產生一個NotFound err給前端，因為error很常用到，我們會獨立出去一個檔案
        cb(new GeneralErrors.NotFound());
      }
    });
   //acoout*/
}

Member.prototype.check = function (cb) { //with check

  //if (this.account && this.password) { //find acc,password


    db("member")
      .where({
        account : this.account,
        password : this.password //with ,
      }).map(function(row) {

          this.name = row.name;
          return row;
      })
      .then(function(result) {

        console.log(result);
      //  console.log('tance'+typeof result);
        //if(result!=null)

        cb(null, result[0]); // if  no array , it will show sets(jsons) , not  a json
        //in other words , it will catch
          //[ { id: 85, name: 'soda', account: '2', password: '2' } ]
        // not a json then -> can't get member.id

      }.bind(this))
      .catch(function(err) {
        console.log("MEMBER UPDATED", err);
        cb(new GeneralErrors.Database());
      });
//}
};

//這樣基本上就完成了一個DataModel會用到的method, 之後有需要的時候再過來新增
module.exports = Member;
