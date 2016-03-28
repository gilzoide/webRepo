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

	// Controlador geral, com infos do usuário
	app.controller ('meCuController', function ($scope) {
		$scope.usuario = new User ('Gil Barbosa Reis', 'Zumbi', 'cavalo.png');

		$scope.addPost = function (post) {
			$scope.usuario.posts.push (post);
		}

		$scope.getPosts = function () {
			return $scope.usuario.posts;
		}
	});

	// Controlador do cabeçalho, com infos do usuário
	app.controller ('UserInfoController', function ($scope) {
		$scope.nome = $scope.usuario.nome;
		$scope.apelido = $scope.usuario.apelido;
		$scope.foto = $scope.usuario.foto;
	});

	// Controlador dos botõezinhos do header
	app.controller ('HeaderButtonController', function ($scope) {
		// Função que cria um post aleatório e põe lá na view
		$scope.createPost = function () {
			$scope.addPost ({
				name : 'Post ' + $scope.getPosts ().length,
				content : getRandomPost ()
			});
		};
	});

	// Controlador dos posts
	app.controller ('PostController', function ($scope) {
		$scope.allPosts = $scope.getPosts ();
	});
}) (window.angular);
