/**
 * ConfigController
 *
 * @description :: Server-side logic for managing Configs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

// Função auxiliar que cria funções de atualização a partir do nome do campo =]
function criaAtualizacao (nomeCampo) {
	return function (req, res) {
		var novoParam = req.param (nomeCampo);
		var id = req.session.userId;

		var params = {};
		params[nomeCampo] = novoParam;

		User.update ({ id: id, ativo: true }, params).exec (function (err, users) {
			if (err) {
				return res.json ({ error: err });
			}
			else {
				var user = users[0];
				console.log ('"' + user.apelido + '" atualizou ' + nomeCampo);
				console.log (user);
				user.save ();
				return res.json ({ success: nomeCampo + ' atualizado(a)' });
			}
		});
	};
}

module.exports = {
	// Atualiza campos de usuário necessários
	atualizaDescricao: criaAtualizacao ('descricao'),
	atualizaNome: criaAtualizacao ('nome'),
	atualizaFoto: criaAtualizacao ('foto'),
	atualizaNiver: criaAtualizacao ('niver'),

	// Atualiza senha, que é especial
	atualizaSenha: function (req, res) {
		var senhaAntiga = req.param ('senhaAntiga');
		var senha = req.param ('senha');
		var id = req.session.userId;

		User.update ({ id: id, senha: senhaAntiga, ativo: true }, { senha: senha }).exec (function (err, users) {
			if (err) {
				return res.json ({ error: err });
			}
			else if (user.length == 0) {
				return res.json ({ error: 'Senha Antiga está incorreta!' });
			}
			else {
				users[0].save ();
				return res.json ({ success: 'Senha atualizada' });
			}
		});
	},

	// "Apaga" usuário loggado, fazendo dele inativo
	meApaga: function (req, res) {
		var id = req.session.userId;

		User.update ({ id: id, ativo: true }, { ativo: false }).populate ('grupos').exec (function (err, users) {
			if (err) {
				return res.json ({ error: 'quer apagar usuário que não existe? Sé loko?' });
			}
			else {
				var user = users[0];
				console.log ('Usuário apagado: ' + user.apelido);
				Group.update ({ id: user.groups }, { ativo: false}).exec (function (err, grupos) {
					if (err) {
						console.error (err);
					}
					else {
						console.log ('Grupos apagados');
					}
				});
				// desloga
				req.session.userId = undefined;
				req.session.authenticated = false;
				// e manda pro login
				return res.json ({ path: '/' });
			}
		});
	},
};

