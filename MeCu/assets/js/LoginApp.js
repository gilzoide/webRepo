(function (angular) {
	var app = angular.module ('LoginApp', []);
	// Login Controller
	app.controller ('LoginController', function ($scope, $http) {
		$scope.user = {};
		
		$scope.login = function () {
			$http.post ('/login', $scope.user, {wantsJSON: false}).then (function yes (res) {
						if (res.data.error) {
							$scope.error = res.data.error;
							$scope.success = false;
						}
						else {
							document.write (res.data);
						}
					},
					function err (res) {
						$scope.error = 'Não consegui dar POST =S';
					});
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
					}, function err (res) {
						$scope.error = 'Não consegui dar POST =S';
					});
		}
	});
}) (window.angular);
