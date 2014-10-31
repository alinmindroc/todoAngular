angular.module('example', ['ngRoute'])
    .config(function ($routeProvider) {
        'use strict';
        $routeProvider.when('/', {
            controller: 'ctrl1',
            templateUrl: 'views/exampleView.html'
        }).otherwise({
            redirectTo: '/'
        });
    });
