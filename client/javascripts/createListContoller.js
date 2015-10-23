//app.controller('createListSearch',['$scope', '$rootScope', 'ContactListDataService', function($scope, $rootScope, ContactListDataService){
//    $rootScope.add = false;
//    $scope.listForm={};
//    $scope.searchListBtn = function () {
//		//console.log("list type", $scope.listType);
//		var $type = $('#listType :checked');
//		// check if it's age or zip, requiring additional input
//		if($type.hasClass('js-extra')) {
//			console.log("needs extra info");
//			var value = $type.next().next().val();
//		}
//		var id = $type.attr('id');
//		//var $types = $('#listType');
//		//if($types.find('input:checked').hasClass('js-extra')) {
//		//	var value = $types.find('input:checked').hasClass('js-extra').siblings('.js-value').val();
//		//}
//		//var type = $types.find('input:checked').hasClass('js-extra').attr('id');
//		console.log("type ", id, " value ", value);
//		//console.log("value", value);
//        //passes in search text to service
//        //ContactListDataService.makeDataCall($scope.listForm.data);
//        //empty the search box
//        $scope.listForm={};
//    };
//}]);
app.controller('createListSearch',['$scope','$http', 'ContactListDataService', function($scope, $http, ContactListDataService) {
	$scope.corp ={};
	$scope.fam ={};
	$scope.zipCk ={};
	$scope.ageCk ={};
	$scope.age ={};
	$scope.zip={};

	$scope.searchListBtn = function () {
		//passes in search text to service
		console.log('this is the radios' , $scope.corp,$scope.fam,$scope.zip,$scope.age, $scope.zipCk, $scope.ageCk);
		console.log($scope.zip.data);



		//search by zip if zipCK is true

		var promise = ContactListDataService.makeDataCall($scope.zip.data);

		promise.then(function (results) {
			$scope.emailList = results.data;
		});

		////search by age if ageCk is true
		//var promise = ContactListDataService.makeDataCall($scope.age.data);
		//promise.then(function (results) {
		//	$scope.emailList = results.data;
		//});

		////get all families if fam is true
		//var promise = ContactListDataService.makeDataCall();
		//promise.then(function (results) {
		//	$scope.emailList = results.data;
		//	console.log(results.data);
		//});
		//
		////get all corp if corp is true
		//ContactListDataService.makeDataCall();
		//

		//empty the search box
		$scope.corp ={};
		$scope.fam ={};
		$scope.zipCk ={};
		$scope.ageCk ={};
		$scope.age ={};
		$scope.zip={};
	};

}]);