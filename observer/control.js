// cria a view, como um observer do model
control.addObserved (model);

// Função notify: pede pro model atualizar valor
control.notify = function () {
	this.notifyAll ();
}

