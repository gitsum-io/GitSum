angular.module('MainController', [])
	.controller('MainController', ['$scope', '$http', 'UserFactory', function($scope, $http, UserFactory) {
		$scope.message = 'To the moon and back!'; 
		$scope.users = UserFactory.get();
		console.log($scope.users);
	}]
);