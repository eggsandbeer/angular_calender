var calender_controllers = angular.module('calenderDemo.controllers', []);

calender_controllers.controller('mainController', function($scope, moment){

  $scope.day = moment();
  

});
