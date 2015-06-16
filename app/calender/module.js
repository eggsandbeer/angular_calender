var calenderDemo = angular.module('calenderDemo', [
  'calenderDemo.controllers',
  'angularMoment',
  'ngRoute'
]);

calenderDemo.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/home', {
    controller: 'mainController',
    templateUrl: 'calender/partial.html'
  });
}])
