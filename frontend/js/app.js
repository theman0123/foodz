var app = angular.module('foodz', ['ui.router']);

    app.config(function($urlRouterProvider, $stateProvider) {
        
        $urlRouterProvider.otherwise('/login');
        
        $stateProvider
            .state('NewUser', {
                templateUrl: './views/newUser.html',
                url: '/newUser',
                controller: 'loginCtrl'
        })
            .state('login', {
                templateUrl: './views/login.html',
                url: '/login',
                controller: 'loginCtrl'
        })
            .state('home', {
                templateUrl: './views/home.html',
                url: '/home/:user_id',
                controller: 'homeCtrl'
        })
            .state('noteEntry', {
                templateUrl: './views/noteEntry.html',
                url: '/noteEntry/:id/:user_id'
        })
            .state('newNote', {
                templateUrl: './views/newNote.html',
                url: '/newNote/:id/:user_id' 
        })
            .state('allNotes', {
                templateUrl: './views/allNotes.html',
                url: '/allNotes/:user_id'
        })
            .state('myRestaurants', {
                templateUrl: './views/myRestaurants.html',
                url: '/myRestaurants/:user_id'
        })
            .state('editNotes', {
                templateUrl: './views/editNotes.html',
                url: '/editNotes/:note_id/:user_id/:id'
        })
    })