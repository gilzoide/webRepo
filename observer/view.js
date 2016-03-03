var contador = document.getElementById ('count');
var botao = document.getElementById ('maisUm');

// view observa o controller
view.subscribe (controller);

// Função notify: atualiza o mostrador da contagem
view.notify = function (valor) {
	contador.innerHTML = valor;
}

// clicou, avisa controller
botao.onclick = function () {
	view.notifyAll ();
}
