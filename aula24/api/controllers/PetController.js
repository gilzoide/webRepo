/**
 * PetController
 *
 * @description :: Server-side logic for managing pets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create_pets: function (req, res) {
		var pets = [
			//{ name: 'Cat', color: 'White', owner: 1 },
			//{ name: 'Cat', color: 'Brown', owner: 2 },
			//{ name: 'Dog', color: 'Black', owner: 1 },
			{ name: 'Dog', color: 'Black', owner: 20 },
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

	find_pets: function (req, res) {
		Pet.find ({ name: 'Cat' }).populate ('owner').exec (function (err, petsFound) {
			if (err) {
				console.log (err);
			}
			else {
				console.log ('Pets encontrados');
			}

			return res.json (petsFound);
		});
	},
};

