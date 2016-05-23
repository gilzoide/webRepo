var app = angular.module ('MeCu', ['ngRoute']);

// Serviço que pega as informações do usuário atual
//
// Deve ser usado injetado, num 'resolve' das rotas
//
// @note que isso só funciona depois de um 'login' bem sucedido, já que o ID de
//  usuário fica na sessão de requisições http
app.factory ('UserInfo', function ($http) {
	// recebe escopo local, que adiciona o usuário como 'scope.user' e já manda
	// um evento pros filhos. Como filhos têm acesso ao escopo pai, tá tudo no
	// esquema xD
	return function (scope) {
		return $http.get ('/userinfo').then (function (res) {
			scope.user = res.data;
			scope.$broadcast ('gotUser');
		});
	};
});

// Rotas, pra sincronizar o ng-view
app.config (function ($routeProvider) {
	// no '/', rola 'login'
	$routeProvider.when ('/', {
		templateUrl: '/templates/login.html',
	});
	// no '/home', rola 'home'
	$routeProvider.when ('/home', {
		templateUrl: '/templates/home.html',
	});
	// 404!
	$routeProvider.otherwise ({
		templateUrl: '/templates/404.html',
	});
});

// Login Controller
app.controller ('LoginController', function ($scope, $http, $location) {
	$scope.user = {};
	
	$scope.login = function () {
		$http.post ('/login', $scope.user).then (function yes (res) {
			if (res.data.error) {
				$scope.error = res.data.error;
				$scope.success = false;
			}
			else {
				// redireciona pro '/home'
				$location.path (res.data.path);
			}
		},
		function err (res) {
			$scope.error = 'Não consegui dar POST =S';
		});
	}
});

// Register Controller
app.controller ('RegisterController', function ($scope, $http) {
	$scope.user = {};

	$scope.register = function () {
		$http.post ('/register', $scope.user).then (function yes (res) {
			if (res.data.error) {
				$scope.error = res.data.error;
				$scope.success = false;
			}
			else {
				$scope.error = false;
				$scope.success = res.data.success;
			}
		}, function err (res) {
			$scope.error = 'Não consegui dar POST =S';
		});
	}
});
