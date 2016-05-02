(function (angular) {
	var app = angular.module ('meCu', []);
	// Controller de informações de usuário
	app.controller ('UserInfoController', function ($scope) {
		$scope.user = {
			nome: 'oie',
			apelido: 'cara',
			foto: 'fotoPadrao.png'
		}
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
}) (window.angular);

