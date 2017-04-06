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
    
                console.log('stateParams', $stateParams)
                
                $scope.getNote = mainSrvc.getNotes().then(function(response) {
                    var notes = response.data;
                    var noteObj = notes.find(function(object) {
                        return object.note_id === parseInt(idx);
                    })  
                    
                    $scope.getItem = mainSrvc.getAllRestaurants().then(function(response) {
                        var places = response.data;
                        var place = notes.find(function(item) {
                            console.log('note_id', item.note_id, 'idx', idx)
                            return item.note_id === parseInt(idx);
                        })
                        
                        $scope.item = places.find(function(object) {
                            console.log('objectid', object.id, 'restid', place)
                            return object.id === place.restaurant_id;  
                        })
                    })
                    $scope.message = noteObj.note_message;
                    $scope.title = noteObj.note_title;
                })

                $scope.saveNewNote = function() {
                    //build note//
                    var Note = {
                        title: $scope.title,
                        message: $scope.message,
                        photo: $scope.photo
                    }
                    ///check if put///
                    if(idx) {
                        Note.note_id = idx;
                        mainSrvc.putNote(idx, Note);
                        ////or post////
                    } else {
                        console.log('idx', idx + ' params', $stateParams)
                        Note.restaurant_id = $stateParams.id;
                        mainSrvc.saveNewNote($stateParams.id, Note);
                    }
                    $scope.title = '';
                    $scope.message = 'Added!';
                    /////go to new view/////
                }
            },
//            link: function(scope, elem, attr) {
//                scope.something = scope.item;
//                        console.log('note_message', scope.something)
//                
//            }
        }
    })