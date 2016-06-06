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
});
