var calender_controllers = angular.module('calenderDemo.controllers', []);

App.controller('otherController', function($scope, moment){

  console.log('fuschia')
  $scope.cheese = "some cheese";

  $scope.$on('someEvent', function(event, args) {
    console.log('derder')
  });

  $scope.newMethod = function(){
    console.log('jellybeans')
  }

});

App.controller('anotherController', function($scope, $controller){
  var args = [];

  var new_scope = $scope.$new(); //You need to supply a scope while instantiating.
//Provide the scope, you can also do $scope.$new(true) in order to create an isolated scope.
//In this case it is the child scope of this scope.
  $controller('otherController', {$scope : new_scope });


  new_scope.newMethod();

  console.log('summer 95');

  $scope.handleClick = function(){
    console.log('WOLVES')
    $scope.$broadcast('someEvent', {username: 'hoolie' });
  }

});

calender_controllers.controller('mainController', function($scope, moment){
  var args = []

  $scope.$emit('someEvent', args);
  $scope.day = moment();
  $scope.color = "green";
  $scope.name = 'World';
  $scope.hobby='AngularJS';
});


App.controller('flipperDemo', function($scope){
  $scope.flipped = false;
  $scope.flip = function(){
    $scope.flipped = !$scope.flipped;
  }
});
