'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

var POP = 'POP';
var PUB = 'PUB';
var TYPE = 'TYPE';
var AGE = 'AGE';

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'data','articles',
  function($scope, data , articles) {

 //   $scope.phones = Phone.query();

    //alert(articles.toString());


 //    $scope.friends = [
 //    {  "title": "Uptown Funk", 
 //   "url": "http://www.billboard.com/m/paddington_2014/", 
 //   "age": 0, 
 //   "topComment": "98%", 
 //   "tag": "movie", 
 //   "topCommentNum": 98, 
 //   "numComments": 0,
 //   "pub": 'billboard'
 // },
 //   {  "title": "Uptown Funk 2", 
 //   "url": "http://www.billboard.com/m/paddington_2014/", 
 //   "age": 10, 
 //   "topComment": "98%", 
 //   "tag": "movie", 
 //   "topCommentNum": 98, 
 //   "numComments": 0,
 //   "pub": 'billboard'
 // },
 //   {
 //   "title": "Blank Space", 
 //   "url": "http://www.billboard.com/m/american_sniper/", 
 //   "age": 0, 
 //   "topComment": "75%", 
 //   "tag": "movie", 
 //   "topCommentNum": 75, 
 //   "numComments": 0
 //  }];

    //var _data = data.friends();

    var _data = articles;

    if (Object.prototype.toString.call( _data ) !== '[object Array]'){
      console.log('not an array');
    }else{
      console.log('Array size ' + _data.length.toString());
    }


       var aLen = _data.length;

      for(var c = 0; c < aLen; c++){

        var artData = _data[c];
        if(data === undefined){
            return;
        }
        for(var prop in artData){
              console.log('Prop name: ' + prop + '  - Value:' + artData[prop]);
               // if 
          } //for

        } //for



    console.log(typeof(_data));
    //data.friends(_data);
    var fData = data.friends(_data);
    $scope.friends = fData;
    data.setFriends(fData);
    
    $scope.orderProp = 'age';
    //$scope.query = 'dell';
    $scope.searchMode = AGE;


    // TBD
    // function isSame(a, b){
    //     return (a === b)
    //  };
    // TBD
    // $scope.noHrefTest = function (_str) {$scope.orderProp = _str };
    // $scope.sortPub = function(val){$scope.orderProp = val};

    //TBD
    // $scope.sortPopular = function(val){
    //                     $scope.searchMode = 'POP';
    //                      if(isSame(val, $scope.query)){
    //                             $scope.query = '';
    //                         }
    //                      else{
    //                             $scope.query = val;
    //                           }
    //                         }
  // TBD                                  
   // $scope.sortType = function(val){$scope.orderProp = val};


                                                 }]

                                                 )


.controller('dataController',['$scope','data', 'tagSorterController','$location','$anchorScroll','tagSortCriteria', function($scope,data, tagSorterController,$location,$anchorScroll, tagSortCriteria){


        
        //alert(articles.length);

        $scope.scrollTo = function(id) {
              var positions = tagSortCriteria.getPositions();
              console.log('move to positions', positions.start);
              (positions.start > -1)?$location.hash(positions.start):$location.hash(0);
              $anchorScroll();
          }


//inject only the 
        this.cleanFriends = function(index){
          console.log('data controller cleanFriends');
          //tagSorterController.sorter();
            //$scope.friends = [{ name: 'John',    phone: '555-1212',    age: 10,   msg:'hello john', pub:'NYT',    type:'Life',      pop:4}];
          //tagSorterController.sorter(index);
          $scope.friends = data.friends();

          //var positions = tagSortCriteria.getPositions();
          //console.log('positions', positions.start);

        };

}]);



//NOTE

// .filter('startsWithLetter', function () {
//         return function (items, letter) {
//                 var filtered = [];
//                 var letterMatch = new RegExp(letter, 'i');
//                 for (var i = 0; i < items.length; i++) {
//                         var item = items[i];
         
//                         if (booln && letterMatch.test(item.id)) {                                                         
//                             filtered.push(item);
//                         }else if (booln === false &&  letterMatch.test(item.name) ){
//                             filtered.push(item);
//                         }
//                 }
           
//                 return filtered;
//             };
//     });

// phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
//   function($scope, $routeParams, Phone) {
//     $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
//       $scope.mainImageUrl = phone.images[0];
//     });

//     $scope.setImage = function(imageUrl) {
//       $scope.mainImageUrl = imageUrl;
//     }
//   }]);

