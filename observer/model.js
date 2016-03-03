// model observa a view
model.subscribe (view);

// valor atual da contagem
model.value = 0;

// Método de atualização: incrementa contador
model.incrementa = function () {
	this.value += 1;
	this.notifyAll (this.value);
}

// Método de reset do contador, nem é chamado aqui, mas seria útil
model.reset = function () {
	this.value = 0;
	this.notifyAll (this.value);
}
