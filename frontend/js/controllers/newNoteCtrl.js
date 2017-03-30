angular.module('foodz').controller('newNoteCtrl', function($scope, mainSrvc, $stateParams) {
    var idx = $stateParams.id;

    $scope.item = mainSrvc.returnObject();
    $scope.saveNewNote = function() {
        var Note = {
            title: $scope.title,
            message: $scope.message,
            photo: $scope.photo,
            restaurant_id: idx
        }
        mainSrvc.saveNewNote($stateParams.id, Note);
        
        $scope.title = '';
        $scope.message = 'Added!';
    }
})