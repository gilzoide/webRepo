(function (angular) {
	var app = angular.module ('todoListApp', []);
	var list = [];

	// Serviço que tem infos sobre a lista em si
	app.factory ('List', function () {
		return list;
	});

	// Controlador do "adicionar tarefa"
	app.controller ('TaskController', function ($scope, List) {
		$scope.novaTarefa = "";

		$scope.addTarefa = function () {
			List.push ($scope.novaTarefa);
		}
	});

	// Controlador da visão de elementos
	app.controller ('ListController', function ($scope, List) {
		$scope.list = List;

		$scope.remove = function (index) {
			console.log (index);
			$scope.list.splice (index, 1);
		}
	});
}) (window.angular);

