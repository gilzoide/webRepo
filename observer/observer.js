// API do Observer, usado pra implementar um MVC maneiro //

/**
 * Classe Observer
 *
 * Um objeto que tem inscritos, que hora que precisa os notifica
 */
function Observer () {
	/// Lista de objetos observados, que são notificados hora que precisar
	this.observed = [];

	/// Adiciona um objeto a ser notificado na lista
	this.addObserved = function (obj) {
		this.observed.push (obj);
	};

	/// Retira um objeto da lista de notificados
	this.removeObserved = function (obj) {
		for (var i = this.observed.length; i--; ) {
			if (this.observed[i] === obj) {
				this.observed.splice (i, 1);
				break;
			}
		}
	};

	/// Função que notifica 
	this.notifyAll = function (arg) {
		for (i in this.observed) {
			this.observed[i].notify (arg);
		}
	};
}
