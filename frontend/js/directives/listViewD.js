var app = angular.module('foodz');

    app.directive('listView', function() {
        return {
            templateUrl: '../../views/listViewDV.html',
            restrict: 'E',
            scope: {
                item: '='
            },
            controller: function($scope, mainSrvc, $stateParams) {
                var idx = $stateParams.id;
                $scope.place = mainSrvc.returnObject(idx);
                $scope.item = mainSrvc.getNotes(idx);
            }
        }
    })