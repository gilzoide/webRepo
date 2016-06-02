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

		User.update ({ id: id, ativo: true }, params).exec (function (err, user) {
			if (err) {
				return res.json ({ error: err });
			}
			else {
				user[0].save ();
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
	// Atualiza senha, que é especial
	atualizaSenha: function (req, res) {
		var senhaAntiga = req.param ('senhaAntiga');
		var senha = req.param ('senha');
		var id = req.session.userId;

		User.update ({ id: id, senha: senhaAntiga, ativo: true }, { senha: senha }).exec (function (err, user) {
			if (err) {
				return res.json ({ error: err });
			}
			else if (user.length == 0) {
				return res.json ({ error: 'Senha Antiga está incorreta!' });
			}
			else {
				user[0].save ();
				return res.json ({ success: 'Senha atualizada' });
			}
		});
	},

	// "Apaga" usuário loggado, fazendo dele inativo
	meApaga: function (req, res) {
		var id = req.session.userId;

		User.update ({ id: id }, { ativo: false }).exec (function (err, user) {
			if (err) {
				return res.json ({ error: 'quer apagar usuário que não existe? Sé loko?' });
			}
			else {
				console.log ('Usuário apagado: ' + user[0].apelido);
				// desloga
				req.session.userId = undefined;
				req.session.authenticated = false;
				// e manda pro login
				return res.json ({ path: '/' });
			}
		});
	},
};

