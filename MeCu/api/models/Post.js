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
		},
		conteudo: {
			type: 'string',
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

		// Se post for um repost, esse campo existe e referencia outro post (o original)
		// Se for repost, só o 'user', 'curtiu' e 'odiou' conta, visto que o resto virá do post original
		repost: {
			model: 'post',
		},
	}
};

