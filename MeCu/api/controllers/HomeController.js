/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var atributosNecessarios = ['user', 'curtiu', 'odiou', 'repost'];

module.exports = {
	// Pega informações do usuário loggado. Precisa ter autenticado
	getLogged: function (req, res) {
		var id = req.session.userId;
		User.findOneById (id).populate ('posts').exec (function (err, user) {
			if (err) {
				return res.json ({ error: 'Falha ao pegar infos de usuário =/' });
			}
			else if (!user) {
				return res.json ({ error: 'Usuário ' + id + ' não encontrado =/' });
			}
			else {
				//console.log (user);
				return res.json (user);
			}
		});
	},

	// sai do sistema
	logout: function (req, res) {
		req.session.userId = undefined;
		req.session.authenticated = false;
		// manda pro '/'
		return res.json ({ path: '/' });
	},

	// Adiciona um post ao usuário loggado
	post: function (req, res) {
		var titulo = req.param ('titulo');
		var conteudo = req.param ('conteudo');
		if (!titulo) {
			return res.json ({ error: 'Porra, post precisa dum título' });
		}
		else if (!conteudo) {
			return res.json ({ error: 'Porra, escreve algo senão não tem post' });
		}

		var id = req.session.userId;
		Post.create ({ titulo: titulo, conteudo: conteudo, user: id }).exec (function (err, newPost) {
			if (err) {
				return res.json ({ error: err });
			}
			else if (!newPost) {
				return res.json ({ error: 'Usuário tá mesmo loggado?' });
			}

			// inicializa coisas importantes
			newPost.curtidas = 0;
			newPost.odiadas = 0;
			newPost.gosto = 'likeWhatever';
			newPost.user = { id: id };
			return res.json ({ post: newPost });
		});
	},

	repost: function (req, res) {
		var id = req.session.userId;
		var postOriginal = req.param ('post');

		Post.findOneById (postOriginal).populate ('repost').exec (function (err, post) {
			if (err) {
				return res.json ({ error: err });
			}
			else if (!post) {
				return res.json ({ error: 'Não posso repostar um post que não existe =/' });
			}
			
			// se o post for um repost tb, referencia quem ele referencia, e não ele mesmo
			if (post.repost) {
				postOriginal = post.repost.id;
				post = post.repost;
			}

			// se post existe e talz, cria o repost ;]
			Post.create ({ user: id, repost: postOriginal }).exec (function (err, criado) {
				if (err) {
					return res.json ({ error: err });
				}
				else if (!criado) {
					return res.json ({ error: 'Falha ao criar repost' });
				}

				// inicializa coisas importantes
				criado.curtidas = 0;
				criado.odiadas = 0;
				criado.gosto = 'likeWhatever';
				criado.repost = post;
				criado.user = { id: id };

				return res.json ({ post: criado });
			});
		});
	},

	// Apaga um post
	apagaPost: function (req, res) {
		var postId = req.param ('id');
		var id = req.session.userId;

		Post.destroy ({ 'or': [
			// post dado
			{ id: postId, user: id },
			// qualquer repost desse aqui
			{ repost: postId },
		]}).exec (function (err) {
			if (err) {
				return res.json ({ error: 'Apaga post: deu não. És o dono do post?' });
			}
			else {
				return res.json ({ success: 'Post apagado!' });
			}
		});
	},

	// Atualiza um post
	atualizaPost: function (req, res) {
		var postId = req.param ('id');
		var conteudo = req.param ('novoConteudo');
		if (!conteudo) {
			return res.json ({ error: 'Post necessita conteúdo!' });
		}

		var id = req.session.userId;

		Post.update ({ id: postId, user: id }, { conteudo: conteudo }).exec (function (err, updated) {
			if (err) {
				return res.json ({ error: err });
			}
			else if (!updated[0]) {
				return res.json ({ error: 'Atualiza post: deu não. És o dono do post?' });
			}
			else {
				updated[0].save ();
				return res.json ({ success: 'Post atualizado!' });
			}
		});
	},

	// Pega todos os posts que usuário logado escuta (incluindo grupos e talz)
	pegaTodosPosts: function (req, res) {
		var id = req.session.userId;
		User.findOne ({ id: id }).populate (['segue_pessoa', 'segue_grupo']).exec (function (err, user) {
			if (err) {
				return res.json ({ error: err });
			}
			else if (!user) {
				return res.json ({ error: 'Usuário não encontrado =S' });
			}

			// inclui próprio usuário na busca por posts, como se ele mesmo se seguisse
			user.segue_pessoa.push ({ id: id });

			// critérios de buscar posts. Padrão: quem sigo (incluindo eu mesmo), e posts q me referenciam
			var criterios = [
				{ user: user.segue_pessoa.map (function (u) { return u.id; }) },
				{ conteudo: { 'contains': '@' + user.apelido } },
			];
			// se seguir grupos, procura posts de grupo
			if (user.segue_grupo.length) {
				criterios.push ({ conteudo: { 'contains' : user.segue_grupo.map (function (g) { return '@' + g.nome; }) } });
			}
			// procura posts, ordenados por data
			Post.find ({ 'or': criterios, 'sort': 'createdAt DESC' }).populate (atributosNecessarios).exec (function (err, posts) {
				if (err) {
					return res.json ({ error: err });
				}

				// pra cada post, insere gosto do usuário (like, dislike, likeWhatever), pra facilitar transição
				// insere também total de curtidas/odiadas
				posts.forEach (function (p) {
					if (p.curtiu.find (function (u) { return u.id == user.id; })) {
						p.gosto = 'like';
					}
					else if (p.odiou.find (function (u) { return u.id == user.id; })) {
						p.gosto = 'dislike';
					}
					else {
						p.gosto = 'likeWhatever';
					}

					p.curtidas = p.curtiu.length;
					p.odiadas = p.odiou.length;
				});
				return res.json (posts);
			});
		});
	},

	// Curte um post =P
	mudaGosto: function (req, res) {
		var id = req.session.userId;
		var post = req.param ('id');
		var gosto = req.param ('gosto');
		var novoGosto = req.param ('novoGosto');

		var gostosValidos = ['like', 'dislike', 'likeWhatever'];
		
		if (!post) {
			return res.json ({ error: 'Dá ID do post pra poder curtir' });
		}
		else if (gostosValidos.indexOf (gosto) == -1) {
			return res.json ({ error: 'Gosto inválido' });
		}
		else if (gostosValidos.indexOf (novoGosto) == -1) {
			return res.json ({ error: 'Novo Gosto inválido' });
		}

		Post.findOneById (post).populate (['curtiu', 'odiou']).exec (function (err, P) {
			if (err) {
				return res.json ({ error: err });
			}
			else if (!P) {
				return res.json ({ error: 'Post não encontrado =/' });
			}

			var curtidas = P.curtiu.length;
			var odiadas = P.odiou.length;
			// se curtia e mudou, n curte mais
			if (gosto == 'like') {
				P.curtiu.remove (id);
				curtidas--;
			}
			// se odiava e mudou, n odeia mais
			else if (gosto == 'dislike') {
				P.odiou.remove (id);
				odiadas--;
			}

			// agora curte
			if (novoGosto == 'like') {
				P.curtiu.add (id);
				curtidas++;
			}
			// agora odeia
			else if (novoGosto == 'dislike') {
				P.odiou.add (id);
				odiadas++;
			}
			// se likeWhatever, põe em lugar nenhum

			P.save ();
			return res.json ({ curtidas: curtidas, odiadas: odiadas });
		});
	},
};

