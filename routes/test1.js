(function () {

  var db = require('../libs/db');
  var GeneralErrors = require('../errors/GeneralErrors');
  var forAllAsync = require('./forAllAsync').forAllAsync;
  var async = require('async');

    var mon = [];
    a1 =0, a2 =1,a3 =1, a4= 1, a5 =1, a6=1,a7=1,a8=1,a9=1,a10=1;

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


    var use ;
  db.select('SID')
    .from('Member_ClassSchedule1')
    .whereRaw(type)
    .map(function(row) {
      return row.SID;

    })
    .then(function(statusList) {

        console.log('s'+statusList);

        console.log(statusList[0]);


          async.each(statusList,function(i){
            console.log('list:'+statusList);
            console.log('i'+i);

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
              }).then(function(s) {
                if(statusList.length) {

                } else {
                //  cb(null, new GeneralErrors.NotFound());
                console.log(err);
                }

              })
              .catch(function(err) {
                console.log(err);
                //cb(new GeneralErrors.Database());
              });

          });

    })
    .catch(function(err) {
      console.log(err);
      //cb(new GeneralErrors.Database());
    });


    console.log('uu'+use);

}());
