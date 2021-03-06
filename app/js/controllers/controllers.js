'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

var POP = 'POP';
var PUB = 'PUB';
var TYPE = 'TYPE';
var AGE = 'AGE';

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'data','articles',
  function($scope, data , articles) {

    // var _data = articles;

    // console.log(typeof(_data));
    // //data.friends(_data);
    // var fData = data.friends(_data);
    // $scope.friends = fData;
    // data.setFriends(fData);
    // $scope.orderProp = 'age';
    // $scope.searchMode = AGE;



   
    $scope.friends =  data.friends(articles);
    data.setFriends($scope.friends);
    $scope.orderProp = 'age';
    $scope.searchMode = AGE;



          }]
     )


.controller('dataController',['$scope','data', 'tagSorterController','$location','$anchorScroll','tagSortCriteria', function($scope,data, tagSorterController,$location,$anchorScroll, tagSortCriteria){

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


