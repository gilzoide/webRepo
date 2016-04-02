(function (angular) {
	var app = angular.module ('meCuLogin', []);
	app.controller ('Login', function ($scope) {
		$scope.loginManager = loginManager;
	});
}) (window.angular);
