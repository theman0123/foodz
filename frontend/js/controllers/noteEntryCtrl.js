angular.module('foodz').controller('noteEntryCtrl', function($scope, mainSrvc, $stateParams) {

    var idx = $stateParams.id;
    $scope.place = mainSrvc.returnObject(idx);
    
    
    $scope.createNewNote = function() {
        console.log('createNewNote')
        
        //create a new note based on info of current restaurant//
    }
    $scope.menuRedirect = function() {
        console.log('menuRedirect')
        //redirect to menu of selected restaurant
    }
})