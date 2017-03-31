var app = angular.module('foodz');

    app.directive('listView', function() {
        return {
            templateUrl: '../../views/listViewDV.html',
            restrict: 'E',
            scope: {
                foodz: '=',
                place: '='
            },
            controller: function($scope, mainSrvc, $stateParams, $location) {
                var idx = $stateParams.id;
                
                console.log($location);
                
                $scope.quantity = 4;

                $scope.place = mainSrvc.returnObject();

                $scope.getFoodz = mainSrvc.getNotes().then(function(response) {
                    var item = response.data;
                    if(!idx) {
                        $scope.show = false;
                        $scope.foodz = item;
                    } else {
                        $scope.show = true;
                        $scope.foodz = item.filter(function(note) {
                            return note.restaurant_id === parseInt(idx);  
                        })
                    }
                })
                    
            },
            link: function(scope, element, attrs) {
                //need to get your conditional statement correct//
//                console.log('getFoodz', scope.getFoodz, 'scope', scope)
//                var index = 0;
                var html = '<div class="noNotes">No Notes Yet</div>'
                if (scope.getFoodz < 1) {
                    console.log('true')
                    element.html(html);
                }
            }
        }
    })