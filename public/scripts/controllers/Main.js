angular.module('MainController', [])
	.controller('MainController', ['$scope', '$http', function($scope, $http) {
		$scope.message = 'To the moon and back!'; 
		
		// TODO: Move these into services?
		$http.get('/api/users')
		.success(function(data) {
			$scope.users = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	}]
);