//edit family modal template
app.controller('editFamilyCtrl',['$scope', '$uibModal', '$log','ResultService', '$http', function ($scope, $uibModal, $log, ResultService, $http) {

    //sends the adults and kids after the results have been organized
        $scope.adults = ResultService.adults;
        $scope.kids = ResultService.kids;

    $scope.animationsEnabled = true;
        $scope.open = function (size, id) {
            console.log('family call',id);
            return $http({
                method: 'GET',
                url: '../family',
                params:{id:id}
            }).then(function (response) {

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
                                      return $scope.family.children = children
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

            $scope.toggleAnimation = function () {
                $scope.animationsEnabled = !$scope.animationsEnabled;
            };


}]);