angular.module('foodz').controller('loginCtrl', function($scope, mainSrvc, $location){
    
    $scope.localLogin = function() {
    
        var User = {
            email: $scope.email,
            password: $scope.password
        }
        mainSrvc.localLogin(User)
    }
})