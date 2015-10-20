//edit corporation modal template
app.controller('editCorpCtrl', ['$scope', '$uibModal', '$log', 'ResultService', function ($scope, $uibModal, $log, ResultService) {
    //sends the companies after the results have been organized
    $scope.companies = ResultService.companies;

    $scope.animationsEnabled = true;

    $scope.openCorp = function (size) {
        console.log('corp call');
        return $http({
            method: 'GET',
            url: '../search',
            params:{id:passedData}
        }).then(function (response) {
            results = this.response.data;

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'private/editcorp.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    });

    };
    //get call for corporate modals

    $scope.openCorp = function(passedData) {

    };



    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

}]);
