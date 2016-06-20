/**
 * DataController
 *
 * @description :: Server-side logic for managing data
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/// Função auxiliar que transforma de um Date completo pro formato 'dd-mm-yyyy'
function niver2birthday (niver) {
	var valores = [niver.getUTCDate (), niver.getUTCMonth () + 1, niver.getUTCFullYear ()];
	return valores.join ('-');
}

/// Controlador pra importação/exportação de dados
module.exports = {
	downloadBD: function (req, res) {
		var tudao = {};
		var timestamp = new Date ();

		User.find ().populate ('segue_pessoa').exec (function (err, users) {
			// usuários, já marcando quem segue quem
			var follow = [];
			tudao.users = users.map (function (u) {
				// adiciona os follows
				u.segue_pessoa.forEach (function (sigo) {
					follow.push ({
						id: follow.length + 1,
						follower: u.id,
						follows: sigo.id,
						timestamp: timestamp,
					});
				});
				// e retorna o usuário de fato
				return {
					id: u.id,
					nome: u.nome,
					login: u.apelido,
					password: u.senha,
					birthday: niver2birthday (u.niver),
					bio: u.descricao,
				};
			});
			// seguidas
			tudao.follow = follow;
			// posts
			Post.find ().populate (['user', 'odiou', 'curtiu', 'repost']).exec (function (err, posts) {
				// variáveis pra retornar os trem
				var tweets = [];
				var share = [];
				var reactions = [];

				// posts, já marcando quem curte e quem não
				posts.forEach (function (p) {
					// é repost → 'share'
					if (p.repost) {
						share.push ({
							id: p.id,
							tweet: p.repost.id,
							user: p.user.id,
							timestamp: timestamp,
						});
					}
					// é post normal → 'tweet'
					else {
						tweets.push ({
							id: p.id,
							user: p.user.id,
							title: p.titulo,
							text: p.conteudo,
							timestamp: timestamp,
						});
					}

					// reactions: curtidas
					p.curtiu.forEach (function (u) {
						reactions.push ({
							tweet: p.id,
							user: u.id,
							reaction: 1,
							timestamp: timestamp,
						});
					});
					// reactions: odiadas
					p.odiou.forEach (function (u) {
						reactions.push ({
							tweet: p.id,
							user: u.id,
							reaction: 0,
							timestamp: timestamp,
						});
					});
				});

				tudao.tweets = tweets;
				tudao.reactions = reactions;
				tudao.share = share;

				// grupos
				Group.find ().populate (['mlkda', 'dono']).exec (function (err, grupos) {
					var group = [];
					grupos.forEach (function (g) {
						// vê se já tem um agrupamento dos grupos do dono de 'g'
						var grupoRetorno = group.find (function (G) {
							return G.id == g.dono.id;
						});
						// se não tem, cria
						if (!grupoRetorno) {
							grupoRetorno = {
								id: g.dono.id,
								list: [],
							};
							group.push (grupoRetorno);
						}

						// adiciona o grupo efetivamente
						grupoRetorno.list.push ({
							nome: g.nome,
							users: g.mlkda.map (function (u) { return u.id; }),
							relativeId: g.id,
						});
					});

					tudao.group = group;

					res.set ('Content-Type', 'application/json');
					res.set ('Content-Disposition', 'attachment');
					return res.send (tudao);
				});
			});
		});
	},
};

