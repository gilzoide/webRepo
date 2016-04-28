/**
 * LoginController
 *
 * @description :: Server-side logic for managing Logincontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/// Index page do login, partiu view
	index : function (req, res) {
		res.view ();
	},
	/// Logar
	login: function (req, res) {
		var username = req.param ('username');
		var password = req.param ('password');
		var userJSON = {username: username, password: password};
		User.create (userJSON)
				.exec (function (err, created) {
					if (err) {
						res.redirect ('/500');
					}
					else {
						console.log ("Usuário criado: " + created.username);
						res.json (userJSON);
					}
				});
	},
	/// Registrar
	register: function (req, res) {
		console.log ('Register: ' + req.param ('username'));
	},
	/// Logar com usuário padrão (bom pra testar
	loginDefault: function (req, res) {
		console.log ('Register: eu =]');
	}
};

