angular
  .module('app')
  .factory('Friends', ['$http', function($http) {
    return {
      get: function() {
        return $http.get('friends.json').then(function(response) {
          return response.data;
        });
      }
    };
  }])