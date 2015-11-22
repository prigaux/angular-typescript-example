class Todo {
  constructor(public text: string, public done: boolean) {
  }
}

namespace TodoListController {
export function create(helpers: HelpersService.T, $q: angular.IQService, $log: angular.ILogService, $scope: angular.IRootScopeService) {
  let o = helpers.assign($scope, {
      newTodoText: '',
      todos: [
        new Todo('learn angular', true),
        new Todo('build an angular app', false),
      ],
  });

  // it could be simply: o.$watch('newTodoText', ...) which is sometimes simpler
  o.$watch(() => o.newTodoText, (v) => {
      $log.warn("newTodoText is now ", v);
  });

  function _replacePostalCode(text: string): angular.IPromise<string> {
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
  function remaining() {
    return o.todos.filter((myApp) => !myApp.done);
  }

  function archive() {
    o.todos = remaining();
  }
  return helpers.assign(o, { add, remaining, archive });
};
}
