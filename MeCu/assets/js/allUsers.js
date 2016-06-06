app.controller ('AllUsersController', function ($scope, $http) {
	$http.get ('/allUsers').then (function (res) {
		if (res.data.error) {
			$scope.error = res.data.error;
		}
		else {
			$scope.error = false;
			$scope.allUsers = res.data;
		}
	}, deuBosta ('AllUsers'));
});
