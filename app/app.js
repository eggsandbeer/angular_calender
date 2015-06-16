'use strict';

var App = angular.module('App', [
  'calenderDemo',
  // 'calender',
  'ngRoute'
]);

App.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
