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
        })
            .state('newNote', {
                templateUrl: './views/newNote.html',
                url: '/newNote/:id', 
                controller: 'newNoteCtrl'
        })
            .state('allNotes', {
                templateUrl: './views/allNotes.html',
                url: '/allNotes'
        })
            .state('myRestaurants', {
                templateUrl: './views/myRestaurants.html',
                url: '/myRestaurants'
        })
            .state('editNotes', {
                templateUrl: './views/editNotes.html',
                url: '/editNotes/:note_id'
        })
    })