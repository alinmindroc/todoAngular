angular.module('todomvc', ['ngRoute'])
    .config(function ($routeProvider) {
        'use strict';
        $routeProvider.when('/', {
            controller: 'TodoCtrl',
            templateUrl: 'views/listView.html'
        }).otherwise({
            redirectTo: '/'
        });
    });
