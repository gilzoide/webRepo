app.controller ('UserController', function ($scope, $http, $routeParams, $location) {
	// pro angular parar de encher o saco enquanto http não rola
	$scope.pessoa = {
		posts: []
	};

	$http.post ('/user', { id: $routeParams.userId, apelido: $routeParams.userName }).then (function (res) {
		if (res.data.error) {
			$scope.error = res.data.error;
		}
		else {
			$scope.pessoa = res.data;
		}
	}, deuBosta ('GetGroup'));
});
