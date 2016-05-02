/**
 * LoginController
 *
 * @description :: Server-side logic for managing Logincontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// view principal, que usamos na hora da treta
	view : 'login/index',
	/// Index page do login, partiu view
	index : function (req, res) {
		return res.view ();
	},
	/// Logar
	login: function (req, res) {
		return res.redirect ('/home');
	},
	/// Registrar
	register: function (req, res) {
		var username = req.param ('username');
		if (!username) {
			return res.json ({ error : 'Apelido é necessário para registrar' });
		}
		var password = req.param ('password');
		if (!password) {
			return res.json ({ error : 'Senha é necessária para registrar' });
		}
		var userJSON = {username: username, password: password};
		User.create (userJSON)
				.exec (function (err, created) {
					if (err) {
						return res.json ({error : 'Usuário "' + username + '" já existe!'});
					}
					else {
						created.save ();
						console.log ("Usuário criado: " + created.username);
						return res.json ({success : 'Usuário criado com sucesso!'});
					}
				});
	},
	/// Logar com usuário padrão (bom pra testar
	loginDefault: function (req, res) {
		console.log ('Register: eu =]');
	}
};

