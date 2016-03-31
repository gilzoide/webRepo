postsProntos = [
	'Eae Gilzera, comé que tá rapá?',
	'Ou, muito loko esses Bootstrap e AngularJS né',
	'YO!',
	'Quanto tempo levou pra fazer isso tudo? Muito pouco =]',
	'Mano, o que que tem no bandejão hoje?',
	'Cara, bora comer pizza?',
	'Ae, sucesso esse trem',
	'Você falou "pão de queijo"?'
];
// Função que pega um post random
function getRandomPost () {
	return postsProntos [Math.floor (Math.random () * postsProntos.length)];
}


(function (angular) {
	var app = angular.module ('meCu', []);
	var currentUser = new User ('Gil Barbosa Reis', 'Zumbi', 'cavalo.png');

	// Serviço que tem infos sobre o usuário atual (o loggado no sistema)
	app.factory ('User', function () {
		return currentUser;
	});

	// Controlador do cabeçalho, com infos do usuário
	app.controller ('UserInfoController', function ($scope, User) {
		$scope.user = User;
	});

	// Controlador dos botõezinhos do header
	app.controller ('HeaderButtonController', function ($scope, User) {
		// Função que cria um post aleatório e põe lá na view
		$scope.createPost = function () {
			User.addPost ({
				name : 'Post ' + User.getPosts ().length,
				content : getRandomPost ()
			});
		};
	});

	// Controlador dos posts
	app.controller ('PostController', function ($scope, User) {
		$scope.allPosts = User.getPosts ();
	});
}) (window.angular);
