app.controller ('DataController', function ($scope, $http) {
	$scope.import = function () {
		var arquivo = document.getElementById ('entrada').files[0];
		if (!arquivo) {
			$scope.error = 'É necessário um arquivo de entrada!';
		}
		else {
			var reader = new FileReader ();
			reader.onload = function (e) {
				var conteudo = reader.result;
				try {
					var json = JSON.parse (conteudo);
					$http.post ('/carregaBD', { bd: json }).then (function (res) {
						if (res.data.error) {
							$scope.error = res.data.error;
							$scope.success = false;
						}
						else {
							$scope.success = res.data.success;
							$scope.error = false;
						}
					}, deuBosta ('ImportaBD'));
				}
				catch (e) {
					alert (e.message);
					$scope.error = e.message;
					$scope.success = false;
				}
			}
			reader.readAsText (arquivo);
		}
	};
});
