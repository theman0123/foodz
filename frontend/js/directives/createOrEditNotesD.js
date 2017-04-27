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
                $scope.user_id = $stateParams.user_id;
                $scope.restaurant_id = $stateParams.id;
                console.log('stateParams is', $stateParams)
                
                $scope.restaurant = mainSrvc.findRestaurant();

                $scope.getNote = mainSrvc.getNotes().then(function(response) {
                    var notes = response.data;
                    
                    var noteObj = notes.find(function(object) {
        
                        return object.note_id === parseInt(idx);
                    })  
                        
                    console.log('idx true?', idx, 'noteObj', noteObj)
                    
                    /// update a note/// 
                    if(idx){
                        $scope.message = noteObj.note_message;
                        $scope.title = noteObj.note_title;
                    }
                })
                /// end of update ///
                
                $scope.saveNote = function() {

                    var Note = {
                        title: $scope.title,
                        message: $scope.message,
                        photo: $scope.photo,
                        user_id: $stateParams.user_id
                    }

                    ///check if put///
                    if(idx) {
                        Note.note_id = idx;
                        mainSrvc.putNote(idx, Note);
                    } 
                    ////else post////
                    else {
                        Note.restaurant_id = $stateParams.id;
                        mainSrvc.saveNewNote(Note);
                    /////go to noteList view/////
                    }
                }
            },
//            link: function(scope, elem, attr) {
//                scope.something = scope.item;
//                        console.log('note_message', scope.something)
//                
//            }
        }
    })