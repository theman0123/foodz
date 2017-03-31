var app = angular.module('foodz');

    app.directive('createOrEditNotes', function() {
        return {
            templateUrl: '../../views/createOrEditNotesDV.html',
            restrict: 'E',
            scope: {
                item: '=',
                title: '=',
                message: '='
            },
            controller: function($scope, mainSrvc, $stateParams, $location) {
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
            }
        }
    })