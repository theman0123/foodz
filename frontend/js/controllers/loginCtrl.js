angular.module('foodz').controller('loginCtrl', function($scope, mainSrvc, $stateParams){
    $scope.fbLogin = function() {
        console.log('in')
        mainSrvc.fbLogin();
    }
})