angular.module('example')
    .controller('ctrl1', function ctrl1($scope) {
        'use strict';

        $scope.editing = false;
        $scope.var1 = "foo";
        $scope.arr = [
            {name: "learn angular", done: true},
            {name: "go to webdev", done: true},
            {name: "buy pizza", done: false},
            {name: "eat pizza", done: false}
        ];

        $scope.add = function (item) {
            $scope.arr.push({name: item, done: false});
        };

        $scope.edit = function (item, text) {
            $scope.arr[$scope.arr.indexOf(item)].name = text;
       };

        $scope.remove = function (item) {
            $scope.arr.splice($scope.arr.indexOf(item), 1);
        };

        $scope.switch = function (item) {
            item.done = !item.done;
        };
    });
