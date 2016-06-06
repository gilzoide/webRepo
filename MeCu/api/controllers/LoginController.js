/**
 * LoginController
 *
 * @description :: Server-side logic for managing Logincontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/// Logar
	login: function (req, res) {
		var apelido = req.param ('apelido');
		var senha = req.param ('senha');
		User.findOne ({ apelido: apelido, ativo: true }, function (err, user) {
			if (err) {
				return res.json ({ error: 'Falha ao logar =/' });
			}
			else if (!user) {
				return res.json ({ error: 'Usuário não encontrado =/' });
			}
			else if (user.senha !== senha) {
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
		var apelido = req.param ('apelido');
		if (!apelido) {
			return res.json ({ error : 'Apelido é necessário para registrar' });
		}

		var senha = req.param ('senha');
		if (!senha) {
			return res.json ({ error : 'Senha é necessária para registrar' });
		}

		// procura usuário primeiro, reclama se existir
		User.findOne ({ apelido: apelido, ativo: true }, function (err, user) {
			// achou um válido, reclama
			if (user) {
				return res.json ({ error : 'Usuário "' + apelido + '" já existe!' });
			}
			// se não encontrou usuário (ou achou um inativo), cria
			else {
				var userJSON = { apelido: apelido, nome: apelido, senha: senha };
				User.create (userJSON).exec (function (err, created) {
					if (err) {
						return res.json ({ error: err });
					}
					else {
						created.save ();
						console.log ("Usuário criado: " + created.apelido);
						return res.json ({ success : 'Usuário criado com sucesso!' });
					}
				});
			}
		});
	},
};

