app.controller ('UserController', function ($scope, $http, $routeParams, $location) {
	$http.post ('/user', { id: $routeParams.userId }).then (function (res) {
		if (res.data.error) {
			$scope.error = res.data.error;
		}
		else {
			$scope.pessoa = res.data;
			console.log ($scope.pessoa);
		}
	}, deuBosta ('GetGroup'));

});
