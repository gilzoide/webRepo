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
		descricao: {
			type: 'string',
		},
		foto: {
			type: 'string',
			defaultsTo: 'images/fotoPadrao.png'
		},
		// atributo que marca se usuário "existe"
		ativo: {
			type: 'boolean',
			defaultsTo: true,
		},
		// posts que usuário postou =P
		posts: {
			collection: 'post',
			via: 'user',
		},
	}
};

