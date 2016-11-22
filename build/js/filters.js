(function(){
  angular.module('perroAgave.filters', [])
    .filter('dateEvent', function(){
      return function(date){
        var arraydate = date.split("-");
        var day = arraydate[2];
        switch (arraydate[1]) {
          case '1': var month = "ENE"; break;
          case '2': var month = "FEB"; break;
          case '3': var month = "MAR"; break;
          case '4': var month = "ABR"; break;
          case '5': var month = "MAY"; break;
          case '6': var month = "JUN"; break;
          case '7': var month = "JUL"; break;
          case '8': var month = "AGO"; break;
          case '9': var month = "SEP"; break;
          case '10': var month = "OCT"; break;
          case '11': var month = "NOV"; break;
          case '12': var month = "DIC"; break;
        }
        return day + " " + month;
      }
    })
})();
