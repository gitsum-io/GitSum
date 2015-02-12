// TODO: Have commented this out as it is not needed (yet?)

// angular.module('UserFactory', []).factory('UserFactory', ['$http', function($http) {
// 	return {
// 		get: function() {
// 			var users = $http.get('/api/users').then(function(response) {
// 	        	return response.data;
// 	      	});
// 			return users;
// 		},
// 		create: function(userData) {
// 			var user = $http.post('/api/users', userData).then(function(response) {
// 				return response.data;
// 			});
// 			return user;
// 		},
// 		delete: function(id) {
// 			var user = $http.delete('/api/users/' + id).then(function(response) {
// 				return response.data;
// 			});
// 			return user;
// 		},
// 		update: function(id) {
// 			var user = $http.update('/api/users/' + id, userData).then(function(response) {
// 				return response.data;
// 			});
// 			return user;
// 		}
// 	}; 
// }]);