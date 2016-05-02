/**
 * TodoController
 *
 * @description :: Server-side logic for managing Todoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add : function (req, res) {
		var o_que = req.param ('what');
		Todo.create ({what : o_que}).exec (function (err, created) {
			if (err) {
				return res.json ({error: 'Tarefa não criada. Você escreveu alguma coisa?'});
			}
			else {
				created.save ();
				return res.json ({success: 'Tarefa criada com sucesso!'});
			}
		});
	},

	get : function (req, res) {
		Todo.find ().exec (function (err, results) {
			if (err) {
				return res.json ({error: 'GET dos todo não rolou =/'});
			}
			else {
				return res.json (results);
			}
		});
	},

	remove : function (req, res) {
		var id = req.param ('id');
		Todo.destroy ({id: id}).exec (function (err) {
			return res.json ({success: 'apagou com sucesso!'});
		});
	},
};

