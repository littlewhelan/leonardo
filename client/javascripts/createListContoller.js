app.controller('createListSearch',['$scope', '$rootScope', 'ContactListDataService', function($scope, $rootScope, ContactListDataService){
    $rootScope.add = false;
    $scope.listForm={};
    $scope.searchListBtn = function () {
		//console.log("list type", $scope.listType);
		var $type = $('#listType :checked');
		// check if it's age or zip, requiring additional input
		if($type.hasClass('js-extra')) {
			console.log("needs extra info");
			var value = $type.next().next().val();
		}
		var id = $type.attr('id');
		//var $types = $('#listType');
		//if($types.find('input:checked').hasClass('js-extra')) {
		//	var value = $types.find('input:checked').hasClass('js-extra').siblings('.js-value').val();
		//}
		//var type = $types.find('input:checked').hasClass('js-extra').attr('id');
		console.log("type ", id, " value ", value);
		//console.log("value", value);
        //passes in search text to service
        //ContactListDataService.makeDataCall($scope.listForm.data);
        //empty the search box
        $scope.listForm={};
    };
}]);