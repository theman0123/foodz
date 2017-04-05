app.directive('newNote', function() {
    return {
        templateUrl: '../../views/newNoteDV.html',
        restrict: 'E',
        scope: {
            item: '='
        },
        controller: function($scope, mainSrvc, $stateParams) {
            var idx = $stateParams.id
//            console.log($stateParams)
//            console.log('newnote and return object', mainSrvc.returnObject(idx))
            $scope.item = mainSrvc.getNotes().then(function(response) {
                var item = response.data
//                console.log(item)
                
                $scope.item = mainSrvc.returnObject(idx);
            })
        }
    }
})