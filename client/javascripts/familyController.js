//edit family modal template
app.controller('editFamilyCtrl',['$scope', '$uibModal', '$log','ResultService', '$http', function ($scope, $uibModal, $log, ResultService, $http) {
    //sends the adults after the results have been organized
    $scope.adults = ResultService.adults;
    //sends the kids after the results have been organized
    $scope.kids = ResultService.kids;
	// stores the family object when modal opens
	$scope.family = {};

    $scope.animationsEnabled = true;

    $scope.open = function (size, id) {
        //console.log('family call',id);
        //console.log('size', size);
        //get call for family modals
        return $http({
            method: 'GET',
            url: '../family',
            params:{id:id}
        }).then(function (response) {
            //results = response.data;
			$scope.family = response.data;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'private/editfamily.html',
                controller: 'ModalInstanceCtrl',
                size: size,
				scope: $scope,
                resolve: {
                    items: function () {
                        return $scope.family;
                    }
                }
            });
            //console.log('this works???');
			console.log("scoped family", $scope.family);
            modalInstance.result.then(function (selectedItem) {
				console.log("selectedItem", selectedItem);
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };


}]);