angular.module('foodz').controller('navBarCtrl', function($scope, mainSrvc, $stateParams, $state) {
    
    $scope.user_id = $stateParams.user_id;
    $scope.restaurant_id = $stateParams.id;
    console.log('navBarCtrl: $stateParams', $stateParams);
    
//    console.log(restaurant_id)
})
//angular.module('foodz').controller('newNoteCtrl', function($scope, mainSrvc, $stateParams) {
//    var idx = $stateParams.id;
//
//    $scope.item = mainSrvc.findRestaurant();
//    $scope.saveNewNote = function() {
//        var Note = {
//            title: $scope.title,
//            message: $scope.message,
//            photo: $scope.photo,
//            restaurant_id: idx
//        }
//        mainSrvc.saveNewNote($stateParams.id, Note);
//        
//        $scope.title = '';
//        $scope.message = 'Added!';
//    }
//})