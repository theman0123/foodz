angular.module('foodz').controller('newNoteCtrl', function($scope, mainSrvc, $stateParams) {
    var idx = $stateParams.id;
        console.log($stateParams.id);

    $scope.saveNewNote = function(idx) {
        var Note = {
            title: $scope.title,
            message: $scope.message,
            photo: $scope.photo,
            restaurant_id: idx
        }
        mainSrvc.saveNewNote($stateParams.id, Note);
    }
})