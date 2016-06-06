// Controller do navbar
app.controller ('NavbarController', function ($scope, $http, $location) {
	$scope.logout = function () {
		$http.post ('/logout').then (function yes (res) {
			$location.path (res.data.path);
		}, deuBosta ('Logout'));
	};
});

