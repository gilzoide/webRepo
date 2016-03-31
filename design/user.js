/**
 * Função que cria um usuário
 *
 * @param nome Nome do usuário
 * @param apelido Apelido do usuário
 * @param foto Caminho do arquivo da foto
 */
function User (nome, apelido, foto) {
	this.nome = nome;
	this.apelido = apelido;
	this.foto = foto;
	// usuário tem seus posts
	this.posts = [];
	// Adiciona um post
	this.addPost = function (post) {
		this.posts.push (post);
	}
	// GETTER pros posts
	this.getPosts = function () {
		return this.posts;
	}
}
