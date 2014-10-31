angular.module('todomvc')
    .controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter) {
        'use strict';
        $scope.someBool = undefined;

        $scope.allItems = [
            {name: 'learn angular', done: false},
            {name: 'buy pizza', done: false},
            {name: 'eat pizza', done: true},
            {name: 'code ftw', done: true}
        ];

        $scope.check = function (item) {
            item.done = !item.done;
        };

        $scope.delete = function (item) {
            $scope.allItems.splice($scope.allItems.indexOf(item), 1);
        };

        $scope.getCLass = function (item) {
            if (item.done == true)
                return "green";
            else
                return "red";
        };

        $scope.addItem = function (item) {
            $scope.allItems.push({name: item, done: false});
        }
    });
