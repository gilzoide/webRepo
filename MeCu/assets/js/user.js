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
			$scope.pessoa = res.data.user;
			$scope.allPosts = res.data.posts;
			$scope.sigo = $scope.pessoa.sigo;
		}
	}, deuBosta ('GetUser'));

	$scope.seguir = function (pessoa) {
		$http.post ('/user/seguir', { id: pessoa.id }).then (function (res) {
			if (res.data.error) {
				$scope.error = res.data.error;
				$scope.success = false;
			}
			else {
				$scope.error = false;
				$scope.success = res.data.success;
				$scope.sigo = res.data.sigo;
			}
		}, deuBosta ('SeguirPessoa'));
	};
});
