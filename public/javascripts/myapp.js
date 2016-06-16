var app = angular.module("mainApp", ["ngRoute", "ngResource"]);

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "pages/home.html",
		controller: "homeCtrl"
	}).otherwise({
		redirectTo: "/"
	});
}]);

app.controller("homeCtrl", ["$scope", "$http", function($scope, $http) {
	$scope.data = {
		setOfStrings: [
			{value: "sungard"},
			{value: "sungarder"},
			{value: "garden"}
		]
	};
	$scope.result = "";
	$scope.canShow = false;
	$scope.findLCS = function() {
		console.log($scope.data);
		$http.post("rest/lcs", $scope.data)
		.then(function(result) {
			console.log(JSON.stringify(result.data));
			$scope.result = JSON.stringify(result.data);
			$scope.canShow = true;
		});
	}
	$scope.add = function() {
		$scope.data.setOfStrings.push({});
	};
}]);