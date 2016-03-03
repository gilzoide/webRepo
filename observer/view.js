var contador = document.getElementById ('count');
var botao = document.getElementById ('maisUm');

// cria a view, como um observer do model
view.addObserved (control);

// Função notify: atualiza o mostrador da contagem
view.notify = function (valor) {
	contador.innerHTML = valor;
}

// clicou, avisa controller
botao.onclick = function () {
	view.notifyAll ();
}
