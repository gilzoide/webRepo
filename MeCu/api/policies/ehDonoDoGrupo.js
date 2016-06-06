/**
 * Oi, uma policy pra saber se usuário é dono dum grupo, pra zoar com ele à vonts
 */
module.exports = function ehDonoDoGrupo (req, res, next) {
	var id = req.param ('id');
	var user = req.session.userId;

	Group.findOneById (id).exec (function (err, grupo) {
		if (err) {
			return res.json ({ error: err });
		}
		else if (!grupo) {
			return res.json ({ error: 'Grupo inexistente' });
		}
		else if (grupo.dono !== user) {
			return res.json ({ error: 'Usuário não é dono do grupo' });
		}
		else {
			next ();
		}
	});
};
