/**
 * DataController
 *
 * @description :: Server-side logic for managing data
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/// Controlador pra importação/exportação de dados
module.exports = {
	downloadBD: function (req, res) {
		var tudao = {};

		User.find ().exec (function (err, users) {
			tudao.users = users;
			res.set ('Content-Type', 'application/json');
			res.set ('Content-Disposition', 'attachment');
			return res.send (tudao);
		});
	},
};

