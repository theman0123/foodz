app.directive('newNote', function() {
    return {
        templateUrl: '../../views/newNoteDV.html',
        restrict: 'E',
        scope: {
            item: '='
        },
        controller: function($scope, mainSrvc, $stateParams) {
            var idx = $stateParams.id
            $scope.item = mainSrvc.returnObject(idx);   
        }
    }
})