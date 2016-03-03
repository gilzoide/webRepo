/* Trabalho 2 - SCC0219 - Web
 * Gil Barbosa Reis - 8532248
 * Oscar Lima Neto - 8065863
*/
var id = document.getElementById ('id')
var legenda = document.getElementById ('legenda')
var linhas = document.getElementById ('linhas')
var colunas = document.getElementById ('colunas')
var botao = document.getElementById ('botao')

var tabela = null;

botao.onclick = function () {
	// pega os valores de input e os valida
	var idUser = id.value;
	if (idUser == '') {
		alert ("ID inválido (campo obrigatório)");
		return;
	}
	var legendaUser = legenda.value;
	if (legendaUser == '') {
		alert ("Legenda inválida (campo obrigatório)");
		return;
	}
	var numLinhas = parseInt (linhas.value);
	if (!numLinhas || numLinhas <= 0) {
		alert ("Quantidade de linhas inválido: deve ser um número maior que 0 (zero)");
		return;
	}
	var numColunas = parseInt (colunas.value);
	if (!numColunas || numColunas <= 0) {
		alert ("Quantidade de linhas inválido: deve ser um número maior que 0 (zero)");
		return;
	}

	// se já tiver tabela, apaga-a
	if (tabela != null) {
		document.body.removeChild (tabela);
	}
	// tudo válido, bora criar a tabela
	tabela = document.createElement ('table');
	tabela.setAttribute ('id', idUser);
	tabela.setAttribute ('border', '1');
	tabela.setAttribute ('cellpadding', '30');

	// cria a legenda
	var caption = document.createElement ('caption');
	var textoCaption = document.createTextNode (legendaUser);
	caption.appendChild (textoCaption);
	tabela.appendChild (caption);

	// cria as linhas e colunas, numLinhas x numColunas, e as adiciona na tabela
	for (var i = 0; i < numLinhas; i++) {
		var tr = document.createElement ('tr');
		for (var j = 0; j < numColunas; j++) {
			var td = document.createElement ('td');
			tr.appendChild (td);
		}
		tabela.appendChild (tr);
	}

	document.body.appendChild (tabela);
}
