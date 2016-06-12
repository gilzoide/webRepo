/**
 * GroupController
 *
 * @description :: Server-side logic for managing groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// GET de um grupo (por POST, pq precisa de param)
	pegaGrupo: function (req, res) {
		var id = req.param ('id');
		Group.findOne ({ id: id, ativo: true }).populate ('mlkda').exec (function (err, grupo) {
			if (err) {
				return res.json ({ error: err });
			}
			else if (!grupo) {
				return res.json ({ error: 'Grupo ' + id + ' não encontrado =S' });
			}
			else {
				return res.json (grupo);
			}
		});
	},

	// GET de todos grupos cadastrados
	pegaCadastrados: function (req, res) {
		Group.find ({ ativo: true }).populate ('mlkda').exec (function (err, gruposCadastrados) {
			if (err) {
				return res.json ({ error: err });
			}
			else {
				return res.json (gruposCadastrados);
			}
		});
	},
	
	// Cria um grupo associado a um usuário (dono)
	criaGrupo: function (req, res) {
		var nome = req.param ('nome');

		if (!nome) {
			return res.json ({ error: 'Grupo precisa de um nome' });
		}

		var dono = req.session.userId;
		Group.findOne ({ nome: nome, ativo: true }).exec (function (err, grupo) {
			if (grupo) {
				return res.json ({ error: 'Grupo "' + nome + '" já existe!' });
			}
			else {
				Group.create ({ nome: nome, dono: dono }).exec (function (err, novoGrupo) {
					if (err) {
						return res.json ({ error: err });
					}

					// adiciona dono do grupo na mlkda
					novoGrupo.mlkda.add (dono);
					novoGrupo.save ();
					console.log ('Grupo criado: ' + novoGrupo.nome);
					return res.json ({ success: 'Grupo criado com sucesso', newGroup: novoGrupo });
				});
			}
		});
	},

	// Adiciona alguém no grupo (pra seguí-lo)
	addAlguem: function (req, res) {
		var grupo = req.param ('grupo');
		var nomePessoa = req.param ('pessoa');

		User.findOne ({ nome: nomePessoa, ativo: true }).exec (function (err, user) {
			if (err) {
				return res.json ({ error: err });
			}
			else if (!user) {
				return res.json ({ error: 'Usuário inexistente' });
			}
			else {
				Group.findOne ({ id: grupo, ativo: true }).exec (function (err, grupo) {
					if (err) {
						return res.json ({ error: err });
					}
					else if (!user) {
						return res.json ({ error: '¿Grupo inexistente?' });
					}
					else {
						grupo.mlkda.add (user.id);
						grupo.save (function (err, s) {
							if (err) {
								return res.json ({ error: 'Usuário já participa do grupo' });
							}
							return res.json ({ success: 'Usuário adicionado', pessoa: user });
						});
					}
				});
			}
		});
	},

	// Apaga grupo =/
	apagaGrupo: function (req, res) {
		var id = req.param ('id');
		Group.findOne ({ id: id, ativo: true }).exec (function (err, grupo) {
			if (err) {
				return res.json ({ error: err });
			}
			else if (!grupo) {
				return res.json ({ error: 'Grupo não encontrado!' });
			}
			else if (grupo.dono != req.session.userId) {
				return res.json ({ error: 'Você não é dono do grupo, não pode apagá-lo' });
			}
			else {
				grupo.ativo = false;
				grupo.save ();
				return res.json ();
			}
		});
	},

	// Sair do grupo
	sairDoGrupo: function (req, res) {
		var id = req.param ('id');
		var user = req.session.userId;

		Group.findOne ({ id: id, ativo: true }).exec (function (err, grupo) {
			if (err) {
				return res.json ({ error: err });
			}
			else if (!grupo) {
				return res.json ({ error: 'Grupo não encontrado!' });
			}
			else if (grupo.dono == user) {
				return res.json ({ error: 'Você é dono do grupo, não pode abandoná-lo assim, só se apagar' });
			}
			else {
				grupo.mlkda.remove (user);
				grupo.save (function (err) {
					if (err) {
						return res.json ({ error: err });
					}
					return res.json ({ success: 'Abandonou grupo' });
				});
			}
		});
	},
};

