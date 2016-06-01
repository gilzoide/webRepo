/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	attributes: {
		username: {
			type: 'string',
			required: true,
		},
		nome: {
			type: 'string',
			required: true,
		},
		password: {
			type: 'string',
			required: true
		},
		foto: {
			type: 'string',
			defaultsTo: 'fotoPadrao.png'
		},
		// atributo que marca se usuário "existe"
		ativo: {
			type: 'boolean',
			defaultsTo: true,
		},
		posts: {
			collection: 'post',
			via: 'user',
		},
	}
};

