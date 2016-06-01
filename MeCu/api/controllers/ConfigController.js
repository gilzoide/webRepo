/**
 * ConfigController
 *
 * @description :: Server-side logic for managing Configs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// "Apaga" usuário loggado, fazendo dele inativo
	meApaga: function (req, res) {
		var id = req.session.userId;

		User.update ({ id: id }, { ativo: false }).exec (function (err, user) {
			if (err) {
				return res.json ({ error: 'quer apagar usuário que não existe? Sé loko?' });
			}
			else {
				console.log ('Usuário apagado: ' + user[0].username);
				// desloga
				req.session.userId = undefined;
				req.session.authenticated = false;
				// e manda pro login
				return res.json ({ path: '/' });
			}
		});
	},
};

