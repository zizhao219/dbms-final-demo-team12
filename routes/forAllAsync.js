/*jshint -W054 */
;(function (exports) {

  function forAllAsync(arr, fn) {



    var arrOrig = arr
      , cbs = []

      , begun = 0

      , finished = 0,
      concate =''
      ;
      console.log('arr'+arrOrig);



      var items = ['Mon_9_12','Mon_13_17','Tue_9_12','Tue_13_17',
                  'Wed_9_12','Wed_13_17','Thu_9_12','Thu_13_17','Fri_9_12','Fri_13_17'];


    var i =arr.length;
    var u='';
    function onNextBound() {

      while (i!=0) {

        if(arrOrig[begun]==0){
          concate += items[begun]+'=0 '+'AND ';
        }


        begun +=1 ;

        i= i-1;

        fn(complete,concate);
      }
      if (0 === i) {
        //console.log('fin'+finished +'be'+begun);
        complete();
      }
    }
    function complete() {
      cbs.forEach(function (cb) {
        console.log('sssssssssssssssss'+cbs);
        console.log('cb'+cb);
        cb();
      });
      cbs = [];
      console.log('cbs0'+cbs);
    }

  //  onNextBound();

    return {
      then: function (cb) {
        cbs.push(cb);
          console.log('cb'+cb+'cbs0'+cbs);
        onNextBound();
        return this;
      }
    };
  }

  exports.forAllAsync = forAllAsync;
}('undefined' !== typeof exports && exports || new Function('return this')()));
