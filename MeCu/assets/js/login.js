// Login Controller
app.controller ('LoginController', function ($scope, $http, $location) {
	$scope.user = {};
	
	$scope.login = function () {
		// valor padrão, pra ficar fácil testar
		if (! ($scope.user.username || $scope.user.password)) {
			$scope.user = {
				username: 'a',
				password: 'a',
			}
		}
		$http.post ('/login', $scope.user).then (function yes (res) {
			if (res.data.error) {
				$scope.error = res.data.error;
				$scope.success = false;
			}
			else {
				// redireciona pro '/home'
				$location.path (res.data.path);
			}
		}, deuBosta ('Login'));
	}
});

// Register Controller
app.controller ('RegisterController', function ($scope, $http) {
	$scope.user = {};

	$scope.register = function () {
		$http.post ('/register', $scope.user).then (function yes (res) {
			if (res.data.error) {
				$scope.error = res.data.error;
				$scope.success = false;
			}
			else {
				$scope.error = false;
				$scope.success = res.data.success;
			}
		}, deuBosta ('Registrar'));
	}
});
