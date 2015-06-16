var calenderDemo = angular.module('calenderDemo', [
  'angularMoment',
  // 'calender',
  'calenderDemo.controllers',
  'ngRoute'
]);

calenderDemo.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/home', {
    controller: 'mainController',
    templateUrl: 'calender/partial.html'
  });
}])
