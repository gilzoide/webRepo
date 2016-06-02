/// Script de preparação do Angular e panz

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
	// no '/config', rola 'config'
	$routeProvider.when ('/config', {
		templateUrl: '/templates/config.html',
	});
	// 404!
	$routeProvider.otherwise ({
		templateUrl: '/templates/404.html',
	});
});


