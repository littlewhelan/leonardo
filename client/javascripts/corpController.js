//edit corporation modal template
app.controller('editCorpCtrl', ['$scope', '$uibModal', '$log', 'ResultService', '$http', 'validService', 'dateService', 'toastr', function ($scope, $uibModal, $log, ResultService, $http, validService, dateService, toastr) {

	// sets validation from service for dom calls
	$scope.validateInput = validService.validateInput;
	//sends the companies after the results have been organized
	$scope.companies = ResultService.companies;
	$scope.corp = {
		info: {},
		contact: {},
		donations: []
	};
	$scope.newDonation = {};
	$scope.animationsEnabled = true;

	$scope.clearCorp = function (formsArray) {
		toastr.error('Cancelled');
		$scope.corp = {
			info:{},
			contact:{},
			donations:[]
		};
		$scope.newDonation = {};
		formsArray.forEach(function (v) {
			$('#'+ v +' .js-validate').each(function () {
				$(this).removeClass('invalid').attr('placeholder', $(this).data('placeholder'));
			});
		});
	};

	$scope.open = function (size, id) {
		console.log('corp call', id);
		return $http({
			method: 'GET',
			url: 'leo/corporation',
			params: {id: id}
		}).then(function (response) {

			response.data.donations.forEach(function (v, i, a) {
				a[i].date = dateService.fromDB(v.date);
			});

			$scope.corp = response.data;
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'leo/private/editcorp.html',
				controller: 'ModalInstanceCtrl',
				size: size,
				scope: $scope,
				resolve: {
					items: function () {
						return $scope.corp;
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

		// check for donation, run toDB formatting before sending
		if($scope.corp.donations.length) {
			$scope.corp.donations.forEach(function (v, i, a) {
				a[i].date = dateService.toDB(v.date);
			});
		}

		// if has id, then put
		if(!$scope.corp.id) {
			if(validService.validateForm(["AddCorpInfoForm", "AddCorpContactForm"])) {
				$http({
					method: 'POST',
					url: '/leo/corporation',
					data: {corp: $scope.corp}
				}).then(function (res) {
					console.log("Posted corp, got id ", res.data);
					$scope.corp.id = res.data.id;
					$scope.corp.info = (res.data.info) ? res.data.info : {};
					$scope.contact = (res.data.contact) ? res.data.contact : {};
					// initialize donations if there are any
					if ($scope.corp.donations.length) {
						$scope.corp.donations = [];
					}
					$scope.donations = (res.data.donations) ? res.data.donations : {};
					toastr.success('Corporation added!');
				}, function () {
					toastr.error('Failed to add corporation');
				});
			}else {
				toastr.error('Unauthorized character');
				console.log("Add corp input tests failed");
			}
		}else {
			if(validService.validateForm(["EditCorpInfoForm", "EditCorpContactForm"])) {
				// insert corp - has no id
				console.log("update corp", $scope.corp);
				$http({
					method: 'PUT',
					url: '/leo/corporation',
					data: {corp: $scope.corp}
				}).then(function (res) {
					console.log("Put corp, got id ", res.data);

					$scope.corp.id = res.data.id;
					$scope.corp.info = (res.data.info) ? res.data.info : {};
					$scope.contact = (res.data.contact) ? res.data.contact : {};
					// initialize donations if there are any
					if ($scope.corp.donations.length) {
						$scope.corp.donations = [];
					}
					$scope.donations = (res.data.donations) ? res.data.donations : {};
				});
			}else {
				console.log("Edit corp input tests failed");
			}
		}
	};

	// adds donation to family object
	$scope.addDonation = function () {
		// regex check needed for auto add if click save instead of add first
		if(/^[0-9]+(.[0-9]{0,2})?$/.test($scope.newDonation.amount)) {
			//var temp = $scope.newDonation;
			//temp.date = dateService.toDB(temp.date);
			console.log("donation", $scope.newDonation);
			$scope.corp.donations.push($scope.newDonation);
			$scope.newDonation = {};
			console.log("added donation", $scope.corp.donations);
		}
	};

}]);