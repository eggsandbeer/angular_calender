App.directive('calendar', function(){
  return {
    restrict: 'E',
    templateUrl: 'calender/directive.html',
    scope: {
      selected: '='
    },
    link: function(scope){

    }
  }
});

App.directive('diedirective', function() {
    var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */

    directive.template = "My first directive: {{textToInsert}}";

    return directive;
});
