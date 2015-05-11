angular.module('AppRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', {
			templateUrl: 'views/dashboard.html',
			controller: 'MainController'
		})
		.when('/account', {
			templateUrl: 'views/account.html',
			controller: 'AccountController'
		})
		.when('/register', {
			templateUrl: 'views/register.html',
			controller: 'AccountController'
		});
}]);