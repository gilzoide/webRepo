// Posts, e talz
app.controller ('PostController', function ($scope, $http) {
	// variáveis temporárias, enquanto o trem não carregou os posts ainda
	$scope.allPosts = [];
	$scope.filtroStr = '';

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
					$scope.allPosts.splice (index, 1);
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

		// do/undo like/dislike
		$scope.curtir = function (post) {
			var novoGosto = post.gosto == 'like' ? 'likeWhatever' : 'like';
			$http.post ('/post/gosto', { id: post.id, gosto: post.gosto, novoGosto: novoGosto }).then (function (res) {
				if (res.data.error) {
					$scope.error = res.data.error;
					$scope.success = false;
				}
				else {
					$scope.error = false;
					$scope.success = false;
					post.curtidas = res.data.curtidas;
					post.odiadas = res.data.odiadas;
					post.gosto = novoGosto;
					console.log (res.data);
				} 
			}, deuBosta ('PostGosto'));
		};
		$scope.odiar = function (post) {
			var novoGosto = post.gosto == 'dislike' ? 'likeWhatever' : 'dislike';
			$http.post ('/post/gosto', { id: post.id, gosto: post.gosto, novoGosto: novoGosto }).then (function (res) {
				if (res.data.error) {
					$scope.error = res.data.error;
					$scope.success = false;
				}
				else {
					$scope.error = false;
					$scope.success = false;
					post.curtidas = res.data.curtidas;
					post.odiadas = res.data.odiadas;
					post.gosto = novoGosto;
				} 
			}, deuBosta ('PostGosto'));
		};

		// repost
		$scope.repost = function (postOriginal) {
			$http.post ('/repost', { post: postOriginal.id }).then (function (res) {
				if (res.data.error) {
					$scope.error = res.data.error;
				}
				else {
					$scope.allPosts.unshift (res.data.post);
					$scope.error = false;
				}
			}, deuBosta ('Repost'));
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
		texto = texto.replace (/(#\w+)/g, function (str, tag) {
			return "<i>" + tag + "</i>";
		});

		return texto;
	};
});


app.filter ('filtroDePosts', function () {
	return function (posts, filtroStr) {
		filtro = {
			pessoas: (filtroStr.match (/@\w+/g) || []).map (function (s) { return s.substr (1); }),
			temas: (filtroStr.match (/#\w+/g) || []),
		}
		return posts.filter (function (post) {
			if (!filtro.pessoas.length && !filtro.temas.length) {
				return true;
			}
			else {
				var resultPessoas = filtro.pessoas.find (function (nome) { return nome == post.user.apelido; });
				var resultTemas = filtro.temas.find (function (tema) { return post.conteudo.search (tema) != -1; });
				if (filtro.pessoas.length && filtro.temas.length) {
					return resultPessoas && resultTemas;
				}
				else {
					return resultPessoas || resultTemas;
				}
			}
		});
	};
});
