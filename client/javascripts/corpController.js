//edit corporation modal template
app.controller('editCorpCtrl', ['$scope', '$uibModal', '$log', 'ResultService', '$http', function ($scope, $uibModal, $log, ResultService, $http) {
	//sends the companies after the results have been organized
	$scope.companies = ResultService.companies;
	$scope.corp = {
		contact: {},
		donations: []
	};
	$scope.newDonation = {};
	$scope.animationsEnabled = true;

	$scope.open = function (size, id) {
		console.log('corp call', id);
		return $http({
			method: 'GET',
			url: '../corporation',
			params: {id: id}
		}).then(function (response) {

			$scope.company = response.data;
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'private/editcorp.html',
				controller: 'ModalInstanceCtrl',
				size: size,
				scope: $scope,
				resolve: {
					items: function () {
						return $scope.company;
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

	// save corp
	$scope.save = function () {
		console.log("Save submitted", $scope.corp);
		//alert("Submitted");
		// if has id, then put
		if(!$scope.corp.id) {
			$http({
				method: 'POST',
				url: '/corporation',
				data: {corp: $scope.corp}
			}).then(function (res) {
				console.log("Posted corp, got id ", res.data);
				$scope.corp.id = res.data.id;
				$scope.corp.info = (res.data.info) ? res.data.info : {};
				$scope.contact = (res.data.contact) ? res.data.contact : {};
				// initialize donations if there are any
				if($scope.corp.donations.length) {
					$scope.corp.donations = [];
				}
				$scope.donations = (res.data.donations) ? res.data.donations : {};
			});
		}else {
			// insert corp - has no id
			console.log("insert corp", $scope.corp);
			$http({
				method: 'PUT',
				url: '/corporation',
				data: {corp: $scope.corp}
			}).then(function (res) {
				console.log("Put corp, got id ", res.data);

				$scope.corp.id = res.data.id;
				$scope.corp.info = (res.data.info) ? res.data.info : {};
				$scope.contact = (res.data.contact) ? res.data.contact : {};
				// initialize donations if there are any
				if($scope.corp.donations.length) {
					$scope.corp.donations = [];
				}
				$scope.donations = (res.data.donations) ? res.data.donations : {};
			});
		}
	};

	// adds donation to family object
	$scope.addDonation = function () {
		console.log("added donation", $scope.newDonation, $scope.corp.donations);
		$scope.corp.donations.push($scope.newDonation);
		$scope.newDonation = {};
	};
}]);
