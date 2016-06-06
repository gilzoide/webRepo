/**
 * AllUsersController
 *
 * @description :: Server-side logic for managing Allusers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	pegaCadastrados: function (req, res) {
		User.find ({ ativo: true }).exec (function (err, usersCadastrados) {
			if (err) {
				return res.json ({ error: err });
			}
			else {
				return res.json (usersCadastrados);
			}
		});
	},
};

