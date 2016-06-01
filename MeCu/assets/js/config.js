app.controller ('UserConfigController', function ($scope, UserInfo, $http, $location) {
	$scope.$on ('gotUser', function () {
		// voltar pra casa
		$scope.paCasa = function () {
			$location.path ('/home');
		};

		// apagar usuário =S
		$scope.apagaTe = function () {
			if (confirm ('Tem certeza que quer se apagar?')) {
				$http.post ('/meApaga').then (function (res) {
					$location.path (res.data.path);
				}, deuBosta ('MeApaga'));
			}
		};
		
	});
});
