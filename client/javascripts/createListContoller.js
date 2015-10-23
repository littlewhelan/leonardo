app.controller('createListSearch',['$scope','$http', 'ContactListDataService', function($scope, $http, ContactListDataService) {
	$scope.corp ={};
	$scope.fam ={};
	$scope.zipCk ={};
	$scope.ageCk ={};
	$scope.age ={};
	$scope.zip={};
console.log( 'Where is this',
	$scope.corp,
	$scope.fam,
	$scope.zipCk,
	$scope.ageCk
);

	$scope.searchListBtn = function () {

		//THIS WORKS  -- will search by zip
		if ($scope.zipCk == true) {
			var promise = ContactListDataService.makeDataCall('zip',$scope.zip.data);
			promise.then(function (results) {
				$scope.emailList = results.data;
			});
		}

		//THIS WORKS - will search by age
		if ($scope.ageCk == true) {
			var promise = ContactListDataService.makeDataCall('age',$scope.age.data);
			promise.then(function (results) {
				$scope.emailList = results.data;
			});
		}

		//THIS WORKS --get all families if fam is true
		if ($scope.fam == true) {
			var promise = ContactListDataService.makeDataCall('family','');
			promise.then(function (results) {
				$scope.emailList = results.data;
				console.log(results.data);
			});
		}

		//get all corp if corp is true
		if ($scope.corp == true) {
			var promise = ContactListDataService.makeDataCall('company','');
			promise.then(function (results) {
				$scope.emailList = results.data;
				console.log(results.data);
			});
		}

		//empty the search box
		$scope.corp = {};
		$scope.fam = {};
		$scope.zipCk = {};
		$scope.ageCk = {};
		$scope.age = {};
		$scope.zip = {};

	};


}]);