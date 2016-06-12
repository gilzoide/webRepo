app.controller ('GroupController', function ($scope, $http, $routeParams, $location) {
	$http.post ('/group', { id: $routeParams.groupId }).then (function (res) {
		if (res.data.error) {
			$scope.error = res.data.error;
		}
		else {
			$scope.grupo = res.data;
			console.log ($scope.grupo);
		}
	}, deuBosta ('GetGroup'));

	$scope.addPessoa = function (nomePessoa) {
		$http.post ('/group/addAlguem', { grupo: $scope.grupo.id, pessoa: nomePessoa }).then (function (res) {
			if (res.data.error) {
				$scope.error = res.data.error;
				$scope.success = false;
			}
			else {
				$scope.success = res.data.success;
				$scope.error = false;
				$scope.grupo.mlkda.push (res.data.pessoa);
			}
		}, deuBosta ('AddPessoaGrupo'));
	};

	$scope.apagaGrupo = function () {
		if (confirm ('Quer mesmo apagar grupo?')) {
			$http.post ('/group/apaga', { id: $scope.grupo.id }).then (function (res) {
				if (res.data.error) {
					$scope.error = res.data.error;
					$scope.success = false;
				}
				else {
					$location.path ('allGroups');
				}
			}, deuBosta ('ApagaGrupo'));
		}
	};

	$scope.sairDoGrupo = function () {
		if (confirm ('Quer mesmo sair do grupo?')) {
			$http.post ('/group/sair', { id: $scope.grupo.id }).then (function (res) {
				if (res.data.error) {
					$scope.error = res.data.error;
					$scope.success = false;
				}
				else {
					$scope.success = res.data.success;
					$scope.error = false;
					var mlkda = $scope.grupo.mlkda;
					mlkda.splice (mlkda.findIndex (function (u) { return u.id == $scope.user.id }), 1);
				}
			}, deuBosta ('SairDoGrupo'));
		}
	}
});
