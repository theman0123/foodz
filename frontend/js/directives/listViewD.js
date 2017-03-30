var app = angular.module('foodz');

    app.directive('listView', function() {
        return {
            templateUrl: '../../views/listViewDV.html',
            restrict: 'E',
            scope: {
                foodz: '=',
                place: '='
            },
            controller: function($scope, mainSrvc, $stateParams) {
                var idx = $stateParams.id;
                $scope.quantity = 4;
                
                $scope.place = mainSrvc.returnObject();
                
                $scope.something = mainSrvc.getNotes().then(function(response) {
                    var item = response.data;
                    $scope.foodz = item.filter(function(note) {
                        return note.restaurant_id === parseInt(idx);  
                    }) 
                }) 
            }
        }
    })