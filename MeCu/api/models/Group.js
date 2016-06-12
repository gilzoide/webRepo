/**
 * Group.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	attributes: {
		nome: {
			type: 'string',
			required: true,
		},
		dono: {
			model: 'user',
			required: true,
		},
		ativo: {
			type: 'boolean',
			defaultsTo: true,
		},
		mlkda: {
			collection: 'user',
			via: 'segue_grupo',
			dominant: true,
		},
	}
};
