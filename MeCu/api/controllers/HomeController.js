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
		var post = req.param ('post');
		if (!post) {
			return res.json ({ error: 'Porra, escreve algo senão não rola' });
		}
		var id = req.session.userId;
		Post.create ({ conteudo: post, user: id }).exec (function (err, newPost) {
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
};

