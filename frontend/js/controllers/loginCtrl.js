angular.module('foodz').controller('loginCtrl', function($scope, mainSrvc, $location, $stateParams){
    
    $scope.localLogin = function() {
    
        var User = {
            email: $scope.email,
            password: $scope.password
        }
        mainSrvc.localLogin(User)
    }
    
    $scope.createNewUser = function() {
        if(validate()) {
            var newUser = {
                username: $scope.username,
                email: $scope.email,
                password: $scope.password
            }
            mainSrvc.newUser(newUser);
        }
    }
        
        /// Validate Email and password ///
    var validate = function() {
        var email = $scope.email;
        var password = $scope.password; 
        
        if ((/(.+)@(.+){2,}\.(.+){2,}/.test(email)) || email=== "" || email===null) { } else {
            alert("Please enter a valid email");
        }

        if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password)) {   

            return true;  
        } else {   
            alert('please enter a password between 6 and 20 characters long that contains: one uppercase letter, one lowercase letter, and a number. Thank you!');

            return false;  
        }
        return false;
        }

})