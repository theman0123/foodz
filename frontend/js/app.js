var app = angular.module('foodz', ['ui.router']);

    app.config(function($urlRouterProvider, $stateProvider) {
        
        $urlRouterProvider.otherwise('/home');
        
        $stateProvider
            .state('home', {
                templateUrl: './views/home.html',
                url: '/home',
                controller: 'mainCtrl'
        })
    })