// ------------------------- Global application setup

angular.module('gitSum', [
	'ngRoute',
	'AppRoutes',
	'MainController',
	'UserController',
	'UserService'
]);