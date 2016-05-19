/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create_users: function (req, res) {
		var users = [
			{ name: 'Joao', age: 21 },
			{ name: 'Maria', age: 23 },
			{ name: 'Zeh', age: 41 },
			{ name: 'Robson', age: 5 },
		];

		User.create (users).exec (function (err, newUsers) {
			if (err) {
				console.log ("Erro ao criar usuários!");
			}
			else {
				console.log ("Usuários criados!");
			}

			return res.json (newUsers);
		});
	},	
};

