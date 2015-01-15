angular.module('docsSimpleDirective',  ['ngResource'])
.controller('Controller', ['$scope','$http','$resource',
                           function($scope,$http,$resource ) {
                           $scope.method = 'JSONP';
                           //$scope.url = 'phones/phones.json'
                          // $scope.url = 'file:///~/Desktop/Dev/Learning/angular-phonecat/app/phones/phones.json';
                           $scope.url = 'https://angularjs.org/greet.php?callback=JSON_CALLBACK&name=Super%20Hero';
                           $scope.fetch = function(){
                           
                                $scope.code = null;
                                $scope.response = null;
                           
                           
                           $http({method:$scope.method,url:$scope.url}).
                                success(function(data,status){
                                    $scope.status = status;
                                    $scope.data = data;
                                   
                                   }).
                           error(function(data,status){
                                 $scope.data = data || "Request failed";
                                $scope.status = status;
                           

                           
                                 });
                           
                           
                           };
                           
                           $scope.customer = {
                           name: 'Naomi',
                           address: '1600 Amphitheatre'
                           };
                           }])
.directive('myCustomer', function() {
           return {
           template: 'Name: {{customer.name}} Address: {{customer.address}}'
           };
           });


var app = angular.module('directivesModule',[]);

app.controller('Controller2', ['$scope', function($scope) {
                    var counter = 0;
                    $scope.customer = {
                               name: 'David',
                               street: '1234 Anywhere St.'
                               };
                               
                           $scope.changeData = function () {
                               counter++;
                               $scope.customer = {
                               name: 'James',
                               street: counter + ' Cedar Point St.'
                               };
                           };
                               
                        }])
.directive('myIsolatedScopeWithModelAndFunction', function () {
                                             return {
                                             scope: {
                                             datasource: '=',
                                             action: '&'
                                             },
                                             template: '<ul><li ng-repeat="prop in datasource">{{ prop }}</li></ul> ' +
                                             '<button ng-click="action()">Change Data</button>'
                                             };
                                             })
.directive('myIsolatedScopeWithName', function () {
            return {
            scope: {
            name: '@'
            },
            template: 'Name: {{ name }}'
            };
           });
