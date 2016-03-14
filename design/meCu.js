postsProntos = [
	'Eae Gilzera, comé que tá rapá?',
	'Ou, muito loko esses Bootstrap e AngularJS né',
	'YO!',
	'Quanto tempo levou pra fazer isso tudo? Muito pouco =]',
	'Mano, o que que tem no bandejão hoje?',
	'Cara, bora comer pizza?',
	'Ae, sucesso esse trem',
	'Você falou "pão de queijo"?'
];

(function (angular) {
	var app = angular.module ('meCu', []);
	app.controller ('meCuController', function ($scope) {
		$scope.allPosts = [];
		// Função que cria um post aleatório e põe lá na view
		$scope.createPost = function () {
			$scope.allPosts.push ({
				name : 'Post ' + $scope.allPosts.length,
				content : postsProntos [Math.floor (Math.random () * postsProntos.length)]
			});
		};
	});
}) (window.angular);
