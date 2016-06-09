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

	$scope.goToUser = function (pessoa) {
		$location.path (pessoa.id !== $scope.user.id ? '/user/' + pessoa.id : '/home');
	};

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
});
