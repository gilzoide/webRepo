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

	// Pega infos de um usuário específico
	pegaUsuario: function (req, res) {
		var id = req.param ('id');
		User.findOne ({ id: id, ativo: true }).populate (['posts']).exec (function (err, user) {
			if (err) {
				return res.json ({ error: err });
			}
			else if (!user) {
				return res.json ({ error: 'Grupo ' + id + ' não encontrado =S' });
			}
			else {
				return res.json (user);
			}
		});
	},
};

