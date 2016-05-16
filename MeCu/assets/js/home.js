// Controller de informações de usuário
app.controller ('UserInfoController', function ($scope, UserInfo) {
	UserInfo ().then (function (user) {
		$scope.user = user;
	});
});

// Controller de botões de controle
app.controller ('HeaderButtonController', function ($scope, $http, $location) {
	$scope.createPost = function () {
	};

	$scope.logout = function () {
		$http.post ('/logout').then (function yes (res) {
			$location.path (res.data.path);
		},
		function err (res) {
			$scope.error = 'Erro no logout =S';
		});
	}
});

// Posts, pra escrevê-los
app.controller ('PostController', function ($scope, $timeout) {
	// espera 1 segundo, pra já ter info sobre o usuário
	$timeout (function () {
		$scope.allPosts = $scope.user.posts;
	}, 1000);
});
