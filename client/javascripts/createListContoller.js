app.controller('createListSearch',['$scope', '$rootScope', 'ContactListDataService', function($scope, $rootScope, ContactListDataService){
    $rootScope.add = false;
    $scope.listForm={};

    $scope.searchListBtn = function () {
        //passes in search text to service
        ContactListDataService.makeDataCall($scope.listForm.data);
        //empty the search box
        $scope.listForm={};
    };
}]);