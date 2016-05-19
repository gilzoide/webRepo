/**
 * PetController
 *
 * @description :: Server-side logic for managing pets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create_pets: function (req, res) {
		var pets = [
			{ name: 'Floquinho', color: 'verde', owner: 1 },
			{ name: 'Lara', color: 'branca', owner: 2 },
			{ name: 'Sininho', color: 'azul', owner: 3 },
			{ name: 'Bolinha', color: 'vermelho', owner: 4 },
			{ name: 'Bolinha', color: 'vermelho', owner: 900 },
		];

		Pet.create (pets).exec (function (err, newPets) {
			if (err) {
				console.log ("Erro ao criar pets!");
			}
			else {
				console.log ("Pets criados!");
			}

			return res.json (newPets);
		});
	},	
};

