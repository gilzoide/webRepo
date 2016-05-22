// Controller de informações de usuário
app.controller ('UserInfoController', function ($scope, UserInfo) {
	UserInfo ().then (function (user) {
		$scope.user = user;
	});
});

// Controller de botões de controle
app.controller ('HeaderButtonController', function ($scope, $http, $location) {
	$scope.logout = function () {
		$http.post ('/logout').then (function yes (res) {
			$location.path (res.data.path);
		},
		function err (res) {
			$scope.error = 'Erro no logout =S';
		});
	}
});

// Filtro que inverte um array no ng-repeat
app.filter ('reverse', function () {
	return function (items) {
		return items.slice ().reverse ();
	};
});

// Posts, pra escrevê-los
app.controller ('PostController', function ($scope, $timeout, $http) {
	$scope.allPosts = []
	// espera 1 segundo, pra já ter info sobre o usuário
	$timeout (function () {
		$scope.allPosts = $scope.user.posts;
		console.log ($scope.user);

		// nova postagem!
		$scope.createPost = function (post) {
			$http.post ('/post', { post: post }).then (function yes (res) {
				if (res.data.error) {
					$scope.error = res.data.error;
				}
				else {
					$scope.allPosts.push (res.data.post);
					$scope.error = false;
				}
			});
		};
	}, 1000);


});
