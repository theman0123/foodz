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
                $scope.id = $stateParams.id;
                $scope.quantity = 4;
                
                $scope.place = mainSrvc.returnObject();
                //better way to do the below?//
                $scope.getNotes = mainSrvc.getNotes().then(function(response) {
                    var item = response.data;
                    if(!idx) {
                        $scope.foodz = item;
                    } else if(idx) {
                        $scope.foodz = item.filter(function(note) {
                            return note.restaurant_id === parseInt(idx);  
                        })
                    }
                })
            },
            link: function(scope, elem, attr) {
                if(!scope.id) {
                    scope.place = 'can this be done?';
                    console.log('inside link', scope.place)
                    
                }
            }
        }
    })