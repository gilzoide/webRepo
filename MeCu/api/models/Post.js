/**
 * Post.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	attributes: {
		titulo: {
			type: 'string',
			required: true,
		},
		conteudo: {
			type: 'string',
			required: true,
		},
		user: {
			model: 'user',
			required: true,
		},
		
		// like/deslike
		curtiu: {
			collection: 'user',
			via: 'post_que_curti',
			dominant: true,
		},
		odiou: {
			collection: 'user',
			via: 'post_que_odiei',
			dominant: true,
		},
	}
};

