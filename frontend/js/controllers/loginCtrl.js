angular.module('foodz').controller('loginCtrl', function($scope, mainSrvc, $stateParams){
    
    $scope.localLogin = function() {
        console.log('local')
        
        var User = {
            email: $scope.email,
            password: $scope.password
        }
        
        mainSrvc.localLogin(User)
    }
})