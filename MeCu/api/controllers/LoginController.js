/**
 * LoginController
 *
 * @description :: Server-side logic for managing Logincontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/// Logar
	login: function (req, res) {
		var username = req.param ('username');
		var password = req.param ('password');
		User.findOne ({ username: username, ativo: true }, function (err, user) {
			if (err) {
				return res.json ({ error: 'Falha ao logar =/' });
			}
			else if (!user) {
				return res.json ({ error: 'Usuário não encontrado =/' });
			}
			else if (user.password !== password) {
				return res.json ({ error: 'Senha incorreta =/' });
			}
			// login correto!
			else {
				// cadastra usuário loggado
				req.session.userId = user.id;
				req.session.authenticated = true;
				// e manda pra home
				return res.json ({ path: '/home' });
			}
		});
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

		// procura usuário primeiro, reclama se existir
		User.findOne ({ username: username, ativo: true }, function (err, user) {
			// achou um válido, reclama
			if (user) {
				return res.json ({ error : 'Usuário "' + username + '" já existe!' });
			}
			// se não encontrou usuário (ou achou um inativo), cria
			else {
				var userJSON = { username: username, nome: username, password: password };
				User.create (userJSON).exec (function (err, created) {
					created.save ();
					console.log ("Usuário criado: " + created.username);
					return res.json ({ success : 'Usuário criado com sucesso!' });
				});
			}
		});
	},
};

