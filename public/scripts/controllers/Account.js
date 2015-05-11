angular.module('AccountController', [])
	.controller('AccountController', ['$scope', '$http', '$location', function($scope, $http, $location) {

// ---------------------------------------- Create User
        
        $scope.registerUser = function() {

    		 // Create the new user object
            var userData = {
                name: $scope.registerName,
                email: $scope.registerEmail,
                password: $scope.registerPassword
            };

            // process the signup form
            var res = $http.post('/register/', userData);

            // Success
            res.success(function(data, status, headers, config) {
                // Redirect to dashboard
                $location.path('/');
            });

            // Error
            res.error(function(data, status, headers, config) {
            });
		};

// ---------------------------------------- Login User

        $scope.loginUser = function() {

            // Create the new user object
            var userData = {
                name: $scope.registerName,
                email: $scope.registerEmail,
                password: $scope.registerPassword
            };

            // process the signup form
            var res = $http.post('/login/', userData);

            // Success
            res.success(function(data, status, headers, config) {
                // Redirect to dashboard
                $location.path('/');
            });

            // Error
            res.error(function(data, status, headers, config) {
            });
        };
}]);