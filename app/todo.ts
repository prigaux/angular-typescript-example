class Todo {
  constructor(public text : string, public done : boolean) {
  }
}

class TodoListController {
  newTodoText : string;
  todos = [
    new Todo('learn angular', true),
    new Todo('build an angular app', false),
  ];

  constructor(private helpers : HelpersService.T, private $q : angular.IQService) {
  }

  private _replacePostalCode(text : string) : angular.IPromise<string> {
    let m = text.match(/(.*)([0-9]{5})(.*)/);
    if (m) {
      let [, before, postalcode, after] = m;
      return this.helpers.postalcode2towns(postalcode).then(
        (towns) => towns && towns[0],
        (err) => undefined
      ).then((town) =>
        before + (town || postalcode) + after
      );
    } else {
        return this.$q.resolve(text);
    }
  }

  add() {
    this._replacePostalCode(this.newTodoText).then((text) => {
      this.todos.push(new Todo(text, false));
      this.newTodoText = '';
    });
  }

  remaining() {
    return this.todos.filter((myApp) => !myApp.done);
  };

  archive() {
    this.todos = this.remaining();
  }
}
