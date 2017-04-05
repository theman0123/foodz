var app = angular.module('foodz');

    app.directive('createOrEditNotes', function() {
        return {
            templateUrl: '../../views/createOrEditNotesDV.html',
            restrict: 'E',
            scope: {
                item: '=',
                title: '=',
                message: '='
            },
            controller: function($scope, mainSrvc, $stateParams, $location) {
                var idx = $stateParams.note_id;
                
                
                $scope.getNote = mainSrvc.getNotes().then(function(response) {
                    var item = response.data;
                    //having trouble pulling down restaurant_id.. needed to get restaurant title/// maybe runa  double loop--one for 'response.data'
                    console.log(response.data[1].restaurant_id)
                    
                $scope.item = mainSrvc.returnArray().find(function(object) {
//                    console.log(object, 'item', item.restaurant_id)
                    return object.id === item.restaurant_id;  
                })
                    var noteObj = item.find(function(object) {
                        return object.note_id === parseInt(idx);
                    })
                    
                    $scope.message = noteObj.note_message;
                    $scope.title = noteObj.note_title;
                })
                //write if function for put vs post
                
                //if note_id {put function} else {post function}
                $scope.saveNewNote = function() {
                    var Note = {
                        title: $scope.title,
                        message: $scope.message,
                        photo: $scope.photo,
                        restaurant_id: idx
                    }
                    mainSrvc.saveNewNote($stateParams.id, Note);

                    $scope.title = '';
                    $scope.message = 'Added!';
                }
            },
//            link: function(scope, elem, attr) {
//                scope.something = scope.item;
//                        console.log('note_message', scope.something)
//                
//            }
        }
    })