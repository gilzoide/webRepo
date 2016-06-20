/// Script de preparação do Angular e panz

var app = angular.module ('MeCu', ['ngRoute', 'ngSanitize']);


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


// Função (xupa serviço) padrão que diz quando deu erro numa requisição HTTP
// dentro de controladores, escrevendo mensagens de erro
//
// @param funcName Nome da função que chamou a requisição.
function deuBosta (funcName) {
	return function (res) {
		errMsg = '"' + funcName + "\" deu bosta!";
		console.error (errMsg);
	};
}


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
	// no '/user/ID', rola 'user'
	$routeProvider.when ('/user/:userId', {
		templateUrl: '/templates/user.html',
	});
	// no '/user/NOME' rola 'user'
	$routeProvider.when ('/userName/:userName', {
		templateUrl: '/templates/user.html',
	});
	// no '/config', rola 'config'
	$routeProvider.when ('/config', {
		templateUrl: '/templates/config.html',
	});
	// no '/allUsers', rola 'allUsers'
	$routeProvider.when ('/allUsers', {
		templateUrl: '/templates/allUsers.html',
	});
	// no '/allGroups', rola 'allUsers'
	$routeProvider.when ('/allGroups', {
		templateUrl: '/templates/allGroups.html',
	});
	// no '/group', rola 'group'
	$routeProvider.when ('/group/:groupId', {
		templateUrl: '/templates/group.html',
	});
	// no '/myGroup', rola 'group'
	$routeProvider.when ('/myGroup/:groupId', {
		templateUrl: '/templates/group.html',
	});
	// no '/data', rola 'data'
	$routeProvider.when ('/data', {
		templateUrl: '/templates/data.html',
	});
	// 404!
	$routeProvider.otherwise ({
		templateUrl: '/templates/404.html',
	});
});


// Controller de informações de usuário
app.controller ('UserInfoController', function ($scope, UserInfo) {
	UserInfo ($scope);
	$scope.navbar = '/templates/navbar.html';

	// Filtro pra grupos que sou dono
	$scope.souDonoDoGrupo = function (grupo) {
		return $scope.user && grupo.dono == $scope.user.id;
	};
	// Filtro pra grupos que sigo
	$scope.sigoGrupo = function (grupo) {
		return $scope.user && grupo.mlkda.find (function (users) {
			return users.id == $scope.user.id;
		});
	};
	// Filtro pra grupos que não sigo
	$scope.notSigoGrupo = function (grupo) {
		return !$scope.sigoGrupo (grupo);
	};
});

