angular.module('MainController', [])
	.controller('MainController', ['$scope', '$http', function($scope, $http) {

		// Get all users
		$http.get('/api/github/:user').then(function(response) {
			// TODO: Enable this when done testing
			$scope.repositories = response.data.repositories;
      	});
      	// TODO: remove this dummy data
		// Dummy data
      	$scope.repositories = [
      		{
      			"name": "Alcoil",
      			"branches": [
      				{
      					"name": "master",
      					"head": true,
      					"commits": [
      						{
      							"hash": "ayugwerljkdahjksd",
      							"date": "1/2/2015",
      							"message": "Latest commit message!",
      							"contributer": "Nick Spiel",
      							"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/nickspiel/128.jpg"
      						},
      						{
      							"hash": "hdfshjdfshjkdfskhj",
      							"date": "29/1/2015",
      							"message": "Why am I commiting code?!",
      							"contributer": "Ash Brock",
      							"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/gerrenlamson/128.jpg"
      						}
      					]
      				},
      				{
      					"name": "dev",
      					"head": true,
      					"commits": [
      						{
      							"hash": "ayugwerljkdahjksd",
      							"date": "1/2/2016",
      							"message": "First commit message!",
      							"contributer": "Robert Petreski",
      							"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/soffes/128.jpg"
      						},
                                          {
                                                "hash": "ayugwerljkdahjksd",
                                                "date": "1/2/2016",
                                                "message": "First commit message!",
                                                "contributer": "Robert Petreski",
                                                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/soffes/128.jpg"
                                          }
      					],
      				}
      			]
      		},
      		{
      			"name": "Myskin"
      		}
  		];
	}]
);