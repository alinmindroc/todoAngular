angular.module('example')
    .controller('ctrl1', function ctrl1($scope, todoStorage) {
        'use strict';

        $scope.editing = false;
        $scope.var1 = "foo";
        $scope.arr = [
            {name: "learn angular", done: true},
            {name: "go to webdev", done: true},
            {name: "buy pizza", done: false},
            {name: "eat pizza", done: false}
        ];

        $scope.arr = todoStorage.get();

        $scope.add = function (item) {
            $scope.arr.push({name: item, done: false});
            todoStorage.put($scope.arr);
        };

        $scope.edit = function (item, text) {
            $scope.arr[$scope.arr.indexOf(item)].name = text;
            todoStorage.put($scope.arr);
        };

        $scope.remove = function (item) {
            $scope.arr.splice($scope.arr.indexOf(item), 1);
            todoStorage.put($scope.arr);
        };

        $scope.switch = function (item) {
            item.done = !item.done;
            todoStorage.put($scope.arr);
        };
    });
