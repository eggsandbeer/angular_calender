App.directive('calendar', function(){
  return {
    restrict: 'E',
    templateUrl: 'calender/directive.html',
    scope: {
      selected: '='
    },
    link: function(scope){
      scope.selected = _removeTime(scope.selected || moment)
      scope.month = scope.selected.clone();

      var start = scope.selected.clone();

      start.date(1);

      _removeTime(start.day(0));

      _buildMonth(scope, start, scope.month);

      scope.select = function(day){
        scope.selected = day.date;
      }

      scope.next = function(){
        var next = scope.month.clone();
        _removeTime(next.month(next.month()+1).date(1));
        scope.month.month(scope.month.month()+1);
        _buildMonth(scope, next, scope.month);
      };

      scope.previous = function(){
        var previous = scope.month.clone();
        _removeTime(previous.month(previous.month()-1).date(1));
        scope.month.month(scope.month.month()-1);
        _buildMonth(scope, previous, scope.month);
      }
    }
  }

  function _removeTime(date) {
    return date.day(0).hour(0).minute(0).second(0).millisecond(0);
  }

  function _buildMonth(scope, start, month){
    scope.weeks = [];
    var done = false,
        date = start.clone(),
        monthIndex = date.month(),
        count = 0;

    while(!done){
      scope.weeks.push({
        days: _buildWeek(date.clone(), month)
      });
      date.add(1, 'w');
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }
  }

  function _buildWeek(date, month){
    var days = [];
    for (var i = 0; i < 7; i++){
      days.push({
        name: date.format('dd').substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), "day"),
        date: date
      });
      date = date.clone();
      date.add(1, 'd');
    }
    return days;
  }
});

App.directive('helloWorld', function() {
 return {
   restrict: 'AE',
   replace: false,
   scope: {
     color: '='
   },
   template: '<p style="background-color:{{color}}">Hello World',
   compile: function(tEl, attrs){
     console.log(tEl, attrs)
     attrs.someAttribute = "Der"
   },
   link: function(scope, el, attrs){
     console.log(attrs)
     el.bind('click', function(){
      //  el.css('background-color', 'white');
       scope.$apply(function(){
         scope.color = "red";
       });
     });
     el.bind('mouseover', function(){
       el.css('cursor', 'pointer');
     });
   }
 };
});

App.directive('outputText', function(){
  return {
    transclude: true,
    scope: {},
    template: '<div ng-transclude></div>'
  }
});
App.factory('notesFactory', function() {
  return {
    put: function(note) {
      localStorage.setItem('note' + note.id, JSON.stringify(note));
      return this.getAll();
    },
    get: function(index) {
      return JSON.parse(localStorage.getItem('note' + index));
    },
    getAll: function() {
      var notes = [];
      for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).indexOf('note') !== -1) {
          var note = localStorage.getItem(localStorage.key(i));
          notes.push(JSON.parse(note));
        }
      }
      return notes;
    }
  };
});
App.directive('notepad', function(notesFactory){
  return {
    restrict: 'AE',
    scope: {},
    link: function(scope, elem, attrs){
      scope.restore = function() {
        scope.editMode = false;
        scope.index = -1;
        scope.noteText = '';
      };
      scope.openEditor = function(index) {
        scope.editMode = true;

        if (index !== undefined) {
          scope.noteText = notesFactory.get(index).content;
          scope.index = index;
        } else {
          scope.noteText = undefined;
        }
      };
      scope.save = function() {
        if (scope.noteText !== '') {
          var note = {};

          note.title = scope.noteText.length > 10 ? scope.noteText.substring(0, 10) + '. . .' : scope.noteText;
          note.content = scope.noteText;
          note.id = scope.index != -1 ? scope.index : localStorage.length;
          scope.notes = notesFactory.put(note);
        }

        scope.restore();
      };
      var editor = elem.find('#editor');

      scope.restore();  // initialize our app controls
      scope.notes = notesFactory.getAll(); // load notes

      editor.bind('keyup keydown', function() {
        scope.noteText = editor.text().trim();
      });

    },
    templateUrl: 'calender/notes.html',
  }
});


App.directive('flipper', function(){
  return {
    restrict: "E",
    template: "<div class='flipper' ng-transclude ng-class='{flipped: flipped}'></div>",
    transclude: true,
    scope: {
      flipped: "="
    }
  };
});

App.directive('front', function(){
  return {
    restrict: "E",
    template: "<div class='front tile' ng-transclude></div>",
    transclude: true
  };
});

App.directive('back', function(){
  return {
    restrict: "E",
    template: "<div class='back tile' ng-transclude></div>",
    transclude: true
  };
});
