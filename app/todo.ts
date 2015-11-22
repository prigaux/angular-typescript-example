

class Todo {
  constructor(public text : string, public done : boolean) {
  }
}



function TodoListBase($log) {
  let todos = [
    new Todo('learn angular', true),
    new Todo('build an angular app', false),
  ];
  let o = { archive, remaining, todos };

  function remaining() {
    return o.todos.filter((myApp) => !myApp.done);
  };

  function archive() {
    $log.warn("archiving");
    o.todos = remaining();
  }

  return o;
}

function TodoListController(helpers : HelpersService.T, $q : angular.IQService, $injector) {
  let newTodoText : string;
  let o = helpers.assign(helpers.inject(TodoListBase),
                      { add, newTodoText });

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
    _replacePostalCode(o.newTodoText).then((text) => {
      o.todos.push(new Todo(text, false));
      o.newTodoText = '';
    });
  }

  return o;
}
