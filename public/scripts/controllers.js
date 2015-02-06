var gitSumControllers = angular.module('gitSumControllers', []);

// ------------------------- Dashboard

gitSumControllers.controller('DashboardController', ['$scope', '$http',
	function ($scope, $http) {
		$scope.message = 'balls';
	}
]);

// ------------------------- Account

gitSumControllers.controller('AccountController', ['$scope', '$http',
	function ($scope, $http) {
		$scope.message = 'account';
	}
]);