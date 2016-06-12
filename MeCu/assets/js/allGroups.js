app.controller ('AllGroupsController', function ($scope, $http, $location) {
	$http.get ('/allGroups').then (function (res) {
		if (res.data.error) {
			$scope.error = res.data.error;
		}
		else {
			$scope.error = false;
			$scope.allGroups = res.data;
		}
	}, deuBosta ('AllGroups'));

	$scope.criaGrupo = function (nomeGrupo) {
		$http.post ('/newGroup', { nome: nomeGrupo }).then (function (res) {
			if (res.data.error) {
				$scope.error = res.data.error;
				$scope.success = false;
			}
			else {
				$scope.error = false;
				$scope.success = res.data.success;
				$scope.allGroups.push (res.data.newGroup);
			}
		}, deuBosta ('CriaGrupo'));
	};
});
