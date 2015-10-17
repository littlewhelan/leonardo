//edit family modal template
app.controller('editFamilyCtrl',['$scope', '$uibModal', '$log','ResultService', function ($scope, $uibModal, $log, ResultService) {
    //sends the adults after the results have been organized
    $scope.adults = ResultService.adults;
    //sends the kids after the results have been organized
    $scope.kids = ResultService.kids;


    $scope.animationsEnabled = true;

    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'private/editfamily.html',
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
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

}]);