/**
 * AllUsersController
 *
 * @description :: Server-side logic for managing Allusers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// GET em todos usuários
	pegaCadastrados: function (req, res) {
		User.find ({ ativo: true }).exec (function (err, usersCadastrados) {
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
		var obj = { ativo: true };
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

		User.findOne (obj).populate (['posts']).exec (function (err, user) {
			if (err) {
				return res.json ({ error: err });
			}
			else if (!user) {
				return res.json ({ error: 'Usuário não encontrado =S' });
			}
			else {
				return res.json (user);
			}
		});
	},
};

