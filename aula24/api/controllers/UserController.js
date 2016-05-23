/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create_users: function (req, res) {
		var users = [
			{ name: 'John', age: 20 },
			{ name: 'Mary', age: 22 },
			{ name: 'Gary', age: 30 },
			{ name: 'Rudy', age: 28 },
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

	find_users: function (req, res) {
		User.find ({ name: 'John' }).populate ('pet').exec (function (err, usersFound) {
			if (err) {
				console.log (err);
			}
			else {
				console.log ('Usuários encontrados');
			}

			return res.json (usersFound);
		});
	},
};

