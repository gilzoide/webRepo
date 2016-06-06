/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
				return res.json ({ error: 'Falha ao criar post =/' });
			}
			else if (!newPost) {
				return res.json ({ error: 'Usuário tá mesmo loggado?' });
			}
			else {
				newPost.save ();
				return res.json ({ post: newPost });
			}
		});
	},

	// Apaga um post
	apagaPost: function (req, res) {
		var postId = req.param ('id');
		var id = req.session.userId;

		Post.destroy ({ id: postId, user: id }).exec (function (err) {
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
				return res.json ({ error: 'Atualiza post: deu não. És o dono do post?' });
			}
			else {
				updated[0].save ();
				return res.json ({ success: 'Post atualizado!' });
			}
		});
	},
};

