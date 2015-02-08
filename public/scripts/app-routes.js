angular.module('AppRoutes', ['ngRoute']).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
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

    $locationProvider.html5Mode(true);
}]);