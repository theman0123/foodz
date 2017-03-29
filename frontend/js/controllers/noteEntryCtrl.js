angular.module('foodz').controller('noteEntryCtrl', function($scope, mainSrvc, $stateParams) {

    var idx = $stateParams.id;
    $scope.place = mainSrvc.returnObject(idx);
    
    
//    $scope.createNewNote = function(idx) {
//        console.log('createNewNote')
//        mainSrvc.createNewNote(idx);
//        //create a new note based on info of current restaurant//
//    }
})