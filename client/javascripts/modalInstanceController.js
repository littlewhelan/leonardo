// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

//needed for modal?? pretty sure
app.controller('ModalInstanceCtrl',['$scope','$modalInstance', function ($scope, $modalInstance) {

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);