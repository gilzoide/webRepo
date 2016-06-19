/**
 * AllUsersController
 *
 * @description :: Server-side logic for managing Allusers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// GET em todos usuários
	pegaCadastrados: function (req, res) {
		User.find ().exec (function (err, usersCadastrados) {
			if (err) {
				return res.json ({ error: err });
			}
			else {
				return res.json (usersCadastrados);
			}
		});
	},

	// Pega infos de um usuário específico, por ID ou APELIDO
	pegaUsuario: function (req, res) {
		var id = req.param ('id');
		var obj = {};
		if (id) {
			obj.id = id;
		}
		else {
			var apelido = req.param ('apelido');
			if (!apelido) {
				return res.json ({ error: 'PegaUsuário: faltou params, troxa' });
			}
			obj.apelido = apelido;
		}

		var eu = req.session.userId;

		User.findOne (obj).populate (['me_segue']).exec (function (err, user) {
			if (err) {
				return res.json ({ error: err });
			}
			else if (!user) {
				return res.json ({ error: 'Usuário não encontrado =S' });
			}

			// popula posts, com tudo que precisa
			Post.find ({ user: user.id, 'sort': 'createdAt DESC' }).populate (['curtiu', 'odiou', 'repost']).exec (function (err, posts) {
				if (err) {
					return res.json ({ error: err });
				}

				posts.forEach (function (p) {
					if (p.curtiu.find (function (u) { return u.id == eu; })) {
						p.gosto = 'like';
					}
					else if (p.odiou.find (function (u) { return u.id == eu; })) {
						p.gosto = 'dislike';
					}
					else {
						p.gosto = 'likeWhatever';
					}

					p.curtidas = p.curtiu.length;
					p.odiadas = p.odiou.length;
				});

				// armazena se eu sigo ou não usuário
				user.sigo = user.me_segue.find (function (u) { return u.id == req.session.userId; }) ? true : false;
				return res.json ({ user: user, posts: posts });
			});
		});
	},

	// Toggle seguir usuário
	seguir: function (req, res) {
		var id = req.param ('id');
		var eu = req.session.userId;

		if (id == eu) {
			return res.json ({ error: 'Não pode seguir a si mesmo' });
		}

		User.findOneById (id).populate ('me_segue').exec (function (err, user) {
			if (err) {
				return res.json ({ error: err });
			}
			else if (!user) {
				return res.json ({ error: 'Não pode seguir usuário que não existe' });
			}
			else {
				euSigo = user.me_segue.find (function (u) { return u.id == eu; });
				
				User.findOneById (eu).populate ('segue_pessoa').exec (function (err, EU) {
					if (err) {
						return res.json ({ error: err });
					}

				   	if (euSigo) {
						EU.segue_pessoa.remove (id);
						EU.save ();
						return res.json ({ success: 'Parou de seguir', sigo: false });
					}
					else {
						EU.segue_pessoa.add (id);
						EU.save ();
						return res.json ({ success: 'Está seguindo', sigo: true });
					}
				});
			}
		});
	},
};

