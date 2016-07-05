var async = require('async');

var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');
var forAllAsync = require('../routes/forAllAsync').forAllAsync;
var async = require('async');
var util = require('util');

var list =[];


var configs ={ };
var a=[];
var memo ={ };
  async.each(list,function(i,cb){
    console.log('list:'+list);
    console.log('i'+i);
    //console.log('memo'+memo);

    db().select()
      .from('MemberStatus').
      join('Member_ClassSchedule1',function(){

        this.on('MemberStatus.SID',db.raw('?',i)).
        andOn('Member_ClassSchedule1.SID',db.raw('?',i));
      })
      .map(function(row){
        var json = JSON.stringify(row);
        console.log('j'+json);
        return row;
      }).then(function(List) {
        if(List.length) {

          //a += List; //get whole value not array
          //var oo=JSON.stringify(a);
          //console.log('c'+oo);
          a.push(List);

          configs[i]= List;
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
      //cb(new GeneralErrors.Database());
    }
    else{
      console.log('l'+a.length);
      console.log(a);
      if(a[0]==undefined)
      {
console.log(JSON.stringify(a));
}
  /*var c
    for(;a.length!=0;)
{

   c=a.pop();
    console.log('debugccc');
    //console.log(c.SID);
    console.log(c[0].SID);
    console.log('c'+c);
  }*/


    }
});
