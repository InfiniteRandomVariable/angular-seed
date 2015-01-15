'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices',
  'phonecatDirectives',
  'ui.bootstrap'
]);

phonecatApp.config(['$routeProvider','ArticlesCtrlResolve',
  function($routeProvider, ArticlesCtrlResolve) {
    $routeProvider.
      when('/phones', {
        templateUrl: 'partials/sections.html',
        controller: 'PhoneListCtrl'
        ,
         resolve: ArticlesCtrlResolve
      }
      ).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
         redirectTo: '/phones'
     });
  }]);
