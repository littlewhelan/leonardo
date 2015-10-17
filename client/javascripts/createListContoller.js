app.controller('createListSearch',['$scope','ContactListDataService', function($scope, ContactListDataService){
    $scope.listForm={};

    $scope.searchListBtn = function () {
        //passes in search text to service
        ContactListDataService.makeDataCall($scope.listForm.data);
        //emptys the search box
        $scope.listForm={};
    };
}]);