// Controller de informações de usuário
app.controller ('UserInfoController', function ($scope, UserInfo) {
	UserInfo ().then (function (user) {
		$scope.user = user;
	});
});

// Controller de botões de controle
app.controller ('HeaderButtonController', function ($scope, $http) {
	$scope.createPost = function () {
	};
});
// 
app.controller ('PostController', function ($scope) {
	$scope.allPosts = [];
});
