//edit corporation modal template
app.controller('editCorpCtrl', ['$scope', '$uibModal', '$log', 'ResultService', '$http', function ($scope, $uibModal, $log, ResultService, $http) {
    //sends the companies after the results have been organized
        $scope.companies = ResultService.companies;

    $scope.animationsEnabled = true;

//THINK THIS CAN BE DELETED
   //scope.openCorp = function (size) {
   //
   //   var modalInstance = $uibModal.open({
   //       animation: $scope.animationsEnabled,
   //       templateUrl: 'private/editcorp.html',
   //       controller: 'ModalInstanceCtrl',
   //       size: size,
   //       resolve: {
   //           items: function () {
   //               return $scope.items;
   //           }
   //       }
   //   });

    $scope.openCorp = function (size, id) {
        console.log('corp call', id);
        return $http({
            method: 'GET',
            url: '../corporation',
            params:{id:id}
        }).then(function (response) {
            results = response.data;

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'private/editcorp.html',
                    controller: 'ModalInstanceCtrl',
                        size: size,
            });


            modalInstance.result.then(function (selectedItem) {
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
