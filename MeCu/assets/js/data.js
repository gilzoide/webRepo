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
					$scope.success = 'Deu';
					$scope.error = false;
				}
				catch (e) {
					console.error (e.message);
					$scope.error = e.message;
					$scope.success = false;
				}
			}
			reader.readAsText (arquivo);
		}
	};
});
