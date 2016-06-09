/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {
	// Home, o login
	'/': {
		view: 'index'
	},
	'/500': {
		view: '500'
	},
	// login/register
	'post /login': 'LoginController.login',
	'post /register': 'LoginController.register',
	// morte =/
	'post /meApaga': 'ConfigController.meApaga',
	// pega infos do usuário loggado
	'get /userinfo': 'HomeController.getLogged',
	// logout!
	'post /logout': 'HomeController.logout',

	// post
	'post /post': 'HomeController.post',
	'post /post/update': 'HomeController.atualizaPost',
	'post /post/remove': 'HomeController.apagaPost',

	// atualização de usuário
	'post /user/descricao': 'ConfigController.atualizaDescricao',
	'post /user/nome': 'ConfigController.atualizaNome',
	'post /user/foto': 'ConfigController.atualizaFoto',
	'post /user/senha': 'ConfigController.atualizaSenha',
	'post /user/niver': 'ConfigController.atualizaNiver',

	// pega usuários cadastrados
	'get /allUsers': 'UserController.pegaCadastrados',
	'post /user': 'UserController.pegaUsuario',

	// grupos
	'get /allGroups': 'GroupController.pegaCadastrados',
	'post /group': 'GroupController.pegaGrupo',
	'post /newGroup': 'GroupController.criaGrupo',
	'post /group/addAlguem': 'GroupController.addAlguem',
};
