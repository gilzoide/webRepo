/**
 * Função que cria um usuário
 *
 * @param nome Nome do usuário
 * @param apelido Apelido do usuário
 * @param foto Caminho do arquivo da foto
 */
function User (nome, apelido, senha, foto) {
	this.nome = nome;
	this.apelido = apelido;
	this.senha = senha;
	this.foto = foto;
	// usuário tem seus posts
	this.posts = [];
	// Adiciona um post
	this.addPost = function (post) {
		this.posts.push (post);
	};
	// GETTER pros posts
	this.getPosts = function () {
		return this.posts;
	};
}


// Cria instância de User a partir de um objeto qualquer, pra rolar os JSON
User.fromObj = function (obj) {
	return new User (obj.nome, obj.apelido, obj.senha, obj.foto);
}
