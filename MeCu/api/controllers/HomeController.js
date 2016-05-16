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
		User.findOneById (id, function (err, user) {
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
		res.json ({ path: '/' });
	},
};

