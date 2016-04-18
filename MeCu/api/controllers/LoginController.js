/**
 * LoginController
 *
 * @description :: Server-side logic for managing Logincontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
	 * `LoginController.tryLogin()`
	 */
	login: function (req, res) {
		console.log ('Login: ' + req.param ('username'));
	},
	register: function (req, res) {
		console.log ('Register: ' + req.param ('username'));
	},
	loginDefault: function (req, res) {
		console.log ('Register: eu =]');
	}
};

