'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

var POP = 'POP';
var PUB = 'PUB';
var TYPE = 'TYPE';
var AGE = 'AGE';

phonecatControllers.controller('PhoneListCtrll', ['$scope', 'data','articles', 'tagSorterController','$filter',
  function($scope, data , articles, tagSorterController, $filter) {

//HAHA!!!
    var _data = articles;

    if (_data.constructor.toString().indexOf("Array") < 0){
      console.log('not an array');
    }else{
      console.log('Array size ' + _data.length.toString());
    }


    var aLen = _data.length;

    console.log(typeof(_data));
    var fData = data.friends(_data);

    $scope.orderProp = 'age';
    $scope.searchMode = AGE;
    var sortedParentArray = $filter('orderBy')(fData, $scope.orderProp , false);

    data.setFriends(sortedParentArray);

    }])
.controller('dataController',['$scope','data', 'tagSorterController','$location','$anchorScroll','tagSortCriteria', function($scope,data, tagSorterController,$location,$anchorScroll, tagSortCriteria){

//HAHA!!!

        $scope.scrollTo = function(id) {
              var positions = tagSortCriteria.getPositions();
              console.log('move to positions', positions.start);
              (positions.start > -1)?$location.hash(positions.start):$location.hash(0);
              $anchorScroll();
          }


//inject only the 
        this.cleanFriends = function(index){
          console.log('data controller cleanFriends');
          $scope.friends = data.friends();


        };

}]);
