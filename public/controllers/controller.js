//this code doesn't work for latest Angular version
/*function AppCtrl() {	//function name same as ng-controller in index.html
	console.log("Hello world from controller");
}*/

//this code works for latest Angular version
var myApp = angular.module('myApp',[])
myApp.controller('AppCtrl', ['$scope', '$http',
	function($scope,$http) {	//scope is used for binding model and view
		/*console.log("Hello world from controller");	*/

	var refresh = function() {
		$http.get('/studentlist').success(function(response) {
			console.log("Received data");
			$scope.studentlist = response;	//get data from server.js in response
			$scope.student = "";	//clear i/p boxes after calling refresh function
		});
	};
	
	refresh();

	$scope.add = function() {
		console.log($scope.student);
		$http.post('/studentlist', $scope.student).success(function(response) {
			console.log(response);
			refresh();
		});
	};

	$scope.remove = function(id) {
		console.log(id);
		$http.delete('/studentlist/' + id).success(function(response) {
			refresh();	
		});
	}

	$scope.edit = function(id) {
		console.log(id);
		$http.get('/studentlist/' + id).success(function(response) {
			$scope.student = response;
		})
	}

	$scope.update = function() {
		console.log($scope.student._id);
		$http.put('/studentlist/' + $scope.student._id, $scope.student).success(function(response) {
			refresh();
		})
	};

	$scope.clear = function() {
		$scope.student = "";
	}

}]);