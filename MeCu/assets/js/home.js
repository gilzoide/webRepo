// Controller de informações de usuário
app.controller ('UserInfoController', function ($scope, UserInfo) {
	UserInfo ($scope);
	$scope.navbar = '/templates/navbar.html';
});

// Filtro que inverte um array no ng-repeat
app.filter ('reverse', function () {
	return function (items) {
		return items.slice ().reverse ();
	};
});

// Posts, e talz
app.controller ('PostController', function ($scope, $http) {
	// variáveis temporárias, enquanto o trem não carregou os posts ainda
	$scope.allPosts = [];
	$scope.podeApagar = false;
	$scope.podeEditar = false;

	// espera ter info sobre o usuário pra cadastrar as coisas
	$scope.$on ('gotUser', function () {
		$scope.allPosts = $scope.user.posts;
		$scope.carregando = false;

		// nova postagem!
		$scope.createPost = function (titulo, conteudo) {
			$http.post ('/post', { titulo: titulo, conteudo: conteudo }).then (function yes (res) {
				if (res.data.error) {
					$scope.error = res.data.error;
				}
				else {
					$scope.allPosts.push (res.data.post);
					$scope.error = false;
				}
			});
		};
		// marca pra matar!
		$scope.marcaMorte = function (podeApagar) {
			$scope.podeApagar = podeApagar;
			$scope.error = false;
			$scope.success = false;
		};
		// apaga postagem
		$scope.mataPost = function (id, index) {
			$http.post ('/post/remove', { id: id }).then (function yes (res) {
				if (res.data.error) {
					$scope.error = res.data.error;
					$scope.success = false;
				}
				else {
					$scope.allPosts.splice ($scope.allPosts.length - index - 1, 1);
					$scope.error = false;
					$scope.success = res.data.success;
				}
			}, deuBosta ('RemovePost'));
		};
		// marca pra editar!
		$scope.marcaEditar = function (podeEditar) {
			$scope.podeEditar = podeEditar;
			$scope.error = false;
			$scope.success = false;
		};
		// salva edições no servidor
		$scope.atualizaPost = function (post) {
			$http.post ('/post/update', { id: post.id, novoConteudo: post.conteudo }).then (function yes (res) {
				if (res.data.error) {
					$scope.error = res.data.error;
					$scope.success = false;
				}
				else {
					$scope.error = false;
					$scope.success = res.data.success;
				}
			}, deuBosta ('AtualizaPost'));
		};
	});


});
