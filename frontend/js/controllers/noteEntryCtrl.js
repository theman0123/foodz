angular.module('foodz').controller('noteEntryCtrl', function($scope, mainSrvc) {
    $scope.createNewNote = function() {
        console.log('createNewNote')
        //create a new note based on info of current restaurant//
    }
    $scope.menuRedirect = function() {
        console.log('menuRedirect')
        //redirect to menu of selected restaurant
    }
})