//edit family modal template
app.controller('editFamilyCtrl', ['$scope', '$uibModal', '$log', 'ResultService', '$http', 'validService', 'toastr','dateService', function ($scope, $uibModal, $log, ResultService, $http, validService, toastr, dateService) {
	// sets validation from service for dom calls
	$scope.validateInput = validService.validateInput;
	//sends the adults and kids after the results have been organized
	$scope.adults = ResultService.adults;
	$scope.kids = ResultService.kids;
	$scope.family = {
		adultOne: {},
		adultTwo: {},
		emergency: {},
		children: [],
		donations: []
	};
	$scope.newChild = {};
	$scope.newDonation = {};

	$scope.clearFamily = function (formsArray) {
		toastr.error('Cancelled');
		$scope.family = {
			adultOne: {},
			adultTwo: {},
			emergency: {},
			children: [],
			donations: []
		};
		$scope.newChild = {};
		$scope.newDonation = {};
		formsArray.forEach(function (v) {
			$('#'+ v +' .js-validate').each(function () {
				$(this).removeClass('invalid').attr('placeholder', $(this).data('placeholder'));
			});
		});
	};



	$scope.animationsEnabled = true;
	$scope.open = function (size, id) {
		console.log('family call', id);
		return $http({
			method: 'GET',
			url: '../family',
			params: {id: id}
		}).then(function (response) {
			console.log(response.data);
			response.data.children.forEach(function (v, i, a) {
				console.log("reformatted", dateService.fromDB(a[i].birthdate));
				a[i].birthdate = dateService.fromDB(v.birthdate);
			});
			response.data.donations.forEach(function (v, i, a) {
				a[i].date = dateService.fromDB(v.date);
			});
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

	// save family
	$scope.save = function () {
		console.log("Save submitted", $scope.family);

		// check for children, run toDB formatting before sending
		if($scope.family.children.length) {
			$scope.family.children.forEach(function (v, i, a) {
				a[i].birthdate = dateService.toDB(v.birthdate);
			});
		}

		// check for donation, run toDB formatting before sending
		if($scope.family.donations.length) {
			$scope.family.donations.forEach(function (v, i, a) {
				a[i].date = dateService.toDB(v.date);
			});
		}

		console.log("Saving family, after toDB birthdates", $scope.family);

		// if has id, then post

		if(!$scope.family.id) {

			if(validService.validateForm(["AddFamInfoForm", "AddFamEmerForm"])) {
				$http({
					method: 'POST',
					url: '/family',
					data: {family: $scope.family}
				}).then(function (res) {
					console.log("Posted family, got id ", res.data);
					$scope.family.id = res.data.id;
					$scope.family.adultOne = (res.data.adultOne) ? res.data.adultOne : {};
					$scope.family.adultTwo = (res.data.adultTwo) ? res.data.adultTwo : {};
					$scope.family.emergency = (res.data.emergency) ? res.data.emergency : {};
					if ($scope.family.children.length) {
						$scope.family.children = [];
					}
					$scope.family.children = (res.data.children) ? res.data.children : [];
					if ($scope.family.donations.length) {
						$scope.family.donations = [];
					}
					$scope.family.donations = (res.data.donations) ? res.data.donations : [];
					toastr.success('Family saved!');
				}, function () {
					toastr.error('Failed to add family');
				});
			}else {
				toastr.error('Unauthorized character');
				console.log("Add family failed input tests");
			}
		}else {
			if(validService.validateForm(["EditFamInfoForm", "EditFamEmerForm"])) {
				// update family - has no id
				console.log("update family", $scope.family);
				$http({
					method: 'PUT',
					url: '/family',
					data: {family: $scope.family}
				}).then(function (res) {
					console.log("Put family, got id ", res.data);
					$scope.family.id = res.data.id;
					$scope.family.adultOne = (res.data.adultOne) ? res.data.adultOne : {};
					$scope.family.adultTwo = (res.data.adultTwo) ? res.data.adultTwo : {};
					$scope.family.emergency = (res.data.emergency) ? res.data.emergency : {};
					if ($scope.family.children.length) {
						$scope.family.children = [];
					}
					$scope.family.children = (res.data.children) ? res.data.children : [];
					if ($scope.family.donations.length) {
						$scope.family.donations = [];
					}
					$scope.family.donations = (res.data.donations) ? res.data.donations : [];
				});
			}else {
				console.log("Edit family failed input tests");
			}
		}
	};

	// for appending children to model before saving new family
	$scope.addChild = function () {
		// length check needed for auto add if click save instead of add first
		if($scope.newChild.firstName.length > 0) {
			console.log("child added", $scope.newChild, $scope.family.children);
			// if true, then update that index
			if($scope.editingChild) {
				$scope.family.children[$scope.editingChild] = $scope.newChild;
				$scope.editingChild = false;
				toastr.success('Child updated!');
			}else {
				// else push to array
				$scope.family.children.push($scope.newChild);
				toastr.success('Child added!');
			}
			$scope.newChild = {};
		}
	};

	// edit child on the add children tab of add family
	$scope.editChild = function (index) {
		// save index of child editing
		$scope.editingChild = index;
		$scope.newChild = $scope.family.children[index];
	};

	$scope.removeChild = function (index) {
		console.log("in remove child index", index, " edit ", $scope.editingChild);
		$scope.family.children.splice(index, 1);
		if(index == $scope.editingChild) {
			console.log("edit match");
			$scope.clearChild();
		}else {
			console.log("no edit match");
		}
	};

	// clears text boxes in add family->children tab
	$scope.clearChild = function () {
		console.log("in clear child");
		$scope.newChild = {
			firstName: '',
			lastName: '',
			birthdate: '',
			school: '',
			notes: ''
		};
		$scope.editingChild = false;
	};


	// adds donation to family object

// adds donation to family object
	$scope.addDonation = function () {
		// length check needed for auto add if click save instead of add first
		if($scope.newDonation.amount.length > 0) {
			//var temp = $scope.newDonation;
			//temp.date = dateService.toDB(temp.date);
			console.log("add donation", $scope.newDonation);
			$scope.family.donations.push($scope.newDonation);
			$scope.newDonation = {};
			console.log("added donation", $scope.family.donations);
		}
	};

	//// prevent accidental backs
	//$scope.$on('$locationChangeSuccess', function( event, oldUrl ) {
	//	console.log("old url: ", oldUrl);
	//	if(/(addfamily)/.test(oldUrl)) {
	//		var answer = confirm("Are you sure you want to leave this page?");
	//		if (!answer) {
	//			event.preventDefault();
	//		}
	//	}
	//});

}]);