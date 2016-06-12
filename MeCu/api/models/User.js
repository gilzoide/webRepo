/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	attributes: {
		apelido: {
			type: 'string',
			required: true,
		},
		senha: {
			type: 'string',
			required: true
		},
		nome: {
			type: 'string',
			required: true,
		},
		niver: {
			type: 'date',
			defaultsTo: '2000-01-01T00:00:00.000Z',
		},
		descricao: {
			type: 'string',
			defaultsTo: 'Sou eu',
		},
		foto: {
			type: 'string',
			defaultsTo: 'images/fotoPadrao.png'
		},

		// posts que usuário postou =P
		posts: {
			collection: 'post',
			via: 'user',
		},
		// usuários que este segue
		segue_pessoa: {
			collection: 'user',
			via: 'me_segue',
			dominant: true,
		},
		// usuários que seguem esse
		me_segue: {
			collection: 'user',
			via: 'segue_pessoa',
		},
		// grupos que usuário tem (é dono)
		grupos: {
			collection: 'group',
			via: 'dono',
		},
		// grupos que usuário participa
		segue_grupo: {
			collection: 'group',
			via: 'mlkda',
		},
	}
};

