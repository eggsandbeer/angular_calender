'use strict';

// Declare app level module which depends on views, and components
angular.module('App', [
  'calenderDemo',
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
