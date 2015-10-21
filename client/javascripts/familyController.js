//edit family modal template
app.controller('editFamilyCtrl',['$scope', '$uibModal', '$log','ResultService', '$http', function ($scope, $uibModal, $log, ResultService, $http) {

    //sends the adults and kids after the results have been organized
        $scope.adults = ResultService.adults;
        $scope.kids = ResultService.kids;

    $scope.animationsEnabled = true;

// THINK THIS CAN BE DELETED
   //scope.open = function (size) {
   //   var modalInstance = $uibModal.open({
   //       animation: $scope.animationsEnabled,
   //       templateUrl: 'private/editfamily.html',
   //       controller: 'ModalInstanceCtrl',
   //       size: size,
   //       resolve: {
   //           items: function () {
   //               return $scope.items;
   //           }
   //       }
   //   });

    $scope.open = function (size, id) {
        console.log('family call',id);
        return $http({
            method: 'GET',
            url: '../family',
            params:{id:id}
        }).then(function (response) {
            results = response.data;

                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'private/editfamily.html',
                        controller: 'ModalInstanceCtrl',
                        size: size,
            });
      // THINK THIS CAN BE DELETED
   //         modalInstance.result.then(function (selectedItem) {
   //             $scope.selected = selectedItem;
   //         }, function () {
   //             $log.info('Modal dismissed at: ' + new Date());
   //         });
   //     });
   // };



        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };

    };
}]);