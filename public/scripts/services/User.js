angular.module('UserFactory', []).factory('UserFactory', ['$http', function($http) {
	return {
		get: function() {
			return $http.get('/api/users');
		},
		create: function(userData) {
			return $http.post('/api/users', userData);
		},
		delete: function(id) {
			return $http.delete('/api/users/' + id);
		},
		update: function(id) {
			return $http.update('/api/users/' + id, userData);
		}
	}; 
}]);