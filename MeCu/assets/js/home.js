// Posts, e talz
app.controller ('PostController', function ($scope, $http) {
	// variáveis temporárias, enquanto o trem não carregou os posts ainda
	$scope.allPosts = [];

	// espera ter info sobre o usuário pra cadastrar as coisas
	$scope.$on ('gotUser', function () {
		// pega posts
		$http.get ('/todosPosts').then (function (res) {
			if (res.data.error) {
				$scope.error = res.data.error;
				$scope.success = false;
			}
			else {
				$scope.error = false;
				$scope.allPosts = res.data;
			}
		}, deuBosta ('PegaTodosPosts'));
		$scope.carregando = false;

		// nova postagem!
		$scope.createPost = function (titulo, conteudo) {
			$http.post ('/post', { titulo: titulo, conteudo: conteudo }).then (function yes (res) {
				if (res.data.error) {
					$scope.error = res.data.error;
				}
				else {
					$scope.allPosts.unshift (res.data.post);
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


app.filter ('trataPost', function () {
	return function (texto) {
		// trata links -> $l:""
		texto = texto.replace (/\$l:"([^"]+)"/g, function (str, link) {
			return "<a href='" + link + "'>" + link + "</a>";
		});
		// trata imagens -> $i:""
		texto = texto.replace (/\$i:"([^"]+)"/g, function (str, link) {
			return "<img src='" + link + "' alt='" + link + "'>";
		});
		// trata usuários -> @user
		texto = texto.replace (/@(\S+)/g, function (str, nome) {
			return "<a href='#/userName/" + nome + "'>@" + nome + "</a>";
		});
		// trata tags -> #tag
		texto = texto.replace (/(#\S+)/g, function (str, tag) {
			return "<i>" + tag + "</i>";
		});

		return texto;
	};
});
