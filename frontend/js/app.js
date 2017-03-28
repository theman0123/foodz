var app = angular.module('foodz', ['ui.router']);

    app.config(function($urlRouterProvider, $stateProvider) {
        
        $urlRouterProvider.otherwise('/home');
        
        $stateProvider
            .state('home', {
                templateUrl: './views/home.html',
                url: '/home',
                controller: 'mainCtrl'
        })
            .state('noteEntry', {
                templateUrl: './views/noteEntry.html',
                url: '/noteEntry/:id',
                controller: 'noteEntryCtrl'
        })
            .state('newNote', {
                templateUrl: './views/newNote.html',
                url: '/newNote', //:id
//                controller: 'newNoteCtrl'
        })
    })