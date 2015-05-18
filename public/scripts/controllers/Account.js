angular.module('AccountController', [])
	.controller('AccountController', ['$scope', '$http', '$location', function($scope, $http, $location) {

		$scope.message = 'blank';
// ---------------------------------------- Create User
        
        $scope.registerUser = function() {

    		 // Create the new user object
            var userData = {
                name: $scope.name,
                email: $scope.email,
                password: $scope.password
            };

            // process the signup form
            res = $http.post('/api/register', userData);
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
            var res = $http.post('/login', userData);

            // Success
            res.success(function(data, status, headers, config) {
                // Redirect to dashboard
                $location.path('/');
            });

            // Error
            res.error(function(data, status, headers, config) {
            	$location.path('/login/');
            });
        };
}]);