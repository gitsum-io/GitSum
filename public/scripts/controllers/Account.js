angular.module('AccountController', [])
	.controller('AccountController', ['$scope', '$http', '$location', function($scope, $http, $location) {

// ---------------------------------------- Create User
        
        $scope.createUser = function() {

    		// Create the new user object
    		var userData = {
    			name: $scope.name,
    			email: $scope.email
    		};

    		// Attempt to send data to register route
    		var res = $http.post('/api/register', userData);

    		// Success
    		res.success(function(data, status, headers, config) {
    			// Redirect to dashboard
				$location.path('/');
    		});

    		// Error
			res.error(function(data, status, headers, config) {
				alert( "failure message: " + JSON.stringify({data: data}));
			});
		};

// ---------------------------------------- Login User

        $scope.loginUser = function() {
            // TODO: log user in on
        };
}]);