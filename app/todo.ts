class Todo {
  constructor(public text : string, public done : boolean) {
  }
}

function TodoListController(helpers : HelpersService.T, $q : angular.IQService) {
  let newTodoText : string;
  let todos = [
    new Todo('learn angular', true),
    new Todo('build an angular app', false),
  ];
  let $scope = { archive, remaining, add, todos, newTodoText };

  function _replacePostalCode(text : string) : angular.IPromise<string> {
    let m = text.match(/(.*)([0-9]{5})(.*)/);
    if (m) {
      let [, before, postalcode, after] = m;
      return helpers.postalcode2towns(postalcode).then(
        (towns) => towns && towns[0],
        (err) => undefined
      ).then((town) =>
        before + (town || postalcode) + after
      );
    } else {
        return $q.resolve(text);
    }
  }

  function add() {
    console.log($scope.newTodoText);
    _replacePostalCode($scope.newTodoText).then((text) => {
      $scope.todos.push(new Todo(text, false));
      $scope.newTodoText = '';
    });
  }

  function remaining() {
    return $scope.todos.filter((myApp) => !myApp.done);
  };

  function archive() {
    $scope.todos = remaining();
  }

  return $scope;
}
