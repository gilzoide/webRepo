/// Objeto LoginManager, o gerenciador de usuários/login
var loginManager = {
	usuarios : {}
}

/// Pega qual usuário está logado. Note que se tiver ninguém, ele retorna 'null'
loginManager.getLogged = function () {
	return sessionStorage.currentUser ? JSON.parse (sessionStorage.currentUser) : null;
};

/// Salva usuário loggado
loginManager.setLogged = function (user) {
	sessionStorage.currentUser = JSON.stringify (user);
};

/// Cria um usuário padrão, pra testar as coisas
loginManager.createDefault = function () {
	this.setLogged (new User ('Gil Barbosa Reis', 'Zumbi', 'senha', 'imagens/cavalo.png'));
	window.location.assign ("userPage.html");
};

/// Tenta loggar. Se rolou, muda de página e talz
loginManager.tryLogin = function (apelido, senha) {
	// só tenta se tiver ambos valores
	if (apelido != undefined && senha != undefined) {
		var usuario = this.usuarios[apelido];
		// usuário inexistente
		if (!usuario) {
			alert ('Usuário "' + apelido + '" não consta no sistema!');
		}
		// senha incorreta
		else if (usuario.senha !== senha) {
			alert ('Senha incorreta');
		}
		else {
			this.setLogged (usuario);
			window.location.assign ("userPage.html");
		}
	}
}

/// Registra um usuário novo =]
loginManager.register = function (apelido, nome, senha) {
	// só registra se tiver todos os valores
	if (apelido != undefined && nome != undefined && senha != undefined) {
		if (this.usuarios[apelido]) {
			alert ('Usuário "' + apelido + '" já está cadastrado no sistema!');
		}
		else {
			this.usuarios[apelido] = new User (nome, apelido, senha, 'imagens/fotoPadrao.png');
		}
	}
}
