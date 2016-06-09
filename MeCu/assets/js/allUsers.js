app.controller ('AllUsersController', function ($scope, $http, $location) {
	$http.get ('/allUsers').then (function (res) {
		if (res.data.error) {
			$scope.error = res.data.error;
		}
		else {
			$scope.error = false;
			$scope.allUsers = res.data;
		}
	}, deuBosta ('AllUsers'));

	$scope.goToUser = function (pessoa) {
		$location.path (pessoa.id !== $scope.user.id ? '/user/' + pessoa.id : '/home');
	};
});
