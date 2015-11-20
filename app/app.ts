/// <reference path="../typings/tsd.d.ts" />

angular.module('myApp', []);
angular.module('myApp').service('helpers', HelpersService.create);
angular.module('myApp').controller('todoListController', TodoListController);
