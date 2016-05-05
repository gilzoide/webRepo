(function (angular) {
	var app = angular.module ('todoListApp', ['ngRoute']);

	// Configuração de rotas do Angular
	app.config (function ($routeProvider, $locationProvider) {
		// no '/' (home) roda o index
		$routeProvider.when ('/', {
			templateUrl: '/templates/index.html',
		});
	});

	// Serviço que tem infos sobre a lista em si
	app.factory ('List', function ($rootScope, $http) {
		var list = [];
		return {
			getList: function () {
				return list;
			},
			refresh: function () {
				return $http.get ('/todo').then (function yes (res) {
					//console.log (res.data);
					list = res.data;
					$rootScope.$emit ('refreshed', list);
				});
			},
		};
	});

	// Controlador do "adicionar tarefa"
	app.controller ('TaskController', function ($scope, List, $http) {
		$scope.novaTarefa = "";

		$scope.addTarefa = function () {
			$http.post ('/todo', {what: $scope.novaTarefa}).then (function yes (res) {
				if (res.data.error) {
					$scope.error = res.data.error;
					$scope.success = false;
				}
				else {
					$scope.success = res.data.success;
					$scope.error = false;
					List.refresh ();
				}
			}, function err (res) {
				$scope.error = 'Não consegui dar POST =/';
				$scope.success = false;
			});
		};
	});

	// Controlador da visão de elementos
	app.controller ('ListController', function ($scope, List, $rootScope, $http) {
		$rootScope.$on ('refreshed', function (ev, list) {
			$scope.list = list;
		});
		List.refresh ();

		$scope.remove = function (id) {
			$http.post ('/todo/remove', {id: id}).then (function yes (res) {
				List.refresh ();
			});
		};
	});
}) (window.angular);

