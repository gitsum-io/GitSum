// TODO: need to discuss wether rolling each page into a module

gitSum.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
		.when('/dashboard', {
			templateUrl: 'views/dashboard.html',
			controller: 'DashboardController'
		})
		.when('/account', {
			templateUrl: 'views/account.html',
			controller: 'AccountController'
		})
		.otherwise({
			redirectTo: '/dashboard'
		});
	}
]);