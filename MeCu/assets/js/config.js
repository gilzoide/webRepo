app.controller ('UserConfigController', function ($scope, UserInfo, $http, $location) {
	$scope.error = false;
	$scope.success = false;

	$scope.$on ('gotUser', function () {
		// apagar usuário =S
		$scope.apagaTe = function () {
			if (confirm ('Tem certeza que quer se apagar?')) {
				$http.post ('/meApaga').then (function (res) {
					if (res.data.error) {
						$scope.error = res.data.error;
					}
					else {
						$location.path (res.data.path);
					}
				}, deuBosta ('MeApaga'));
			}
		};

		// Função de atualização, a partir do nome do campo =]
		$scope.atualiza = function (nomeCampo) {
			// objeto com o novo parâmetro
			var params = {};
			params[nomeCampo] = $scope.user[nomeCampo];

			$http.post ('/user/' + nomeCampo, params).then (function (res) {
				if (res.data.error) {
					$scope.error = res.data.error;
					$scope.success = false;
				}
				else {
					$scope.success = res.data.success;
					$scope.error = false;
				}
			}, deuBosta ('Atualiza_' + nomeCampo));
		};

		$scope.atualizaveis = ['nome', 'descricao', 'foto'];

		// função de atualizar data de nascimento, que é especial
		$scope.atualizaNiver = function () {
			if (!$scope.user.niver) {
				$scope.error = 'Data inválida!'
			}
			else {
				$http.post ('/user/niver', { niver: $scope.user.niver }).then (function (res) {
					if (res.data.error) {
						$scope.error = res.data.error;
						$scope.success = false;
					}
					else {
						$scope.success = res.data.success;
						$scope.error = false;
					}
				}, deuBosta ('Atualiza_niver'));
			}
		};
		// função de atualizar a senha, que é especial
		$scope.atualizaSenha = function () {
			if (!$scope.senhaAntiga) {
				$scope.error = 'Senha Antiga é necessária';
			}
			else if (!$scope.novaSenha) {
				$scope.error = 'Nova Senha é necessária';
			}
			else if (!$scope.novaSenha2) {
				$scope.error = 'Confirmação da Nova Senha é necessária';
			}
			else if ($scope.novaSenha == $scope.novaSenha2) {
				$http.post ('/user/senha', { senhaAntiga: $scope.senhaAntiga, senha: $scope.novaSenha }).then (function (res) {
					if (res.data.error) {
						$scope.error = res.data.error;
						$scope.success = false;
					}
					else {
						$scope.success = res.data.success;
						$scope.error = false;
					}
				});
			}
			else {
				$scope.error = 'Nova senha não confirmada =S';
			}
		};
	});
});
