/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc')
    .controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, todoStorage) {
        'use strict';

        $scope.allItems = [
            {name: "buy candy", status: 0},
            {name: "workout", status: 0},
            {name: "buy apples", status: 0},
            {name: "buy weed", status: 1}
        ];
        $scope.listItems = $scope.allItems;

        $scope.check = function (item) {
            item.status = 1 - item.status;
        };

        $scope.getClass = function (item) {
            if (item.status == 1) {
                return "clicked";
            }
        };

        $scope.addItem = function (param) {
            $scope.allItems.push({name: param, status: 0});
            $scope.listItems = $scope.allItems.slice(0);
            $scope.itemToAdd = "";
        };

        $scope.filter = function (param) {
            if (param == 'completed') {
                $scope.listItems = $scope.allItems.filter(function (a) {
                    return a.status == 1;
                });
            } else if (param == 'active') {
                $scope.listItems = $scope.allItems.filter(function (a) {
                    return a.status == 0;
                });
            } else {
                $scope.listItems = $scope.allItems.slice(0);
            }
        };

        $scope.deleteItem = function (param) {
            $scope.allItems.splice($scope.allItems.indexOf(param), 1);
            $scope.listItems = $scope.allItems;
        };

        var todos = $scope.todos = todoStorage.get();

        $scope.newTodo = '';
        $scope.editedTodo = null;

        $scope.$watch('todos', function (newValue, oldValue) {
            $scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
            $scope.completedCount = todos.length - $scope.remainingCount;
            $scope.allChecked = !$scope.remainingCount;
            if (newValue !== oldValue) { // This prevents unneeded calls to the local storage
                todoStorage.put(todos);
            }
        }, true);

        // Monitor the current route for changes and adjust the filter accordingly.
        $scope.$on('$routeChangeSuccess', function () {
            var status = $scope.status = $routeParams.status || '';

            $scope.statusFilter = (status === 'active') ?
            { completed: false } : (status === 'completed') ?
            { completed: true } : null;
        });

        $scope.addTodo = function () {
            var newTodo = $scope.newTodo.trim();
            if (!newTodo.length) {
                return;
            }

            todos.push({
                title: newTodo,
                completed: false
            });

            $scope.newTodo = '';
        };

        $scope.editTodo = function (todo) {
            $scope.editedTodo = todo;
            // Clone the original todo to restore it on demand.
            $scope.originalTodo = angular.extend({}, todo);
        };

        $scope.doneEditing = function (todo) {
            $scope.editedTodo = null;
            todo.title = todo.title.trim();

            if (!todo.title) {
                $scope.removeTodo(todo);
            }
        };

        $scope.revertEditing = function (todo) {
            todos[todos.indexOf(todo)] = $scope.originalTodo;
            $scope.doneEditing($scope.originalTodo);
        };

        $scope.removeTodo = function (todo) {
            todos.splice(todos.indexOf(todo), 1);
        };

        $scope.clearCompletedTodos = function () {
            $scope.todos = todos = todos.filter(function (val) {
                return !val.completed;
            });
        };

        $scope.markAll = function (completed) {
            todos.forEach(function (todo) {
                todo.completed = !completed;
            });
        };
    });
