app.directive('newNote', function() {
    return {
        templateUrl: '../../views/newNoteDV.html',
        restrict: 'E',
        scope: {
            item: '='
        },
        controller: function($scope, mainSrvc, $stateParams) {
            var idx = $stateParams.id;
            $scope.user_id = $stateParams.user_id;
            $scope.restaurant_id = $stateParams.id;
            
            $scope.item = mainSrvc.getNotes().then(function(response) {
                var item = response.data
                
                $scope.item = mainSrvc.findRestaurant(idx);
            })
        }
    }
})