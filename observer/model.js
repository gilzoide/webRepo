// cria o model, como um observer do control
model.addObserved (view);

// valor atual da contagem
model.value = 0;

// Função notify: value++, atualiza view
model.notify = function () {
	this.value += 1;
	this.notifyAll (this.value);
}

