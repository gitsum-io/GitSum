angular.module('AppRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'views/dashboard.html',
            controller: 'MainController'
        })
        .when('/users', {
            templateUrl: 'views/account.html',
            controller: 'UserController'
     	}
     );
}]);